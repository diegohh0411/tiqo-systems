import { Injectable } from "@nestjs/common";
import {
  LanguageCode,
  Logger,
  Product,
  ProductService,
  RequestContext,
  TransactionalConnection,
} from "@vendure/core";
import { TiqoChannelService } from "../channel/tiqo-channel.service";

@Injectable()
export class TiqoProductService {
  constructor(
    private connection: TransactionalConnection,
    private vendureProductService: ProductService,
    private channelService: TiqoChannelService,
  ) {}

  private static loggerCtx = "TiqoProductService";

  /**
   * Returns the Product repository for the provided context.
   */
  repository = (ctx: RequestContext) =>
    this.connection.getRepository(ctx, Product);

  /**
   * Finds or creates a Channel's External System Dummy Product. This enables the integration of external order items into Vendure as OrderLines.
   */
  async getESDP(ctx: RequestContext) {
    Logger.debug(
      `Getting the External System Dummy Product (ESDP) for channel #${ctx.channel.id}`,
      TiqoProductService.loggerCtx,
    );
    const channel = await this.channelService.getPopulatedChannel(ctx);

    if (channel?.customFields.externalSystemDummyProduct) {
      Logger.debug(
        `Channel #${ctx.channel.id} already had an existint ESDP. Returning it.`,
        TiqoProductService.loggerCtx,
      );
      return channel.customFields.externalSystemDummyProduct;
    }

    Logger.debug(
      `Channel #${ctx.channel.id} didn't have an ESDP, so creating it.`,
      TiqoProductService.loggerCtx,
    );

    const newEsdp = await this.vendureProductService.create(ctx, {
      translations: [
        {
          languageCode: LanguageCode.en,
          name: "External System Dummy Product",
          slug: "external-system-dummy-product",
          description:
            "This product is used to integrate external order items into Vendure as OrderLines.",
        },
      ],
      customFields: {
        isExternalSystemDummyProduct: true,
      },
    });

    await this.save(ctx, newEsdp);
    Logger.debug(
      `Created and saved ESDP #${newEsdp.id}`,
      TiqoProductService.loggerCtx,
    );

    channel.customFields.externalSystemDummyProduct = newEsdp;
    await this.channelService.raw.update(ctx, channel);
    Logger.debug(
      `Updated channel #${ctx.channel.id} with the ESDP.`,
      TiqoProductService.loggerCtx,
    );

    return newEsdp;
  }

  async save(ctx: RequestContext, product: Product) {
    return await this.repository(ctx).save(product);
  }

  /**
   * Returns the raw ProductService instance to expose methods that do not have custom Tiqo logic or are not yet implemented.
   */
  get raw() {
    return this.vendureProductService;
  }
}

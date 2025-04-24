import { Injectable, Logger } from "@nestjs/common";
import { GlobalFlag, LanguageCode } from "@vendure/common/lib/generated-types";
import {
  ProductVariant,
  ProductVariantService,
  RequestContext,
  TransactionalConnection,
} from "@vendure/core";
import { TiqoProductService } from "../product/tiqo-product.service";
import { TiqoChannelService } from "../channel/tiqo-channel.service";

@Injectable()
export class TiqoProductVariantService {
  private readonly loggerCtx = "TiqoProductVariantService";

  constructor(
    private connection: TransactionalConnection,
    private vendureProductVariantService: ProductVariantService,
    private productService: TiqoProductService,
    private channelService: TiqoChannelService,
  ) {}

  /**
   * Returns the ProductVariant repository for the provided context.
   */
  private repository(ctx: RequestContext) {
    return this.connection.getRepository(ctx, ProductVariant);
  }

  /**
   * The SKU of a channel's External System Dummy Product Variant.
   */
  static esdpvSku = "external-system-dummy-product-variant";

  /**
   * Finds or creates a channel's External System Dummy Product Variant. This enables the integration of external order items into Vendure as OrderLines.
   */
  async getESDPV(ctx: RequestContext) {
    Logger.debug(
      `Getting the External System Dummy Product Variant for channel #${ctx.channel.id}`,
      this.loggerCtx,
    );

    const productVariant = await this.repository(ctx).findOne({
      where: {
        sku: TiqoProductVariantService.esdpvSku,
      },
    });

    if (productVariant) {
      Logger.debug(
        `Found channel #${ctx.channel.id}'s External System Dummy Product Variant`,
        this.loggerCtx,
      );
      return productVariant;
    }

    Logger.debug(
      `Channel #${ctx.channel.id}'s External System Dummy Product Variant not found, so creating it.`,
      this.loggerCtx,
    );

    const esdp = await this.productService.getESDP(ctx);

    const newProductVariant = (
      await this.vendureProductVariantService.create(ctx, [
        {
          productId: esdp.id,
          sku: TiqoProductVariantService.esdpvSku,
          translations: [
            {
              languageCode: LanguageCode.en,
              name: "External System Dummy Product Variant",
            },
          ],
          enabled: true,
          price: 99999999, // Dummy price
          trackInventory: GlobalFlag.FALSE,
          customFields: {
            isExternalSystemDummyProductVariant: true,
          },
        },
      ])
    )[0];

    await this.repository(ctx).save(newProductVariant);

    esdp.variants = [...(esdp.variants || []), newProductVariant];
    await this.productService.save(ctx, esdp);

    Logger.debug(
      `Created and saved channel #${ctx.channel.id}'s External System Dummy Product Variant`,
      this.loggerCtx,
    );

    return newProductVariant;
  }

  /**
   * Returns the raw ProductVariantService instance to expose methods that do not have custom Tiqo logic or are not yet implemented.
   */
  get raw() {
    return this.vendureProductVariantService;
  }
}

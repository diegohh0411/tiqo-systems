import { Inject, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { Logger, RequestContext } from "@vendure/core";
import { TIQO_PLUGIN_OPTIONS } from "../../constants";
import { ChannelPosProvider } from "../../entities/external-pos-config.entity";
import { TiqoErrors, TiqoErrorString } from "../../errors/tiqo-error";
import { PluginInitOptions } from "../../types";
import { TiqoChannelService } from "../channel/tiqo-channel.service";
import { ParrotPosAdapter } from "./parrot.pos-adapter.service";

@Injectable()
export class TransposerService {
  constructor(
    @Inject(TIQO_PLUGIN_OPTIONS) private options: PluginInitOptions,
    private parrotPosAdapter: ParrotPosAdapter,
    private channelService: TiqoChannelService,
  ) { }

  private static loggerCtx = "TransposerService";

  /**
   * Syncs orders from external POS into Tiqo Commerce according to the channel's POS provider.
   * @param ctx
   */
  async syncOrders(ctx: RequestContext): Promise<boolean> {
    const channel = await this.channelService.getPopulatedChannel(ctx);
    switch (channel.customFields.externalPosConfig?.posProvider) {
      case ChannelPosProvider.PARROT:
        Logger.debug(
          "Syncing orders from Parrot POS",
          TransposerService.loggerCtx,
        );
        await this.parrotPosAdapter.syncOrders(ctx);
        Logger.debug("Orders succesfully synced.", TransposerService.loggerCtx);
        Logger.debug(
          "Syncing order items from Parrot POS",
          TransposerService.loggerCtx,
        );
        await this.parrotPosAdapter.syncOrderItems(ctx);
        Logger.debug(
          "Order items succesfully synced.",
          TransposerService.loggerCtx,
        );
        return true;
      default:
        throw new UnprocessableEntityException(TiqoErrorString(ctx, TiqoErrors.INVALID_POS_PROVIDER));
    }
  }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import {
  Channel,
  ChannelService,
  EntityHydrator,
  RequestContext,
  TransactionalConnection,
} from "@vendure/core";
import { Logger } from "@vendure/core";

@Injectable()
export class TiqoChannelService {
  private static loggerCtx = "TiqoChannelService";

  constructor(
    private connection: TransactionalConnection,
    private channelService: ChannelService,
    private entityHydrator: EntityHydrator,
  ) {}

  private repository = (ctx: RequestContext) =>
    this.connection.getRepository(ctx, Channel);

  async getPopulatedChannel(ctx: RequestContext) {
    const channel = await this.entityHydrator.hydrate(ctx, ctx.channel, {
      relations: [
        "customFields.externalPosConfig",
        "customFields.externalSystemDummyProduct",
      ],
    });

    if (!channel) {
      Logger.error("Channel not found", TiqoChannelService.loggerCtx);
      throw new NotFoundException("Channel not found");
    }

    return channel;
  }

  get raw() {
    return this.channelService;
  }
}

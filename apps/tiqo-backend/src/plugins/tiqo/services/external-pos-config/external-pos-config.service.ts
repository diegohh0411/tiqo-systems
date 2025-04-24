import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { RequestContext, TransactionalConnection } from "@vendure/core";
import { ExternalPosConfig } from "../../entities/external-pos-config.entity";
import { TiqoChannelService } from "../channel/tiqo-channel.service";
import {
  CreateExternalPosConfigInput,
  UpdateExternalPosConfigInput,
} from "./dto";

@Injectable()
export class ExternalPosConfigService {
  private static readonly loggerCtx = "ExternalPosConfigService";

  constructor(
    private connection: TransactionalConnection,
    private channelService: TiqoChannelService,
  ) {}

  private repository(ctx: RequestContext) {
    return this.connection.getRepository(ctx, ExternalPosConfig);
  }

  async readExternalPosConfig(ctx: RequestContext) {
    const channel = await this.channelService.getPopulatedChannel(ctx);
    return channel.customFields.externalPosConfig;
  }

  async createExternalPosConfig(
    ctx: RequestContext,
    input: CreateExternalPosConfigInput,
  ) {
    const channel = await this.channelService.getPopulatedChannel(ctx);

    if (channel.customFields.externalPosConfig) {
      throw new UnprocessableEntityException(
        "An external POS config already exists, you must delete it before creating a new one.",
      );
    }

    const repository = this.repository(ctx);

    const externalPosConfig = repository.create({
      ...input,
      channel: ctx.channel,
    });

    ctx.channel.customFields.externalPosConfig =
      await repository.save(externalPosConfig);
    await this.channelService.raw.update(ctx, ctx.channel);

    return externalPosConfig;
  }

  async updateExternalPosConfig(
    ctx: RequestContext,
    input: UpdateExternalPosConfigInput,
  ) {
    const repository = this.repository(ctx);
    const externalPosConfig = await repository.findOne({
      where: {
        id: input.id,
      },
    });

    if (!externalPosConfig) {
      throw new NotFoundException(
        `External POS config #${input.id} not found.`,
      );
    }

    externalPosConfig.posProvider = input.posProvider;
    externalPosConfig.bearerToken = input.bearerToken;

    return await repository.save(externalPosConfig);
  }

  async deleteExternalPosConfig(ctx: RequestContext) {
    const channel = await this.channelService.getPopulatedChannel(ctx);

    if (!channel.customFields.externalPosConfig?.id) {
      throw new NotFoundException(
        "No external POS config currently set for this channel.",
      );
    }

    const repository = this.repository(ctx);
    const externalPosConfig = await repository.findOne({
      where: {
        id: ctx.channel.customFields.externalPosConfig?.id,
      },
    });

    if (!externalPosConfig) {
      throw new NotFoundException(
        "The External POS config is configured for this channel, but it was not found in the database.",
      );
    }

    ctx.channel.customFields.externalPosConfig = null;
    await this.channelService.raw.update(ctx, ctx.channel);

    await repository.softDelete(externalPosConfig.id);
    return true;
  }
}

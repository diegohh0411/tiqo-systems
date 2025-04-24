import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Permission } from "@vendure/common/lib/generated-types";
import { Allow, Ctx, RequestContext } from "@vendure/core";
import {
  CreateExternalPosConfigInput,
  UpdateExternalPosConfigInput,
} from "../../services/external-pos-config/dto";
import { ExternalPosConfigService } from "../../services/external-pos-config/external-pos-config.service";

@Resolver()
export class ExternalPosConfigAdminResolver {
  constructor(private externalPosConfigService: ExternalPosConfigService) {}

  private static readonly loggerCtx = "ExternalPosConfigAdminResolver";

  @Query()
  @Allow(Permission.SuperAdmin)
  async readExternalPosConfig(@Ctx() ctx: RequestContext) {
    return await this.externalPosConfigService.readExternalPosConfig(ctx);
  }

  @Mutation()
  @Allow(Permission.SuperAdmin)
  async createExternalPosConfig(
    @Ctx() ctx: RequestContext,
    @Args() args: CreateExternalPosConfigInput,
  ) {
    return await this.externalPosConfigService.createExternalPosConfig(
      ctx,
      args,
    );
  }

  @Mutation()
  @Allow(Permission.SuperAdmin)
  async updateExternalPosConfig(
    @Ctx() ctx: RequestContext,
    @Args() args: UpdateExternalPosConfigInput,
  ) {
    return await this.externalPosConfigService.updateExternalPosConfig(
      ctx,
      args,
    );
  }

  @Mutation()
  @Allow(Permission.SuperAdmin)
  async deleteExternalPosConfig(@Ctx() ctx: RequestContext) {
    return await this.externalPosConfigService.deleteExternalPosConfig(ctx);
  }
}

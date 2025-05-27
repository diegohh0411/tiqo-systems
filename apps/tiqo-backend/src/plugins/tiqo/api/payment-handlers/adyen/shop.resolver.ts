import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CreateSessionInput } from "../../../services/payment-handlers/adyen/adyen.dto";
import { AdyenService } from "../../../services/payment-handlers/adyen/adyen.service";
import { Ctx, RequestContext } from "@vendure/core";
import { Debug, DebugAction } from "../../../debug.logging"

@Resolver()
export class AdyenShopResolver {
  constructor(private readonly adyenService: AdyenService) { }

  @Mutation()
  createAdyenSession(@Ctx() ctx: RequestContext, @Args("input") input: CreateSessionInput) {
    Debug(DebugAction.RESOLVING, "createAdyenSession", "AdyenShopResolver.createAdyenSession");
    return this.adyenService.createSession(ctx, input);
  }
}
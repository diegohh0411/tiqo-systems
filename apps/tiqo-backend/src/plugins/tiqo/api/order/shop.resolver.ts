import { Args, Query, Resolver } from "@nestjs/graphql";
import { Ctx, RequestContext } from "@vendure/core";
import { TiqoOrderService } from "../../services/order/tiqo-order.service";

@Resolver()
export class OrderShopResolver {
  constructor(private orderService: TiqoOrderService) {}

  @Query()
  async readOrder(@Ctx() ctx: RequestContext, @Args() args: { code: string }) {
    return this.orderService.readOneByCode(ctx, args.code);
  }
}

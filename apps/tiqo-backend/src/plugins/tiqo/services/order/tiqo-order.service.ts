import { Injectable } from "@nestjs/common";
import {
  Logger,
  Order,
  OrderService,
  RequestContext,
  TransactionalConnection,
} from "@vendure/core";

/**
 * A wrapper around Vendure's OrderService to add custom logic for Tiqo.
 */
@Injectable()
export class TiqoOrderService {
  constructor(
    private connection: TransactionalConnection,
    private orderService: OrderService,
  ) {}

  private static loggerCtx = "TiqoOrderService";

  repository(ctx: RequestContext) {
    return this.connection.getRepository(ctx, Order);
  }

  async save(ctx: RequestContext, order: Order) {
    return await this.repository(ctx).save(order);
  }

  async readOneByCode(ctx: RequestContext, code: string) {
    return await this.findOne(ctx, code, []);
  }

  /**
   * Finds an order by its code, or creates it if it doesn't exist. For External Order Lines, the code is also known as "order reference".
   */
  async findOneOrCreateIt(ctx: RequestContext, code: string) {
    const repository = this.repository(ctx);

    const existingOrder = await repository.findOne({
      where: {
        code,
      },
      relations: ["lines"],
    });

    if (existingOrder) {
      Logger.verbose(
        `Order #${code} already exists`,
        TiqoOrderService.loggerCtx,
      );
      return existingOrder;
    }

    const newOrder = await this.orderService.create(ctx);
    newOrder.code = code;

    Logger.verbose(`Creating order #${code}.`, TiqoOrderService.loggerCtx);
    return await repository.save(newOrder);
  }

  /**
   * Finds an order by its code.
   */
  async findOne(ctx: RequestContext, code: string, relations: string[] = []) {
    const repository = this.repository(ctx);
    const existingOrder = await repository.findOne({
      where: {
        code,
      },
      relations,
    });
    if (!existingOrder) {
      Logger.verbose(`Order #${code} not found`, TiqoOrderService.loggerCtx);
      return null;
    }
    Logger.verbose(`Found order #${code}`, TiqoOrderService.loggerCtx);
    return existingOrder;
  }

  /**
   * Returns the raw OrderService instance to expose methods that do not have custom Tiqo logic or are not yet implemented.
   */
  get raw() {
    return this.orderService;
  }
}

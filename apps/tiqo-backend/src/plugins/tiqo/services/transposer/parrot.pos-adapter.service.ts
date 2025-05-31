import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable, UnprocessableEntityException } from "@nestjs/common";
import {
  Channel,
  CustomOrderLineFields,
  ID,
  InternalServerError,
  Logger,
  Order,
  ProductVariant,
  RequestContext,
  TransactionalConnection,
} from "@vendure/core";
import { AxiosResponse } from "axios";
import { firstValueFrom } from "rxjs";
import { TiqoErrorString, TiqoErrors } from "../../errors/tiqo-error";
import { SystemOfOrigin } from "../../global-configurations/order.configuration";
import { TiqoProductVariantService } from "../product-variant/tiqo-product-variant.service";
import { TiqoProductService } from "../product/tiqo-product.service";
import { TableService } from "../table/table.service";
import { TiqoChannelService } from "../channel/tiqo-channel.service";
import { TiqoOrderService } from "../order/tiqo-order.service";
import {
  ListOrderItemsQueryParams,
  ListOrderItemsResponse,
  ListOrdersQueryParams,
  ListOrdersResponse,
  ParrotOrderItem,
} from "./parrot.types";
import { Debug, DebugAction } from "../../debug.logging";

/**
 * Adapter for the Parrot POS API.
 * This class is responsible for syncing orders and order items from the Parrot POS API to the Vendure database.
 */
@Injectable()
export class ParrotPosAdapter {
  constructor(
    private connection: TransactionalConnection,
    private httpService: HttpService,
    private orderService: TiqoOrderService,
    private tableService: TableService,
    private productService: TiqoProductService,
    private productVariantService: TiqoProductVariantService,
    private channelService: TiqoChannelService,
  ) { }
  private static loggerCtx = "ParrotPosAdapter";
  private static baseUrl = "http://localhost:3232";

  private getPaginationTimestamps = () => {
    const now = new Date();
    const aYearAgo = new Date();
    aYearAgo.setFullYear(now.getFullYear() - 1);

    return {
      startTimestamp: aYearAgo.toISOString(),
      endTimestamp: now.toISOString(),
    };
  };

  private getAuthorizationHeader = (channel: Channel) => {
    if (
      !channel.customFields.externalPosConfig ||
      !channel.customFields.externalPosConfig.bearerToken
    ) {
      Logger.error("No Bearer token found.", ParrotPosAdapter.loggerCtx);
      throw new BadRequestException("No Bearer token found.");
    }

    return {
      authorization: `Bearer ${channel.customFields.externalPosConfig.bearerToken}`,
    };
  };

  async syncOrders(ctx: RequestContext) {
    Debug(
      DebugAction.EXECUTING,
      `function 'syncOrders' for channel ${ctx.channel.code}`,
      ParrotPosAdapter.loggerCtx,
    );

    const channel = await this.channelService.getPopulatedChannel(ctx);

    const params: ListOrdersQueryParams = {
      ...this.getPaginationTimestamps(),
    };

    let response: AxiosResponse<ListOrdersResponse, unknown>;
    try {
      response = await firstValueFrom(
        this.httpService.get<ListOrdersResponse>(
          `${ParrotPosAdapter.baseUrl}/v1/orders`,
          {
            headers: this.getAuthorizationHeader(channel),
            params,
          },
        ),
      );
    } catch (error) {
      Logger.error(JSON.stringify(error), ParrotPosAdapter.loggerCtx);
      throw new InternalServerError(TiqoErrorString(ctx, TiqoErrors.UNREACHABLE_POS_PROVIDER));
    }

    const externalOrdersWithTable = response.data.data.filter(
      (order): order is typeof order & { tableUuid: string } => {
        return typeof order.tableUuid === "string";
      },
    );

    if (externalOrdersWithTable.length === 0) {
      Debug(
        DebugAction.DIDNT_FIND,
        `orders with table`,
        ParrotPosAdapter.loggerCtx,
      );
      return;
    }
    Debug(DebugAction.FOUND, `orders with table`, ParrotPosAdapter.loggerCtx);

    for (const externalOrder of externalOrdersWithTable) {
      Debug(
        DebugAction.EXECUTING,
        `order synchronization for external order ${externalOrder.orderReference}`,
        ParrotPosAdapter.loggerCtx,
      );

      const internalOrder = await this.orderService.findOneOrCreateIt(
        ctx,
        externalOrder.orderReference,
      );

      const internalTable = await this.tableService.findOneOrCreateIt(ctx, {
        extId: externalOrder.tableUuid,
        name: externalOrder.tableName,
      });

      internalOrder.customFields.placedAt = internalTable;
      internalOrder.customFields.externalId = externalOrder.uuid;
      internalOrder.customFields.systemOfOrigin = SystemOfOrigin.PARROT;

      await this.orderService.save(ctx, internalOrder);
      await this.tableService.repository(ctx).save(internalTable);

      /*
      if (externalOrder.status === "FINISHED") {
        await this.orderService.raw.transitionToState(
          ctx,
          internalOrder.id,
          "PaymentSettled",
        );
      }
      */
    }

    return true;
  }

  static missingModifierPriceSku = "missing-modifier-price";
  /**
   Parrot POS has a peculiar system where each order line (order item) can have a small charge that modifies the base price. For example, the price of a 60 MXN coffee can me modified by choosing a 10 MXN milk. So each Parrot order item has a `unitPrice` and a `modifierPrice`. When building our Vendure OrderItemPriceCalculatorStrategy, we decided to calculate the price only upon the value of `unitPrice`. Thus, each Parrot order item with a non-zero modifierPrice will need to have a separate order line that represents the value of `modifierPrice` as if it were a `unitPrice`. This makes integration into Vendure easier.
   */
  /**
   * Ensures that a missing modifier price is represented as an add-on order line in the system.
   * If the parent order item has a modifier price that is not yet accounted for, this method creates or updates
   * an order line to represent the missing modifier price.
   *
   * @param ctx - The request context containing information about the current channel and user.
   * @param order - The internal order to which the add-on should be associated.
   * @param esdpv - The product variant representing the missing modifier price.
   * @param parentUuid - The UUID of the parent order item.
   * @param orderItems - The list of all order items from the external system.
   * @returns A promise that resolves when the add-on has been ensured.
   */
  private async makeSureAddOnExists(
    ctx: RequestContext,
    order: Order,
    esdpv: ProductVariant,
    parentUuid: ID,
    orderItems: ParrotOrderItem[],
  ) {
    Debug(
      DebugAction.EXECUTING,
      `function 'makeSureAddOnExists'`,
      ParrotPosAdapter.loggerCtx,
    );

    const parentItem = orderItems.find(
      (orderItem) => orderItem.uuid === parentUuid,
    );

    if (!parentItem) {
      Logger.error(
        `Parent line not found for uuid ${parentUuid}`,
        ParrotPosAdapter.loggerCtx,
      );
      throw new UnprocessableEntityException(TiqoErrorString(ctx, TiqoErrors.INVALID_ORDERLINE_REFERENCE));
    }

    const addOns = orderItems.filter(
      (orderItem) =>
        orderItem.parentUuid === parentUuid && orderItem.itemType === "ADD_ON",
    );
    Debug(
      DebugAction.FOUND,
      `${addOns.length} add-ons for item ${parentUuid}`,
      ParrotPosAdapter.loggerCtx,
    );

    const totalCalculatedModifierPrice = addOns.reduce((acc, addOn) => {
      return acc + addOn.unitPrice * addOn.quantity;
    }, 0);

    const totalMissingModifierPrice =
      (parentItem.totalModifierPrice - totalCalculatedModifierPrice) * 100;

    Debug(
      DebugAction.CALCULATING,
      `that the missing modifier price is ${totalMissingModifierPrice}`,
      ParrotPosAdapter.loggerCtx,
    );

    if (totalMissingModifierPrice === 0) {
      return;
    }

    // Refresh the order data to ensure we have the latest state
    // The only way to get the order lines correctly is to fetch again, NEED TO OPTIMIZE THIS. TODO!
    const refreshedOrder = await this.orderService.findOne(ctx, order.code, ["lines"]);

    if (!refreshedOrder) {
      Logger.error(
        `Order not found for code ${order.code}`,
        ParrotPosAdapter.loggerCtx,
      );
      throw new UnprocessableEntityException(TiqoErrorString(ctx, TiqoErrors.INVALID_ORDER_REFERENCE));
    }

    const parentLine = refreshedOrder.lines.find(line => line.customFields.extId === parentUuid);

    const existingLine = refreshedOrder.lines.find(
      (line) =>
        line.customFields.extSku === ParrotPosAdapter.missingModifierPriceSku &&
        line.customFields.parentOrderlineId === parentLine?.id
    );

    if (existingLine) {
      Debug(
        DebugAction.UPDATING,
        `existing line for missing modifier price`,
        ParrotPosAdapter.loggerCtx,
      );

      const customFields: CustomOrderLineFields = {
        ...existingLine.customFields,
        extUnitCost: totalMissingModifierPrice, // Cost per unit of the missing modifier
        extUnitPrice: totalMissingModifierPrice, // Price per unit of the missing modifier
        extTotalPrice: totalMissingModifierPrice * 1, // Total price for the missing modifier (quantity assumed as 1)
        extTotal: totalMissingModifierPrice * 1, // Total cost for the missing modifier (quantity assumed as 1)
      };

      await this.orderService.raw.adjustOrderLine(
        ctx,
        order.id,
        existingLine.id,
        1,
        customFields,
      );
    } else {
      Debug(
        DebugAction.CREATING,
        `a new line for missing modifier price`,
        ParrotPosAdapter.loggerCtx,
      );

      const customFields: CustomOrderLineFields = {
        extId: null,

        extSku: ParrotPosAdapter.missingModifierPriceSku,

        parentOrderlineId: parentLine?.id,

        extName: "Complemento",

        extUnitCost: totalMissingModifierPrice,
        extUnitPrice: totalMissingModifierPrice,
        extTotalPrice: totalMissingModifierPrice,
        extTotal: totalMissingModifierPrice,

        extTotalModifierPrice: 0,
        extAmountsIncludeTax: true,

        extCurrencyCode: parentItem.currencyCode,

        extSystemOfOrigin: SystemOfOrigin.TIQO,
        hasBeenPaidFor: false,
      };

      await this.orderService.raw.addItemToOrder(
        ctx,
        order.id,
        esdpv.id,
        1,
        customFields,
      );
    }

    Debug(
      DebugAction.EXITING,
      `function 'makeSureAddOnExists'`,
      ParrotPosAdapter.loggerCtx,
    );
  }

  /**
   * Groups order items by orderReference and ensures parent items appear before their children 
   * to optimize database access and maintain proper references.
   */
  private groupOrderItemsByOrderReferenceAndParentItem(orderItems: ParrotOrderItem[]): {
    [orderReference: ID]: ParrotOrderItem[];
  } {
    const groupedOrderItems: { [orderReference: ID]: ParrotOrderItem[] } = {};

    // First pass: group items by order reference
    for (const orderItem of orderItems) {
      if (!groupedOrderItems[orderItem.orderReference]) {
        groupedOrderItems[orderItem.orderReference] = [];
      }

      groupedOrderItems[orderItem.orderReference].push(orderItem);
    }

    // Second pass: sort each group so parent items come before their children
    for (const orderReference in groupedOrderItems) {
      groupedOrderItems[orderReference].sort((a, b) => {
        // If b is a child of a, a should come first
        if (b.parentUuid === a.uuid) return -1;

        // If a is a child of b, b should come first
        if (a.parentUuid === b.uuid) return 1;

        // If neither is a parent of the other, prioritize items without parents
        if (!a.parentUuid && b.parentUuid) return -1;
        if (a.parentUuid && !b.parentUuid) return 1;

        // If both have parents or neither has parents, maintain original order
        return 0;
      });
    }

    return groupedOrderItems;
  }

  async syncOrderItems(ctx: RequestContext) {
    Debug(
      DebugAction.EXECUTING,
      `function 'syncOrderItems' for channel ${ctx.channel.code}`,
      ParrotPosAdapter.loggerCtx,
    );

    const channel = await this.channelService.getPopulatedChannel(ctx);

    const params: ListOrderItemsQueryParams = {
      ...this.getPaginationTimestamps(),
    };

    let response: AxiosResponse<ListOrderItemsResponse, unknown>;
    try {
      response = await firstValueFrom(
        this.httpService.get<ListOrderItemsResponse>(
          `${ParrotPosAdapter.baseUrl}/v1/order-items`,
          {
            headers: this.getAuthorizationHeader(channel),
            params,
          },
        ),
      );
    } catch (error) {
      Logger.error(JSON.stringify(error), ParrotPosAdapter.loggerCtx);
      throw new InternalServerError(TiqoErrorString(ctx, TiqoErrors.UNREACHABLE_POS_PROVIDER));
    }

    // By grouping the order items by orderReference, we optimize the number of access to the database.
    const groupedOrderItems = this.groupOrderItemsByOrderReferenceAndParentItem(
      response.data.data,
    );

    const esdpv = await this.productVariantService.getESDPV(ctx);
    const orderItemsSynced: ID[] = [];

    for (const orderReference in groupedOrderItems) {
      const currentOrder = await this.orderService.findOne(ctx, orderReference, [
        "lines",
      ]);

      Debug(
        DebugAction.FOUND,
        `order ${orderReference} with ${currentOrder?.lines.length} lines`,
        ParrotPosAdapter.loggerCtx,
      );

      if (!currentOrder) {
        Debug(
          DebugAction.DIDNT_FIND,
          `order ${orderReference}`,
          ParrotPosAdapter.loggerCtx,
        );
        continue;
      }

      Debug(
        DebugAction.EXECUTING,
        `order items sync for order #${orderReference}`,
        ParrotPosAdapter.loggerCtx,
      );

      for (const orderItem of groupedOrderItems[orderReference]) {
        Debug(
          DebugAction.EXECUTING,
          `sync for order item #${orderItem.uuid}`,
          ParrotPosAdapter.loggerCtx,
        );

        if (orderItem.currencyCode !== currentOrder.currencyCode) {
          Logger.error(
            `Currency code mismatch for order item ${orderItem.uuid}: expected ${currentOrder.currencyCode}, got ${orderItem.currencyCode}`,
            ParrotPosAdapter.loggerCtx,
          );
          throw new UnprocessableEntityException(TiqoErrorString(ctx, TiqoErrors.CURRENCY_CODE_MISMATCH));
        }

        const existingLine = currentOrder.lines.find(
          (existingLine) => existingLine.customFields.extId === orderItem.uuid,
        );

        if (existingLine) {
          Debug(
            DebugAction.UPDATING,
            `order item #${orderItem.uuid} for order #${orderReference}`,
            ParrotPosAdapter.loggerCtx,
          );

          const customFields: CustomOrderLineFields = {
            ...existingLine.customFields,

            extUnitCost: orderItem.unitCost * 100, // Parrot manages full pesos, so we need to convert every price into cents.
            extUnitPrice: orderItem.unitPrice * 100,
            extTotalModifierPrice: orderItem.totalModifierPrice * 100,
            extTotalPrice: orderItem.totalPrice * 100,
            extTotal: orderItem.total * 100,
          };

          await this.orderService.raw.adjustOrderLine(
            ctx,
            currentOrder.id,
            existingLine.id,
            orderItem.quantity,
            customFields,
          );
        } else {
          Debug(
            DebugAction.CREATING,
            `order item #${orderItem.uuid} for order #${orderReference}`,
            ParrotPosAdapter.loggerCtx,
          );

          const customFields: CustomOrderLineFields = {
            extId: orderItem.uuid,

            parentOrderlineId: orderItem.parentUuid ?
              currentOrder.lines.find(line => line.customFields.extId === orderItem.parentUuid)?.id
              : undefined,

            extSku: orderItem.sku,
            extName: orderItem.itemName,

            extUnitCost: orderItem.unitCost * 100, // Parrot manages full units, so we need to convert every price into cents.
            extUnitPrice: orderItem.unitPrice * 100,
            extTotalModifierPrice: orderItem.totalModifierPrice * 100,
            extTotalPrice: orderItem.totalPrice * 100,
            extTotal: orderItem.total * 100,
            extAmountsIncludeTax: true,
            extCurrencyCode: orderItem.currencyCode,

            hasBeenPaidFor: false,

            extSystemOfOrigin: SystemOfOrigin.PARROT,
          };

          await this.orderService.raw.addItemToOrder(
            ctx,
            currentOrder.id,
            esdpv.id,
            orderItem.quantity,
            customFields,
          );
        }

        orderItemsSynced.push(orderItem.uuid);

        if (orderItem.totalModifierPrice > 0) {
          await this.makeSureAddOnExists(
            ctx,
            currentOrder,
            esdpv,
            orderItem.uuid,
            groupedOrderItems[orderReference],
          );
        }
      }
    }

    return orderItemsSynced;
  }
}

import {
  CustomOrderLineFields,
  Order,
  PriceCalculationResult,
  ProductVariant,
  RequestContext,
} from "@vendure/core";
import { StandardError, TiqoErrorCodes } from "../errors/tiqo-error";
import { debug, DebugAction } from "../debug.logging";

export class TiqoOrderItemPriceCalculationStrategy {
  private loggerCtx = "TiqoOrderItemPriceCalculationStrategy";

  calculateUnitPrice(
    ctx: RequestContext,
    productVariant: ProductVariant,
    orderLineCustomFields: CustomOrderLineFields,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _order: Order,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _quantity: number,
  ): PriceCalculationResult | Promise<PriceCalculationResult> {
    if (
      productVariant.customFields.isExternalSystemDummyProductVariant ===
      undefined
    ) {
      throw new StandardError(TiqoErrorCodes.UNHYDRATED_PRODUCTVARIANT);
    }

    if (productVariant.customFields.isExternalSystemDummyProductVariant) {
      return this.calculateForESDPV(orderLineCustomFields);
    } else {
      return this.calculateAsDefault(productVariant);
    }
  }

  private calculateForESDPV(
    orderLineCustomFields: CustomOrderLineFields,
  ): PriceCalculationResult | Promise<PriceCalculationResult> {
    const { extUnitPrice, extAmountsIncludeTax, extSku } =
      orderLineCustomFields;

    if (extUnitPrice === null || extAmountsIncludeTax === null) {
      throw new StandardError(TiqoErrorCodes.INVALID_EXTERNAL_ORDERLINE);
    }

    debug(
      DebugAction.CALCULATING,
      `price for sku:${extSku} to be ${extUnitPrice}`,
      this.loggerCtx,
    );

    return {
      price: extUnitPrice,
      priceIncludesTax: extAmountsIncludeTax,
    };
  }

  private calculateAsDefault(
    productVariant: ProductVariant,
  ): PriceCalculationResult | Promise<PriceCalculationResult> {
    // This is the actual implementation written in @vendure/core/dist/config/order/default-order-item-price-calculation-strategy. I'm hard coding it to avoid dependency injection issues.
    return {
      price: productVariant.listPrice,
      priceIncludesTax: productVariant.listPriceIncludesTax,
    };
  }
}

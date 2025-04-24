import { InternalServerError } from "@vendure/core";

export enum TiqoErrorCodes {
  // Generic errors
  UNKNOWN_ERROR = "UNKN", // An unknown error occurred.

  // Resource related errors
  NOT_FOUND = "NOTF", // The requested resource was not found.
  ALREADY_EXISTS = "ALRE", // The resource already exists.

  // TiqoProductVariant Service errors
  MORE_THAN_ONE_ESDPV = "MTOES", // More than one External System Dummy Product Variant was found for the channel.

  // Transposer Service related errors
  INVALID_POS_PROVIDER = "IVPP", // The POS provider for the channel is not supported or undefined.
  UNREACHABLE_POS_PROVIDER = "URPP", // The POS provider for the channel is unreachable.
  INVALID_RESOURCE_REFERENCE = "IRRF", // The resource reference is invalid, it does not exist.

  // TiqoOrderItemPriceCalculationStrategy errors
  INVALID_EXTERNAL_ORDERLINE = "IEOL", // The External OrderLine is invalid.
  UNHYDRATED_PRODUCTVARIANT = "UHPV", // The ProductVariant's customFields are not hydrated for some reason.
}

export class StandardError extends InternalServerError {
  constructor(code: TiqoErrorCodes) {
    super(code);
  }
}

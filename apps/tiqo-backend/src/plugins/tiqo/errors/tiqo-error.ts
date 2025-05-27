import { LanguageCode, RequestContext } from "@vendure/core";

type ValueOf<T> = T[keyof T];

export const TiqoErrors = {
  // Generic errors
  UNKNOWN_ERROR: {
    [LanguageCode.es]: "Ocurrió un error desconocido.",
    [LanguageCode.en]: "An unknown error occurred.",
  },

  // Resource related errors
  NOT_FOUND: {
    [LanguageCode.es]: "Recurso no encontrado.",
    [LanguageCode.en]: "Resource not found.",
  },
  ALREADY_EXISTS: {
    [LanguageCode.es]: "El recurso ya existe.",
    [LanguageCode.en]: "The resource already exists.",
  },

  // TiqoProductVariant Service errors
  MORE_THAN_ONE_ESDPV: {
    [LanguageCode.es]: "Se encontró más de una variante de producto dummy de sistema externo para el canal.",
    [LanguageCode.en]: "More than one External System Dummy Product Variant was found for the channel.",
  },

  // Transposer Service related errors
  INVALID_POS_PROVIDER: {
    [LanguageCode.es]: "El canal no tiene configurado un proveedor de POS válido.",
    [LanguageCode.en]: "The channel does not have a valid POS provider configured.",
  },
  UNREACHABLE_POS_PROVIDER: {
    [LanguageCode.es]: "El proveedor de POS para el canal está fuera de línea.",
    [LanguageCode.en]: "The POS provider for the channel is offline.",
  },
  INVALID_ORDERLINE_REFERENCE: {
    [LanguageCode.es]: "La referencia de la línea de pedido no existe o no es válida.",
    [LanguageCode.en]: "The order line reference does not exist or is invalid.",
  },
  INVALID_ORDER_REFERENCE: {
    [LanguageCode.es]: "La referencia del pedido no existe o no es válida.",
    [LanguageCode.en]: "The order reference does not exist or is invalid.",
  },
  CURRENCY_CODE_MISMATCH: {
    [LanguageCode.es]: "El uso de un mismo código de moneda no fue consistente en esta transacción.",
    [LanguageCode.en]: "The use of the same currency code was not consistent in this transaction.",
  },

  // TiqoOrderItemPriceCalculationStrategy errors
  INVALID_EXTERNAL_ORDERLINE: {
    [LanguageCode.es]: "La línea de pedido externa no es válida.",
    [LanguageCode.en]: "The external order line is invalid.",
  },

  UNHYDRATED_PRODUCTVARIANT: {
    [LanguageCode.es]: "La variante de producto no existe o no está hidratada con los datos que se necesitan.",
    [LanguageCode.en]: "The product variant does not exist or is not hydrated with the data that is needed.",
  },

  // Payment handler errors
  EXPECTED_CHARGE_AMOUNT_MISMATCH: {
    [LanguageCode.es]: "El importe de la orden calculado por el servidor no coincide con el importe calculado por el cliente.",
    [LanguageCode.en]: "The order amount calculated by the server does not match the amount calculated by the client.",
  },

  ADYEN_SESSION_CREATION_FAILED: {
    [LanguageCode.es]: "No se pudo crear una sesión de pago de Adyen.",
    [LanguageCode.en]: "Failed to create an Adyen payment session.",
  }
}

export const TiqoErrorString = (ctx: RequestContext, error: ValueOf<typeof TiqoErrors>): string => {
  return error[ctx.languageCode as keyof typeof error] || error[LanguageCode.en];
}

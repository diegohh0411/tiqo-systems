import {
  CancelPaymentResult,
  CancelPaymentErrorResult,
  PaymentMethodHandler,
  VendureConfig,
  CreatePaymentResult,
  SettlePaymentResult,
  SettlePaymentErrorResult,
  Payment,
  LanguageCode
} from '@vendure/core';

import { Client, CheckoutAPI, Types } from '@adyen/api-library';

export const AdyenPaymentHandler = new PaymentMethodHandler({
  code: 'adyen',
  description: [{ languageCode: LanguageCode.en, value: 'Adyen Payment Provider' }],
  args: {
    apiKey: { type: 'string' },
    environment: { type: 'string' }
  },

  createPayment: async (ctx, order, amount, args, metadata): Promise<CreatePaymentResult> => {
    
  },

  settlePayment: async (ctx, order, payment, args): Promise<SettlePaymentResult | SettlePaymentErrorResult> => { },

  cancelPayment: async (ctx, order, payment, args): Promise<CancelPaymentResult | CancelPaymentErrorResult> => { },
})
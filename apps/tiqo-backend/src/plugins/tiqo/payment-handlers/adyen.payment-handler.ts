/**
import {
  CancelPaymentResult,
  CancelPaymentErrorResult,
  PaymentMethodHandler,
  CreatePaymentResult,
  SettlePaymentResult,
  SettlePaymentErrorResult,
  LanguageCode
} from '@vendure/core';

import { AdyenService } from '../services/payment-handlers/adyen/adyen.service';

let adyenService: AdyenService;

export const adyenPaymentHandler = new PaymentMethodHandler({
  code: 'adyen',
  description: [{ languageCode: LanguageCode.en, value: 'Adyen Payment Provider' }],
  args: {
    apiKey: { type: 'string' },
    merchantAccount: { type: 'string' },
    environment: { type: 'string' }
  },

  init(injector) {
    adyenService = injector.get(AdyenService);
  },

  createPayment: async (ctx, order, amount, args, metadata): Promise<CreatePaymentResult> => {

  },

  settlePayment: async (ctx, order, payment, args): Promise<SettlePaymentResult | SettlePaymentErrorResult> => { },

  cancelPayment: async (ctx, order, payment, args): Promise<CancelPaymentResult | CancelPaymentErrorResult> => { },
})
   */
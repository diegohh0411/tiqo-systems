import { envConfig } from '../../../../../env-config';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentErrorResult, CreatePaymentResult, Logger, RequestContext } from '@vendure/core';
import { CreateSessionInput } from './adyen.dto';

import { Client, CheckoutAPI } from '@adyen/api-library';
import { TiqoOrderService } from '../../order/tiqo-order.service';
import { TiqoErrors, TiqoErrorString } from '../../../errors/tiqo-error';
import { Debug, DebugAction } from '../../../debug.logging'
import { Big } from 'big.js';

@Injectable()
export class AdyenService {
    constructor(
        private orderService: TiqoOrderService
    ) { }

    private client = new Client({
        apiKey: envConfig.ADYEN_API_KEY,
        environment: "TEST",
    })

    private checkout = new CheckoutAPI(this.client);

    generateReference(orderCode: string): string {
        return `${orderCode}:${Date.now()}`;
    }

    /** This method receives an order code, the ids and quantities of selected orderlines and a tip percentage. It verifies the order exists, the amount that the amount to charge is correct and creates a payment session with Adyen. */
    async createSession(ctx: RequestContext, input: CreateSessionInput) {
        Debug(DebugAction.EXECUTING, `Adyen payment session creation for order ${input.orderCode}`, 'AdyenService.createSession');

        const paymentReference = this.generateReference(input.orderCode);

        // const ceiledExpectedChargeAmount = Math.ceil(input.expectedChargeAmount);

        const order = await this.orderService.findOne(ctx, input.orderCode, ["lines"]);

        if (!order) {
            throw new NotFoundException(TiqoErrorString(ctx, TiqoErrors.NOT_FOUND));
        }

        const selectedOrderlines = order.lines.filter(
            line => input.selectedQuantities[line.id] > 0
        );

        const calculatedAmountToCharge = selectedOrderlines
            .reduce((acc, parentOrderline) => {
                const parentPrice = (
                    Big(parentOrderline.linePrice)
                        .times(Big(input.selectedQuantities[parentOrderline.id]))
                        .div(Big(parentOrderline.quantity))
                );

                const childrenPrices = order.lines
                    .filter((o) => o.customFields?.parentOrderlineId === parentOrderline.id)
                    .reduce((acc, childOrderline) => {
                        return acc.add(
                            Big(childOrderline.linePrice)
                                .times(Big(input.selectedQuantities[parentOrderline.id]))
                                .div(Big(parentOrderline.quantity))
                        )
                    }, Big(0));

                return acc.add(parentPrice).add(childrenPrices);
            }, Big(0))
            .times(Big(1).plus(Big(input.tipPercentage))) // Multiply by (1 + tip percentage)
            ;

        const ceiledCalculatedAmountToCharge = Math.ceil(calculatedAmountToCharge.toNumber());

        /**
        if (ceiledCalculatedAmountToCharge !== ceiledExpectedChargeAmount) {
            return {
                amount: input.expectedChargeAmount,
                state: 'Error' as const,
                transactionId: paymentReference,
                errorMessage: TiqoErrorString(ctx, TiqoErrors.EXPECTED_CHARGE_AMOUNT_MISMATCH)
            }
        }
        */

        Logger.debug(`Creating Adyen payment session for order ${input.orderCode} with reference ${paymentReference} and amount ${ceiledCalculatedAmountToCharge} with merchantAccount '${envConfig.ADYEN_MERCHANT_ACCOUNT}'`, 'AdyenService.createSession');

        const adyenResponse = await this.checkout.PaymentsApi.sessions({
            merchantAccount: envConfig.ADYEN_MERCHANT_ACCOUNT,
            reference: paymentReference,
            amount: {
                currency: order.currencyCode,
                value: ceiledCalculatedAmountToCharge
            },
            returnUrl: envConfig.ADYEN_RETURN_URL,
        })

        return adyenResponse;
    }
}

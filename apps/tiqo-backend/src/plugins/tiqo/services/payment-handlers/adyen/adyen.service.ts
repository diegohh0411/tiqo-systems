import { envConfig } from '../../../../../env-config';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentErrorResult, CreatePaymentResult, RequestContext } from '@vendure/core';
import { CreateSessionInput } from './adyen.dto';

import { Client, CheckoutAPI } from '@adyen/api-library';
import { TiqoOrderService } from '../../order/tiqo-order.service';
import { TiqoErrorCodes } from '../../../errors/tiqo-error';

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
        return `${orderCode}-${Date.now()}`;
    }

    /** This method receives an order code, the ids and quantities of selected orderlines and a tip percentage. It verifies the order exists, the amount that the amount to charge is correct and creates a payment session with Adyen. */
    async createSession(ctx: RequestContext, input: CreateSessionInput): Promise<CreatePaymentResult | CreatePaymentErrorResult> {
        const paymentReference = this.generateReference(input.orderCode);

        try {
            const order = await this.orderService.findOne(ctx, input.orderCode, ["lines"]);

            if (!order) {
                throw new NotFoundException(`Order with code ${input.orderCode} not found`);
            }

            const selectedOrderlines = order.lines.filter(
                line => input.selectedQuantities[line.id] > 0
            );

            const calculatedAmountToCharge = selectedOrderlines.reduce((acc, parentOrderline) => {
                const parentPrice = (parentOrderline.linePrice * input.selectedQuantities[parentOrderline.id] / parentOrderline.quantity);

                const childrenPrices = order.lines
                    .filter((o) => o.customFields?.parentOrderlineId === parentOrderline.id)
                    .reduce((acc, childOrderline) => {
                        return acc + (childOrderline.linePrice * input.selectedQuantities[parentOrderline.id] / parentOrderline.quantity);
                    }, 0);

                return acc + parentPrice + childrenPrices;
            }, 0);

            if (calculatedAmountToCharge !== input.expectedChargeAmount) {
                return {
                    amount: input.expectedChargeAmount,
                    state: 'Error' as const,
                    transactionId: paymentReference,
                    errorMessage: TiqoErrorCodes.EXPECTED_CHARGE_AMOUNT_MISMATCH
                }
            }

            const adyenResponse = await this.checkout.PaymentsApi.sessions({
                merchantAccount: envConfig.ADYEN_MERCHANT_ACCOUNT,
                reference: paymentReference,
                amount: {
                    currency: order.currencyCode,
                    value: calculatedAmountToCharge
                },
                returnUrl: envConfig.ADYEN_RETURN_URL,
            })

            return {
                state: 'Created' as const,
                amount: adyenResponse.amount.value,
                transactionId: adyenResponse.reference
            }
        } catch {
            return {
                amount: input.expectedChargeAmount,
                state: 'Error' as const,
                transactionId: paymentReference,
                errorMessage: TiqoErrorCodes.ADYEN_SESSION_CREATION_FAILED
            }
        }
    }
}

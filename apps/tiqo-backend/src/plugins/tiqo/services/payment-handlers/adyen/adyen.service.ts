import { envConfig } from 'src/env-config';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ID, Product, RequestContext, TransactionalConnection } from '@vendure/core';
import { TIQO_PLUGIN_OPTIONS } from '../../../constants';
import { PluginInitOptions } from '../../../types';
import { CreateSessionInput } from './adyen.dto';

import { Client, CheckoutAPI, Types } from '@adyen/api-library';
import { TiqoOrderService } from '../../order/tiqo-order.service';
import { StandardError, TiqoErrorCodes } from 'src/plugins/tiqo/errors/tiqo-error';

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

    /** This method receives an order code, the ids and quantities of selected orderlines and a tip percentage. It verifies the order exists, the amount that the amount to charge is correct and creates a payment session with Adyen. */
    async createSession(ctx: RequestContext, input: CreateSessionInput) {
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
            throw new StandardError(TiqoErrorCodes.EXPECTED_CHARGE_AMOUNT_MISMATCH);
        }

        await this.checkout.PaymentsApi.sessions({
            merchantAccount: envConfig.ADYEN_MERCHANT_ACCOUNT,
            reference: "",
            amount: {
                currency: order.currencyCode,
                value: calculatedAmountToCharge
            },
            returnUrl: envConfig.ADYEN_RETURN_URL,
        })
    }
}

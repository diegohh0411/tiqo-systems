<template>
  <div class="w-full max-w-lg mx-auto flex flex-col gap-6">
    <UIcon 
      v-if="pfs.stage !== PaymentStages.SELECTING_ORDERLINES" 
      name="lucide-arrow-left"
      
      @click="pfs.prevStage()"
    />

    <OrderDetail 
      v-if="pfs.stage === PaymentStages.SELECTING_ORDERLINES"
      @continue="pfs.nextStage()"
    />

    <OrderTip v-else-if="pfs.stage === PaymentStages.SELECTING_TIP" />

    <OrderSummary v-else-if="pfs.stage === PaymentStages.VIEWING_SUMMARY" />

    <OrderCharge v-else-if="pfs.stage === PaymentStages.CAPTURING_PAYMENT" />
  </div>
</template>

<script setup lang="ts">
import type { CurrencyCode } from '~/codegen/gql/graphql';

  const pfs = usePaymentFlowStore();

  pfs.resetState();
  pfs.order = {
    "code": "090125-P-0037",
    "updatedAt": "2025-05-21T08:56:18.348Z",
    "totalWithTax": 16900,
    "currencyCode": "MXN" as CurrencyCode,
    "lines": [
        {
            "id": "fe8e4340-7965-4a41-b7e0-671ef6d0a545",
            "customFields": {
                "extId": "9f855f9a-2707-43a2-ba6f-99501cf2c0cg",
                "extName": "Americano",
                "extSku": "AR-1701211254398",
                "extUnitCost": 3500,
                "parentOrderlineId": null,
                "hasBeenPaidFor": false,
                "__typename": "OrderLineCustomFields"
            },
            "linePrice": 10500,
            "quantity": 3,
            "__typename": "OrderLine"
        },
        {
            "id": "badce97e-66eb-40c4-bfa1-75b19820747b",
            "customFields": {
                "extId": null,
                "extName": "Complemento",
                "extSku": "missing-modifier-price",
                "extUnitCost": 400,
                "parentOrderlineId": "fe8e4340-7965-4a41-b7e0-671ef6d0a545",
                "hasBeenPaidFor": false,
                "__typename": "OrderLineCustomFields"
            },
            "linePrice": 400,
            "quantity": 1,
            "__typename": "OrderLine"
        },
        {
            "id": "279ae2f3-1c5b-4dd7-b142-0221b9db57ba",
            "customFields": {
                "extId": "9f855f9a-2707-43a2-ba6f-99501cf2c123",
                "extName": "Galleta de chocolate",
                "extSku": "AR-1701211254399",
                "extUnitCost": 2000,
                "parentOrderlineId": null,
                "hasBeenPaidFor": false,
                "__typename": "OrderLineCustomFields"
            },
            "linePrice": 6000,
            "quantity": 3,
            "__typename": "OrderLine"
        }
    ],
    "__typename": "Order"
  }
</script>
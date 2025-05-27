<template>
  <div class="w-full max-w-lg mx-auto flex flex-col gap-6">
    <OrderHeader />

    <OrderDetail
      v-if="pfs.stage === PaymentStages.SELECTING_ORDERLINES"
      @continue="pfs.nextStage()"
    />

    <OrderTip v-else-if="pfs.stage === PaymentStages.SELECTING_TIP" />

    <OrderCheckout v-else-if="pfs.stage === PaymentStages.CAPTURING_PAYMENT" />

  </div>
</template>

<script setup lang="ts">
import type { CurrencyCode } from '~/codegen/gql/graphql';

  const pfs = usePaymentFlowStore();

  pfs.resetState();
  pfs.order = {
    "code": "270525-T-0142",
    "updatedAt": "2025-05-27T14:30:15.248Z",
    "totalWithTax": 51000,
    "currencyCode": "MXN" as CurrencyCode,
    "lines": [
        {
            "id": "fe8e4340-7965-4a41-b7e0-671ef6d0a545",
            "customFields": {
                "extId": "9f855f9a-2707-43a2-ba6f-99501cf2c0c1",
                "extName": "Torrada de Arrachera",
                "extSku": "TR-ARR-001",
                "extUnitCost": 18500,
                "parentOrderlineId": null,
                "hasBeenPaidFor": false,
                "__typename": "OrderLineCustomFields"
            },
            "linePrice": 18500,
            "quantity": 1,
            "__typename": "OrderLine"
        },
        {
            "id": "badce97e-66eb-40c4-bfa1-75b19820747b",
            "customFields": {
                "extId": "9f855f9a-2707-43a2-ba6f-99501cf2c0c2",
                "extName": "Queso extra",
                "extSku": "MOD-QUESO-001",
                "extUnitCost": 1500,
                "parentOrderlineId": "fe8e4340-7965-4a41-b7e0-671ef6d0a545",
                "hasBeenPaidFor": false,
                "__typename": "OrderLineCustomFields"
            },
            "linePrice": 1500,
            "quantity": 1,
            "__typename": "OrderLine"
        },
        {
            "id": "279ae2f3-1c5b-4dd7-b142-0221b9db57ba",
            "customFields": {
                "extId": "9f855f9a-2707-43a2-ba6f-99501cf2c0c3",
                "extName": "Michelada Tecate",
                "extSku": "BEB-MICH-001",
                "extUnitCost": 8500,
                "parentOrderlineId": null,
                "hasBeenPaidFor": false,
                "__typename": "OrderLineCustomFields"
            },
            "linePrice": 17000,
            "quantity": 2,
            "__typename": "OrderLine"
        },
        {
            "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
            "customFields": {
                "extId": "9f855f9a-2707-43a2-ba6f-99501cf2c0c4",
                "extName": "Papas Gajo",
                "extSku": "APP-PAP-001",
                "extUnitCost": 7500,
                "parentOrderlineId": null,
                "hasBeenPaidFor": false,
                "__typename": "OrderLineCustomFields"
            },
            "linePrice": 7500,
            "quantity": 1,
            "__typename": "OrderLine"
        },
        {
            "id": "b2c3d4e5-f6g7-8901-2345-678901bcdefg",
            "customFields": {
                "extId": "9f855f9a-2707-43a2-ba6f-99501cf2c0c5",
                "extName": "Salsa verde extra",
                "extSku": "MOD-SALSA-001",
                "extUnitCost": 1000,
                "parentOrderlineId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
                "hasBeenPaidFor": false,
                "__typename": "OrderLineCustomFields"
            },
            "linePrice": 1000,
            "quantity": 1,
            "__typename": "OrderLine"
        },
        {
            "id": "c3d4e5f6-g7h8-9012-3456-789012cdefgh",
            "customFields": {
                "extId": "9f855f9a-2707-43a2-ba6f-99501cf2c0c6",
                "extName": "Flan Napolitano",
                "extSku": "POST-FLAN-001",
                "extUnitCost": 5500,
                "parentOrderlineId": null,
                "hasBeenPaidFor": false,
                "__typename": "OrderLineCustomFields"
            },
            "linePrice": 5500,
            "quantity": 1,
            "__typename": "OrderLine"
        }
    ],
    "__typename": "Order"
  }
</script>
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
  const route = useRoute();

  let code = route.params.code as string | string[];
  if (Array.isArray(code)) {
    code = code[0];
  }

  const pfs = usePaymentFlowStore();
  pfs.resetState();
  pfs.fetchOrder(code);
</script>
<template>
  <div class="flex flex-col gap-6">
    <h2>Resumen</h2>

    <div
    v-for="item in pfs.selectedOrderlines" :key="item.id"
      class="flex justify-between items-center gap-3"
    >
      <p>{{ item.customFields?.extName }}</p>
      <p>{{ formatPrice(item.linePrice, pfs.order?.currencyCode) }}</p>
    </div>

    <UButton
      class="col-span-full"
      size="xl"
      :disabled="pfs.selectedOrderlines.length == 0"
      trailing-icon="lucide-wallet-cards"
      @click="pfs.nextStage()"
    >
      Pagar
    </UButton>
  </div>
</template>

<script setup lang="ts">
  const pfs = usePaymentFlowStore();
</script>
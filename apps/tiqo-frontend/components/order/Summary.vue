<template>
  <div class="flex flex-col gap-6">
    <h2>Resumen</h2>

    <div class="grid grid-cols-7 gap-3">
      <p class="col-span-1 col-start-1  font-bold">
        Ctd.
      </p>
      
      <p class="col-span-4 font-bold">
        Item
      </p>

      <p class="col-span-2 font-bold">
        Precio
      </p>

      <USeparator class="col-span-full" />

      <template
      v-for="item in pfs.selectedOrderlines" :key="item.id"
      >
        <p class="col-span-1">x{{ pfs.selectedQuantities[item.id] }}</p>
        <p class="col-span-4">{{ item.customFields?.extName }}</p>
        <p class="col-span-2">{{ formatPrice(pfs.getSelectedOrderline(item.id)?.priceToCharge || 0, pfs.order?.currencyCode) }}</p>
      </template>

      <USeparator class="col-span-full" />

      <p class="col-span-2 col-start-4">Propina</p>
      <p class="col-span-1">{{ formatPrice((pfs.selectedTipPercentage || 0) * pfs.selectedPriceBeforeTip, pfs.order?.currencyCode)  }}</p>

      <p class="col-span-2 col-start-4">Total</p>
      <p class="col-span-1">{{ formatPrice(pfs.selectedPriceBeforeTip + (pfs.selectedTipPercentage || 0) * pfs.selectedPriceBeforeTip, pfs.order?.currencyCode) }}</p>
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
<template>
  <div class="flex items-center">
    <UButton
      v-if="pfs.stage !== PaymentStages.SELECTING_ORDERLINES"
      icon="lucide-arrow-left"
      class="w-fit"
      size="xl"
      variant="ghost"
      :disabled="pfs.loading"
      
      @click="pfs.prevStage()"
    />

    <UProgress v-if="pfs.loading" class="w-full" size="sm" />
  </div>
</template>

<script setup lang="ts">
  const pfs = usePaymentFlowStore();
</script>
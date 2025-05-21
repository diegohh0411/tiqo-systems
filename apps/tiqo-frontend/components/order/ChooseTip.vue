<template>
  <div class="grid lg:grid-cols-2 gap-x-2 gap-y-6 w-full">
    <h1 class="col-span-full">Seleccionaste {{ formatPrice(pfs.selectedPrice, pfs.order?.currencyCode) }}</h1>
    <p class="col-span-full">Elige tu propina</p>

    <UButton
      v-for="(percentage, index) in percentages"
      :key="index"
      variant="outline"
      :color="pfs.selectedTipPercentage === percentage ? 'primary' : 'neutral'"
      size="xl"
      @click="pfs.setTip(percentage)"
    >
      {{ percentage * 100 }}% <span class="opacity-50">{{  formatPrice(pfs.selectedPrice * percentage, pfs.order?.currencyCode) }}</span>
    </UButton>
    
    <UInputNumber
      v-model="customTip"
      :step="0.01"
      :format-options="{
        style: 'percent'
      }"
      :min="0"
      :max="1"
      size="xl"
      :color="customTipIsSelected ? 'primary' : 'neutral'"
      :highlight="customTipIsSelected"
      placeholder="Otra propina"
    />

    <UButton
      class="col-span-full"
      size="xl"
      :disabled="pfs.selectedTipPercentage === undefined"
      trailing-icon="lucide-arrow-right"
    >
      <p>Seguir con
        <span v-if="pfs.selectedTipPercentage !== undefined">{{ pfs.selectedTipPercentage * 100 }}% de propina</span>
        <span v-else>propina</span>
      </p>
    </UButton>
  </div>
</template>

<script setup lang="ts">
  const pfs = usePaymentFlowStore();

  const customTip = ref<number|undefined>(undefined);

  const customTipIsSelected = computed(() => {
    return customTip.value !== undefined && pfs.selectedTipPercentage === customTip.value ? true : false
  })

  watch(customTip, (newValue) => {
    if (newValue !== undefined) {
      pfs.setTip(newValue);
    }
  });

  const percentages = [0.25, 0.20, 0.15];
</script>
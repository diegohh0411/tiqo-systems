<template>
  <div class="grid grid-cols-4 gap-x-2 gap-y-6">
    <h2 class="col-span-full">Elige tu propina</h2>
    <p class="col-span-full">Seleccionaste {{ formatPrice(pfs.priceBeforeTip, pfs.order?.currencyCode) }}</p>

    <UButton
      v-for="(percentage, index) in percentages"
      :key="index"

      :variant="pfs.percentageOfTip === percentage && !showOtherPercentage ? 'subtle' : 'outline'"

      class="py-4"
      :class="{
        'rounded-full': pfs.percentageOfTip === percentage && !showOtherPercentage,
      }"

      color="neutral"
      @click="onClick($event, percentage)"
    >
      {{ percentage * 100 }}%
    </UButton>

    <UButton
      :variant="showOtherPercentage ? 'subtle' : 'outline'"
      class="py-4"

      :class="{
        'rounded-full': showOtherPercentage,
      }"

      color="neutral"
      @click="showOtherPercentage = true"
    >
      Otro
    </UButton>
    
    <UFormField v-if="showOtherPercentage" label="Ingresa tu propia cantidad" class="col-span-full">
      <UInputNumber
      v-model="pfs.percentageOfTip"
      class="w-full"
      size="xl"

      :step="0.01"
      :format-options="{
        style: 'percent'
      }"

      :min="0"
      :max="1"

      color="primary"

      :highlight="true"

      placeholder="Otra propina"
      :autofocus="false"
    />
    </UFormField>

    <UButton
      class="col-span-full"
      size="xl"
      trailing-icon="lucide-arrow-right"
      @click="pfs.nextStage()"
    >
      <p>Seguir con
        <span v-if="pfs.percentageOfTip !== undefined">{{ pfs.formattedPercentageOfTip }} de propina</span>
        <span v-else>propina</span>
      </p>
    </UButton>
  </div>
</template>

<script setup lang="ts">
  const pfs = usePaymentFlowStore();

  const percentages = [0.25, 0.20, 0.15];

  const showOtherPercentage = ref<boolean>(false);

  const onClick = (event: MouseEvent, percentage: number) => {
    showOtherPercentage.value = false;
    pfs.setTip(percentage);
    animateClick(event.currentTarget);
  };
</script>
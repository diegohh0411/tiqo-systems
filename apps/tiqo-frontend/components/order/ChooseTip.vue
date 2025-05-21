<template>
  <div class="grid lg:grid-cols-2 gap-x-2 gap-y-6">
    <h1 class="col-span-full">Seleccionaste {{ formatPrice(selectedOrderlines.selectedTotalPrice, order.order?.currencyCode) }}</h1>
    <p class="col-span-full">Elige tu propina</p>

    <UButton
      variant="outline"
      color="neutral"
      size="xl"
    >
      15% <span class="opacity-50">{{  formatPrice(selectedOrderlines.selectedTotalPrice * 0.15, order.order?.currencyCode) }}</span>
    </UButton>

    <UButton
      variant="outline"
      color="neutral"
      size="xl"
    >
      20% <span class="opacity-50">{{  formatPrice(selectedOrderlines.selectedTotalPrice * 0.2, order.order?.currencyCode) }}</span>
    </UButton>

    <UButton
      variant="outline"
      color="neutral"
      size="xl"
    >
      25% <span class="opacity-50">{{  formatPrice(selectedOrderlines.selectedTotalPrice * 0.25, order.order?.currencyCode) }}</span>
    </UButton>

    <UButton
      variant="outline"
      color="neutral"
      size="xl"
    >
      Otro
    </UButton>

    <UButton
    class="col-span-full"
    size="xl"
    >
      Continuar
    </UButton>

  </div>
</template>

<script setup lang="ts">
  const selectedOrderlines = useSelectedOrderLines();
  const order = useOrderStore();
</script>
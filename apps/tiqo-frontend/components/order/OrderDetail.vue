<template>
  <div
  v-if="orderStore.order && !orderStore.loading"
    :class="`
      grid grid-cols-7 gap-2 
      p-0 lg:p-6 w-full max-w-md
      border-0 lg:border
      font-mono rounded
      min-h-64
  `">
  
    <h3 class="col-span-full">Orden {{ orderStore.order.code }}</h3>
    <p class="col-span-full text-xs mb-6">{{ formatTime(orderStore.order.updatedAt) }}</p>

    <p class="col-span-1 col-start-2  font-bold">
      Ctd.
    </p>

    <p class="col-span-3 font-bold">
      Item
    </p>

    <p class="col-span-2 font-bold">
      Precio
    </p>

    <OrderItem
      v-for="(parentLine, parentIndex) in orderStore.order.lines?.filter(l => l?.customFields?.parentOrderlineId === null) || []"
      :id="parentLine.id"

      :key="parentIndex"
      :ext-id="parentLine.customFields?.extId"
      :quantity="parentLine.quantity"
      :name="parentLine.customFields?.extName"
      :unit-cost="parentLine.customFields?.extUnitCost || parentLine.linePrice"

      :child-items="(
        orderStore.order.lines.filter(l => l.customFields?.parentOrderlineId === parentLine.id) || [])
          .map((childLine) => ({
            uuid: childLine.id,
            name: childLine.customFields?.extName,
            quantity: childLine.quantity,
            unitCost: childLine.customFields?.extUnitCost || childLine.linePrice,
          })
      )"
    />
    
    <div class="col-span-full ml-auto mt-3">
      Total
    </div>

    <div class="col-span-full ml-auto text-xl flex gap-3 justify-between">
      <span>$</span>
      <span>{{ formatPrice(orderStore.order.totalWithTax) }}</span>
      <span>{{ orderStore.order.currencyCode }}</span>
    </div> 

    <hr class="col-span-full my-4 border-dashed border-neutral-300 dark:border-neutral-600" >

    <UButton
      :disabled="selectedOrderlines.items.length == 0"
      class="col-span-full text-center"
      size="xl"
      @click="$emit('continue')"
      >
        Seleccionar {{ formatPrice(selectedOrderlines.selectedTotalPrice, orderStore.order.currencyCode) }}
    </UButton>
  </div>

  <div
  v-else-if="orderStore.loading" 
  :class="`
    grid grid-cols-7 gap-2 
    p-0 lg:p-6 w-full max-w-md
    border-0 lg:border
    font-mono rounded
    min-h-64
    animate-pulse
  `">
    <h3 class="col-span-full">Orden ******</h3>
  </div>

  <div v-else>
    <UAlert
      title="Oh oh"
      description="No hemos podido encontrar tu orden"
      icon="lucide-cloud-alert"
      color="error"
      variant="subtle"
    />

  </div>
</template>

<script setup lang="ts">
  defineEmits(['continue']);

  const orderStore = useOrderStore();

  const selectedOrderlines = useSelectedOrderLines();
</script>
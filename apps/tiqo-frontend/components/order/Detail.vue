<template>
  <div
  v-if="pfs.order && !pfs.fetching"
    :class="`
      grid grid-cols-7 gap-2 
      w-full max-w-md
      rounded
      min-h-64
  `">

    <h3 class="col-span-full">Orden {{ pfs.order.code }}</h3>
    <p class="col-span-full text-xs mb-6">{{ formatTime(pfs.order.updatedAt) }}</p>

    <p class="col-span-1 col-start-1  font-bold">
      Ctd.
    </p>

    <p class="col-span-4 font-bold">
      Item
    </p>

    <p class="col-span-2 font-bold">
      Precio
    </p>

    <OrderItem
      v-for="(parentLine, parentIndex) in pfs.order.lines?.filter(l => l?.customFields?.parentOrderlineId === null) || []"
      :id="parentLine.id"

      :key="parentIndex"
      :ext-id="parentLine.customFields?.extId"
      :quantity="parentLine.quantity"
      :name="parentLine.customFields?.extName"
      :unit-cost="parentLine.customFields?.extUnitCost || parentLine.linePrice"

      :child-items="(
        pfs.order.lines.filter(l => l.customFields?.parentOrderlineId === parentLine.id) || [])
          .map((childLine) => ({
            uuid: childLine.id,
            name: childLine.customFields?.extName,
            quantity: childLine.quantity,
            unitCost: childLine.customFields?.extUnitCost || childLine.linePrice,
          })
      )"
    />
    
    <div class="col-span-full ml-auto mt-3">
      Total de la cuenta
    </div>

    <div class="col-span-full ml-auto text-xl flex gap-3 justify-between">
      <span>$</span>
      <span>{{ formatPrice(pfs.order.totalWithTax) }}</span>
      <span>{{ pfs.order.currencyCode }}</span>
    </div>

    <hr class="col-span-full my-4 border-dashed border-neutral-300 dark:border-neutral-600" >

    <UButton
      :disabled="pfs.selectedOrderlines.length == 0"
      class="col-span-full"
      size="xl"
      trailing-icon="lucide-arrow-right"
      @click="pfs.nextStage()"
      >
        Seleccionar {{ formatPrice(pfs.priceBeforeTip, pfs.order.currencyCode) }}
    </UButton>
  </div>

  <div v-else-if="pfs.fetching" class="flex flex-col items-center gap-4">
    <p>Cargando...</p>
    <UIcon
      name="lucide-loader"
      class="animate-spin size-24"
    />
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
  const pfs = usePaymentFlowStore();
</script>
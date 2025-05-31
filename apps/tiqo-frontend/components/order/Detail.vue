<template>
  <OrderDetailSkeleton v-if="pfs.loading" />

  <div
    v-if="pfs.order"
    :class="`
      grid grid-cols-7 gap-2 
      w-full
      rounded
      min-h-64
  `">
    <h3 class="col-span-full">Orden de la mesa {{ pfs.order.customFields?.placedAt?.name || '' }}</h3>
    <div class="col-span-full flex gap-3 items-center justify-between mb-6 font-mono">
      <p class="text-xs">Código: {{ pfs.order.code  }}</p>
      <p class="text-xs">Actualizado el {{ formatTime(pfs.order.updatedAt) }}</p>
    </div>

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
      Total seleccionado
    </div>

    <div class="col-span-full ml-auto flex gap-3 justify-between">
      <span>$</span>
      <span>{{ formatPrice(pfs.priceBeforeTip) }}</span>
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
        Continuar
    </UButton>
  </div>

  <div v-else-if="!pfs.loading">
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
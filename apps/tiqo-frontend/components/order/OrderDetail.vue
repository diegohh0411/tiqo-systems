<script setup lang="ts">
import { graphql } from '~/codegen/gql';
import { type FragmentType, useFragment } from "~/codegen/gql/fragment-masking";

const OrderFragment = graphql(`
    fragment OrderFragment on Order {
      code
      updatedAt
      totalWithTax
      currencyCode
      lines {
        id
        customFields {
          extId
          extName
          extSku
          extUnitCost
          extParentOrderlineId
          hasBeenPaidFor
        }
        linePrice
        quantity
      }
    }
  `)

const props = defineProps<{
  order: FragmentType<typeof OrderFragment>;
}>();

const order = useFragment(OrderFragment, props.order);

const selectedOrderlines = ref<string[]>([]);
const handleSelectionChange = (payload: { uuid: string, extId: string | null | undefined, selected: boolean }) => {
  const allChildrenIds = (order.lines?.filter((line) => line.customFields?.extParentOrderlineId === payload.extId) || [])
    .map((line) => line.id);

  if (payload.selected) {
    selectedOrderlines.value.push(payload.uuid, ...allChildrenIds);
  } else {
    selectedOrderlines.value = selectedOrderlines.value.filter((id) => id !== payload.uuid && !allChildrenIds.includes(id));
  }
};

const selectedPrice = computed(() => {
  return order.lines?.reduce((acc, line) => {
    if (selectedOrderlines.value.includes(line.id)) {
      return acc + (line.customFields?.extUnitCost || line.linePrice) * line.quantity;
    }
    return acc;
  }, 0) || 0;
});

</script>

<template>
  <div
    :class="`
      grid grid-cols-7 gap-2 p-4
      lg:p-6 w-full max-w-md
      surface
      border font-mono rounded
  `">
  
    <h3 class="col-span-full">Orden {{ order.code }}</h3>
    <p class="col-span-full text-xs mb-6">{{ formatTime(order.updatedAt) }}</p>

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
      v-for="(parentLine, parentIndex) in order.lines?.filter(l => l?.customFields?.extParentOrderlineId === null) || []"
      :key="parentIndex"

      :uuid="parentLine.id"
      :ext-id="parentLine.customFields?.extId"
      :quantity="parentLine.quantity"
      :name="parentLine.customFields?.extName"
      :unit-cost="parentLine.customFields?.extUnitCost || parentLine.linePrice"

      :child-items="(
        order.lines?.filter(l => l.customFields?.extParentOrderlineId === parentLine.customFields?.extId) || [])
          .map((childLine) => ({
            uuid: childLine.id,
            name: childLine.customFields?.extName,
            quantity: childLine.quantity,
            unitCost: childLine.customFields?.extUnitCost || childLine.linePrice,
          })
      )"

      @selection-change="handleSelectionChange"
    />
    
    <div class="col-span-full ml-auto mt-3">
      Total
    </div>

    <div class="col-span-full ml-auto text-xl flex gap-3 justify-between">
      <span>$</span>
      <span>{{ formatPrice(order.totalWithTax) }}</span>
      <span>{{ order.currencyCode }}</span>
    </div> 

    <hr class="col-span-full my-4 border-dashed border-neutral-300 dark:border-neutral-600" >

    <CoreButton
      :disabled="selectedOrderlines.length == 0"
      :effect="'expandWhileLoading'"
      :class="`
        col-span-full
        ${
        selectedOrderlines.length > 0 ? 'bg-blue-400 text-white dark:bg-blue-700' : 'cursor-not-allowed  bg-neutral-200 dark:bg-neutral-700' }`">
      <p>Pagar {{ formatPrice(selectedPrice, order.currencyCode) }}</p>
    </CoreButton>
  </div>
</template>
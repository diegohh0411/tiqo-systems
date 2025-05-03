<script setup lang="ts">
import { graphql } from '~/codegen/gql';
import { type FragmentType, useFragment } from "~/codegen/gql/fragment-masking";
import { gsap } from 'gsap';

const OrderFragment = graphql(`
    fragment OrderFragment on Order {
      code
      updatedAt
      total
      currencyCode
      lines {
        id
        customFields {
          extId
          extName
          extSku
          extUnitCost
          extParentOrderlineId
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

const toggleSelection = (internalId: string | null = null, externalId: string | null = null) => {
  if (!internalId) return;

  const childrenThatBelongToParent = order.lines?.filter(l => l.customFields?.extParentOrderlineId === externalId) || [];
  const parentLine = document.getElementById(`orderline:${internalId}`);

  if (selectedOrderlines.value.includes(internalId)) {
    console.log('Unselecting');
    selectedOrderlines.value = selectedOrderlines.value.filter(id => id !== internalId);
    for (const child of childrenThatBelongToParent) {
      selectedOrderlines.value = selectedOrderlines.value.filter(id => id !== child.id);
    }

    gsap.to(parentLine, {
      // borderRadius: '0.25rem',
      paddingLeft: '0.5rem',
      ease: 'elastic',
    });
  } else {
    selectedOrderlines.value.push(internalId);
    for (const child of childrenThatBelongToParent) {
      selectedOrderlines.value.push(child.id);
    }

    gsap.to(parentLine, {
      // borderRadius: '1.25rem',
      paddingLeft: '1rem',
      ease: 'elastic',
    });
  }
}

const getSelectedOrderlines = () => {
  return order.lines?.filter(l => selectedOrderlines.value.includes(l.id ?? '')) || [];
}

const getSelectedOrderlinesTotal = () => {
  return getSelectedOrderlines().reduce((acc, line) => {
    const unitCost = line.customFields?.extUnitCost || line.linePrice;
    return acc + (unitCost / 100) * line.quantity;
  }, 0).toFixed(2);
}
</script>

<template>
  <div
    :class="`
      grid grid-cols-6 gap-2 p-4
      lg:p-6 w-full max-w-md
      bg-gray-100 dark:bg-neutral-800 
      border-neutral-300 dark:border-neutral-600
      border font-mono rounded
    `">
    <h3 class="col-span-full">Orden {{ order.code }}</h3>
    <p class="col-span-full text-xs mb-6">{{ formatTime(order.updatedAt) }}</p>

    <p class="col-span-1 font-bold">
      Ctd.
    </p>

    <p class="col-span-3 font-bold">
      Item
    </p>

    <p class="col-span-2 font-bold">
      Precio
    </p>

    <div
      v-for="(parentLine, parentIndex) in order.lines?.filter(l => l?.customFields?.extParentOrderlineId === null) || []"
      :id="`orderline:${parentLine.id}`" :key="parentIndex" 
      :class="`
        col-span-full grid grid-cols-6 gap-y-0 gap-x-1
        border p-2 rounded cursor-pointer
        ${selectedOrderlines.includes(parentLine.id ?? '') ? 'border-blue-300 dark:border-blue-500 bg-blue-100 dark:bg-blue-800' : 'border-neutral-300 dark:border-neutral-600' } 
        bg-neutral-200 dark:bg-neutral-700
      `" 
      @click="toggleSelection(parentLine.id, parentLine.customFields?.extId)">
      <div class="col-span-1">x{{ parentLine.quantity }}</div>
      <div class="col-span-3">{{ parentLine.customFields?.extName }}</div>
      <div class="col-span-2 flex justify-between"><span>$</span>{{ ((parentLine.customFields?.extUnitCost ||
        parentLine.linePrice) / 100 * parentLine.quantity).toFixed(2) }}</div>

      <template
        v-for="(childLine, childIndex) in order.lines?.filter(l => l.customFields?.extParentOrderlineId === parentLine.customFields?.extId) || []"
        :key="childIndex">
        <div class="col-span-3 col-start-2 opacity-50">{{ childLine.customFields?.extName }}</div>
        <div class="col-span-2 opacity-50 ml-auto"><span>+ {{ ((childLine.customFields?.extUnitCost ||
          childLine.linePrice) / 100).toFixed(2) }}</span></div>
      </template>
    </div>

    <div class="col-span-full ml-auto mt-3">
      Total
    </div>

    <div class="col-span-full ml-auto text-xl flex gap-3 justify-between">
      <span>$</span>
      <span>{{ formatPrice(order.total) }}</span>
      <span>{{ order.currencyCode }}</span>
    </div>

    <hr class="col-span-full my-4 border-dashed border-gray-300">

    <p class="col-span-full text-xs">Haz click sobre los items de la orden para seleccionarlos y pagar.</p>
    <TiqoButton
      :disabled="selectedOrderlines.length == 0"
      :class="`
        col-span-full px-3 py-4 rounded text-center
        ${
        selectedOrderlines.length > 0 ? 'bg-blue-300 dark:bg-blue-700' : 'cursor-not-allowed bg-neutral-200 bg-neutral-700' }`">
      <p>Pagar ${{ getSelectedOrderlinesTotal() }} {{ order.currencyCode }}</p>
    </TiqoButton>
</div></template>
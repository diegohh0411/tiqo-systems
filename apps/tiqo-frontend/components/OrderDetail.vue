<script setup lang="ts">
  import { graphql } from '~/types/gql';
  import { type FragmentType, useFragment } from "~/types/gql/fragment-masking";

  const OrderFragment = graphql(`
    fragment OrderFragment on Order {
      code
      updatedAt
      total
      currencyCode
      lines {
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
</script>

<template>
  <div class="bg-gray-100 border border-gray-300 p-4 lg:p-6 w-full max-w-md grid grid-cols-6 gap-1 font-mono rounded">
      <h3 class="col-span-full">Orden no. <span class="font-medium">{{ order.code }}</span></h3>
      <p class="col-span-full text-xs mb-6">{{ (new Date(order.updatedAt)).toISOString() }}</p>

      <p class="col-span-1 font-bold">
        Ctd.
      </p>

      <p class="col-span-3 font-bold">
        Item
      </p>

      <p class="col-span-2 font-bold">
        Precio
      </p>

      <hr class="col-span-full">
      
      <template v-for="(parentLine, parentIndex) in order.lines?.filter(l => l?.customFields?.extParentOrderlineId === null) || []" :key="parentIndex">
          <div class="col-span-1">x{{ parentLine.quantity }}</div>
          <div class="col-span-3">{{ parentLine.customFields?.extName }}</div>
          <div class="col-span-2 flex justify-between"><span>$</span>{{ ((parentLine.customFields?.extUnitCost || parentLine.linePrice)/100 * parentLine.quantity).toFixed(2) }}</div>

          <template v-for="(childLine, childIndex) in order.lines?.filter(l => l?.customFields?.extParentOrderlineId !== null) || []" :key="childIndex">
            <div class="col-span-3 col-start-2 opacity-50">{{ childLine.customFields?.extName }}</div>
            <div class="col-span-2 opacity-50 ml-auto"><span>+ {{ ((childLine.customFields?.extUnitCost || childLine.linePrice)/100).toFixed(2) }}</span></div>
          </template>
      </template>
      
      <div class="col-span-full ml-auto mt-3">
        Total
      </div>

      <div class="col-span-full ml-auto text-xl flex gap-3 justify-between">
        <span>$</span> 
        <span>{{ (order.total/100).toFixed(2) }}</span>
        <span>{{ order.currencyCode }}</span>
      </div>
  </div>
</template>

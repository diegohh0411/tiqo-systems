<script setup lang="ts">
import { graphql } from '~/codegen/gql';
import { type FragmentType, useFragment } from "~/codegen/gql/fragment-masking";

const TableFragment = graphql(`
    fragment TableFragment on Table {
      id
      extName
      orders {
        id
        code
        total
        currencyCode
        createdAt
      }
    }
  `);

const props = defineProps<{
  table: FragmentType<typeof TableFragment>;
}>();

const table = useFragment(TableFragment, props.table);
</script>

<template>
  <h3>{{ table.extName }}</h3>
  <p><span class="font-bold">{{ table.extName }}</span> tiene {{ table.orders.length }} órdenes abiertas</p>

  <NuxtLink v-for="order in table.orders" :key="order?.id" :to="{ name: 'order-code', params: { code: order?.code } }"
    class="bg-gray-100 border border-gray-300 p-4 lg:p-6 w-full max-w-sm rounded grid grid-cols-2">
    <p class="font-bold">{{ order?.code }}</p>
    <p>{{ formatPrice(order?.total, order?.currencyCode ?? 'MXN') }}</p>
    <p>{{ formatTime(order?.createdAt) }}</p>
  </NuxtLink>

</template>
<script setup lang="ts">
  import { graphql } from '~/types/gql';
  import { type FragmentType, useFragment } from "~/types/gql/fragment-masking";

  const TableFragment = graphql(`
    fragment TableFragment on Table {
      id
      name
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
  <h3>{{ table.name }}</h3>
  <p><span class="font-bold">{{ table.name }}</span> tiene {{  table.orders.length }} órdenes abiertas</p>

  <NuxtLink 
    v-for="order in table.orders" 
    :key="order?.id" 
    :to="{ name: 'order-code', params: { code: order?.code } }" 
    class="bg-gray-100 border border-gray-300 p-4 lg:p-6 w-full max-w-md rounded"
  >
    <p>{{ formatTime(order?.createdAt) }}</p>
    <p>{{ order?.code }}</p>
    <p>{{ formatPrice(order?.total, order?.currencyCode ?? 'MXN')  }}</p>
  </NuxtLink>
  
</template>
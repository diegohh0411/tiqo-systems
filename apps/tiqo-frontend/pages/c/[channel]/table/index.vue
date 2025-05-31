<script setup lang="ts">
import { graphql } from '~/codegen/gql';

const { result, loading, error } = useQuery(
  graphql(`
    query ReadTables {
      readTables {
        id
        name
      }
    }
  `),
  {},
  commonQueryOptions
);
const tables = computed(() => result.value?.readTables.filter(t => !!t) || []);
</script>

<template>
  <div>
    <p>{{ JSON.stringify({ result, loading, error }) }}</p>

    <NuxtLink v-for="table in tables" :key="table.id" :to="`table/${table?.id}`">
      <h2>{{ table.name }}</h2>
    </NuxtLink>
  </div>
</template>
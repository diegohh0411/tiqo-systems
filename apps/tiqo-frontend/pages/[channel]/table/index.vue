<script setup lang="ts">
import { graphql } from '~/codegen/gql';

const route = useRoute();
const channel = route.params.channel;

const { result, loading, error } = useQuery(
  graphql(`
    query ReadTables {
      readTables {
        ...TableFragment
      }
    }
  `)
);
</script>

<template>
  <div v-if="result != undefined">
    <NuxtLink v-for="table in result.readTables || []" :key="table?.id" :to="`/${channel}/table/${table.id}`">
      <h2>{{ table?.name }}</h2>
      <p>{{ table?.description }}</p>
      <nuxt-link :to="`/${channel}/table/${table.id}`">View Table</nuxt-link>
    </NuxtLink>
  </div>
</template>
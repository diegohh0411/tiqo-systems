<script lang="ts" setup>
  import { graphql } from '~/types/gql';

  const route = useRoute();
  let id = route.params.id;
  if (Array.isArray(id)) {
    id = id[0];
  }

  const { result, loading, error } = useQuery(
    graphql(`
      query ReadTable($id: ID!) {
        readTable(id: $id) {
          ...TableFragment
        }
      }
    `), {
      id,
    }
  );
</script>

<template>
  <TableDetail v-if="!loading && !error && result?.readTable" :table="result.readTable" />
</template>
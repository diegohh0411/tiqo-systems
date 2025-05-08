<script setup lang="ts">
import { graphql } from '~/codegen/gql';

const route = useRoute();
let code = route.params.code;
if (Array.isArray(code)) {
  code = code[0];
}

const { result, loading, error } = useQuery(
  graphql(`
      query ReadOrder($code: String!) {
        readOrder(code: $code) {
         ...OrderFragment
        }
      }
    `), {
  code,
});
</script>

<template>
  <OrderDetail 
    v-if="!loading && !error && result?.readOrder" :order="result.readOrder" 
    class="mx-auto"  
  />
</template>
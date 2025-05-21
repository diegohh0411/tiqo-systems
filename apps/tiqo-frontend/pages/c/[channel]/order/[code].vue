<script setup lang="ts">
import { graphql } from '~/codegen/gql';
import type { OrderFragmentFragment } from '~/codegen/gql/graphql';

const route = useRoute();
let code = route.params.code as string | string[];
if (Array.isArray(code)) {
  code = code[0];
}

const orderStore = useOrderStore();

orderStore.loading = true;
const { onResult, onError } = useQuery(
  graphql(`
    query ReadOrder($code: String!) {
      readOrder(code: $code) {
        ...OrderFragment
      }
    }
  `),
  { code },
);

onResult(({ data }) => {
  console.log('data', data);
  if (data?.readOrder) {
    orderStore.loading = false;
    orderStore.setOrder(data.readOrder as OrderFragmentFragment);
  }
})

onError((error) => {
  console.error('Error fetching order:', error);
  orderStore.loading = false;
});

</script>

<template>
  <OrderDetail class="mx-auto" />
</template>
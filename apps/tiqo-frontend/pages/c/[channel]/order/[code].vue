<template>
  <OrderDetail 
    v-if="flowState === OrderFlowState.SELECTING_ORDERLINES" class="mx-auto" 
    @continue="flowState = OrderFlowState.SELECTING_TIP"
  />
  <OrderChooseTip v-else-if="flowState === OrderFlowState.SELECTING_TIP" class="mx-auto" />
</template>

<script setup lang="ts">
  import { graphql } from '~/codegen/gql';
  import type { OrderFragmentFragment } from '~/codegen/gql/graphql';

  enum OrderFlowState {
    SELECTING_ORDERLINES = 'SELECTING_ORDERLINES',
    SELECTING_TIP = 'SELECTING_TIP',
  }
  const flowState = ref<OrderFlowState>(OrderFlowState.SELECTING_ORDERLINES);

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
    
    orderStore.loading = false;
    if (data?.readOrder) {
      orderStore.setOrder(data.readOrder as OrderFragmentFragment);
    }
  })

  onError((error) => {
    console.error('Error fetching order:', error);
    orderStore.loading = false;
  });

</script>
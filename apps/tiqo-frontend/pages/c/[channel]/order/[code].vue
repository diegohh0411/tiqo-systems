<template>
  <div class="w-full max-w-lg mx-auto flex flex-col gap-6">
    <UIcon 
      v-if="pfs.stage !== PaymentStages.SELECTING_ORDERLINES" 
      name="lucide-arrow-left"
      
      @click="pfs.prevStage()"
    />

    <OrderDetail 
      v-if="pfs.stage === PaymentStages.SELECTING_ORDERLINES"
      @continue="pfs.nextStage()"
    />

    <OrderChooseTip v-else-if="pfs.stage === PaymentStages.SELECTING_TIP" />

    <OrderSummary v-else-if="pfs.stage === PaymentStages.VIEWING_SUMMARY" />
  </div>
</template>

<script setup lang="ts">
  import { graphql } from '~/codegen/gql';
  import type { OrderFragmentFragment } from '~/codegen/gql/graphql';

  const route = useRoute();
  let code = route.params.code as string | string[];
  if (Array.isArray(code)) {
    code = code[0];
  }

  const pfs = usePaymentFlowStore();

  pfs.loading = true;
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
    pfs.loading = false;
    if (data?.readOrder) {
      pfs.order = data.readOrder as OrderFragmentFragment;
    }
  });

  onError((error) => {
    console.error('Error fetching order:', error);
    pfs.loading = false;
  });

</script>
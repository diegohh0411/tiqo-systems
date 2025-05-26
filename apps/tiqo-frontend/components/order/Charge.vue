<template>
  <div>
    <h2>Charge</h2>
    <p>Amount:</p>
    <p>Status:</p>
  </div>
</template>

<script setup lang="ts">
  import { graphql } from "~/codegen/gql";
  const pfs = usePaymentFlowStore();

  const { mutate } = tMutation(
    graphql(`
      mutation CreateSession($input: CreateSessionInput!) {
        createAdyenSession(input: $input)
      }
    `)
  )

  mutate({
    input: {
      orderCode: pfs.order?.code || "",
      selectedOrderlines: pfs.selectedOrderlines,
      tipPercentage: pfs.percentageOfTip,
      expectedChargeAmount: pfs.priceOfTip,
    },
  })
    .then((response) => {
      console.log("Session created:", response);
    })
    .catch((error) => {
      console.error("Error creating session:", error);
    });

</script>
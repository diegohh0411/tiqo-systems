<template>
  <div ref="adyenCardContainer" />

  <div v-if="response && response.errors">
    <UAlert v-for="(error, index) in response.errors" :key="index" color="error" variant="outline" :description="error.message"/>
  </div>
</template>

<script setup lang="ts">
  import { graphql } from "~/codegen/gql";
  import { AdyenCheckout, Card } from "@adyen/adyen-web";
  import '@adyen/adyen-web/styles/adyen.css';

  const pfs = usePaymentFlowStore();

  const { mutate } = tMutation(
    graphql(`
      mutation CreateSession($input: CreateSessionInput!) {
        createAdyenSession(input: $input)
      }
    `)
  )

  console.log(pfs.priceAfterTip)

  const response = await mutate({
    input: {
      orderCode: pfs.order?.code || "",
      selectedQuantities: pfs.selectedQuantities,
      tipPercentage: pfs.percentageOfTip,
      expectedChargeAmount: pfs.priceAfterTip,
    },
  })

  const adyenCardContainer = ref<HTMLDivElement | null>(null);

  // Move Adyen initialization to onMounted
  onMounted(async () => {
    if (response?.data?.createAdyenSession && adyenCardContainer.value) {
      const data = response.data.createAdyenSession;

      const globalConfig = {
        session: {
          id: data.id,
          sessionData: data.sessionData,
        },
        environment: "test" as const,
        amount: data.amount,
        locale: 'es-MX',
        countryCode: 'MX',
        clientKey: "test_W3BHRZD6TNBGFMSUAGGDHNCXSMVGIUFR"
      }

      const checkout = await AdyenCheckout(globalConfig);
      console.log({checkout})

      new Card(checkout, {}).mount(adyenCardContainer.value);
    } else {
      console.log(response)
    }
  });
</script>
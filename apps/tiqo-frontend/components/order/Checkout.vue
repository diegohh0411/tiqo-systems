<template>
  <div class="flex flex-col gap-6">
    <h2>Resumen</h2>

    <div class="grid grid-cols-7 gap-3">
      <p class="col-span-1 col-start-1  font-bold">
        Ctd.
      </p>
      
      <p class="col-span-4 font-bold">
        Item
      </p>

      <p class="col-span-2 font-bold">
        Precio
      </p>

      <USeparator class="col-span-full" />

      <template
      v-for="item in pfs.selectedOrderlines" :key="item.id"
      >
        <p class="col-span-1">x{{ pfs.selectedQuantities[item.id] }}</p>
        <p class="col-span-4">{{ item.customFields?.extName }}</p>
        <p class="col-span-2">{{ formatPrice(pfs.getSelectedOrderline(item.id)?.priceToCharge || 0, pfs.order?.currencyCode) }}</p>
      </template>

      <p class="col-span-3 col-start-3 font-bold">Subtotal</p>
      <p class="col-span-1">{{ formatPrice(pfs.priceBeforeTip, pfs.order?.currencyCode) }}</p>

      <USeparator class="col-span-full" />

      <p class="col-span-3 col-start-3">Propina <span class="opacity-50">({{ pfs.formattedPercentageOfTip }})</span></p>
      <p class="col-span-1">{{ formatPrice(pfs.priceOfTip, pfs.order?.currencyCode)  }}</p>

      <p class="col-span-3 col-start-3 font-bold">Total</p>
      <p class="col-span-1">{{ formatPrice(pfs.priceAfterTip, pfs.order?.currencyCode) }}</p>
    </div>

    <div ref="adyenContainer" class="col-span-full" />

    <UButton
      v-if="adyenCheckoutObject === null"
      class="col-span-full"
      size="xl"
      :disabled="pfs.selectedOrderlines.length == 0"
      :loading="pfs.loading"
      trailing-icon="lucide-arrow-right"
      @click="requestAdyenSession"
    >
      Proceder al pago
    </UButton>

    <USeparator v-else class="my-6" icon="lucide-credit-card" />

    <div ref="adyenCardContainer" />
  </div>
</template>

<script setup lang="ts">
  import { graphql } from "~/codegen/gql";
  import { AdyenCheckout, Card, type ICore } from "@adyen/adyen-web";
  import '@adyen/adyen-web/styles/adyen.css';

  const pfs = usePaymentFlowStore();
  
  const adyenCardContainer = ref<HTMLDivElement | null>(null);
  const adyenCheckoutObject = ref<ICore | null>(null);

  const { mutate } = tMutation(
    graphql(`
      mutation CreateSession($input: CreateSessionInput!) {
        createAdyenSession(input: $input)
      }
    `)
  )

  const requestAdyenSession = async () => {
    pfs.loading = true;

    const response = await mutate({
      input: {
        orderCode: pfs.order?.code || "",
        selectedQuantities: pfs.selectedQuantities,
        tipPercentage: pfs.percentageOfTip,
        expectedChargeAmount: pfs.priceAfterTip,
      },
    })

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

      adyenCheckoutObject.value = await AdyenCheckout(globalConfig);
      new Card(unref(adyenCheckoutObject) as ICore, {}).mount(adyenCardContainer.value); // Asserting that adyenCheckoutObject is not null
    }

    pfs.loading = false;
  }
</script>
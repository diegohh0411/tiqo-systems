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
      <p class="col-span-1">{{ formatPrice(pfs.priceWithTip, pfs.order?.currencyCode) }}</p>
    </div>

    <div ref="adyenContainer" class="col-span-full" />

    <UButton
      class="col-span-full"
      size="xl"
      :disabled="pfs.selectedOrderlines.length == 0"
      trailing-icon="lucide-arrow-right"
      @click="pfs.nextStage()"
    >
      Ir al pago
    </UButton>
  </div>
</template>

<script setup lang="ts">
  

  const pfs = usePaymentFlowStore();

  /**
  import { AdyenCheckout, Card } from '@adyen/adyen-web';
  
  const adyenContainer = ref<HTMLElement>();

  const checkout = await AdyenCheckout({
    session: {
      id: 'CSD9CAC3...', // Unique identifier for the payment session.
      sessionData: 'Ab02b4c...' // The payment session data.
    },
    environment: 'test', // Change to 'live' for the live environment.
    amount: {
      value: 1000,
      currency: 'EUR'
    },
    locale: 'nl-NL',
    countryCode: 'NL',
    clientKey: 'test_870be2...', // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
    onPaymentCompleted: (result, component) => {
      console.info(result, component);
    },
    onPaymentFailed: (result, component) => {
      console.info(result, component);
    },
    onError: (error, component) => {
      console.error(error.name, error.message, error.stack, component);
    }
  });

  const _cardComponent = new Card(checkout, {}).mount(adyenContainer.value as HTMLElement);
   */
</script>
<template>
  <div
    ref="orderline"
    class="`
      col-span-full 
      grid grid-cols-7 gap-y-0 gap-x-1 p-2
      border
      cursor-pointer
      rounded
    `"
    :class="{
      'bg-neutral-100 dark:bg-neutral-800' : selected,

    }"
  >
    <div class="col-span-1">x{{ props.quantity }}</div>
    <div class="col-span-4">{{  props.name || 'Sin nombre' }}</div>
    <div class="col-span-2 flex justify-between"><span>$</span>{{ formatPrice(props.unitCost * props.quantity) }}</div>

    <template v-for="(childItem) in props.childItems" :key="childItem.uuid">
      <div class="col-span-4 col-start-2 opacity-50">{{ childItem.name || 'Sin nombre' }}</div>
      <div class="col-span-2 opacity-50 ml-auto"><span>+ {{ formatPrice(childItem.unitCost * childItem.quantity) }}</span></div>
    </template>

    <UInputNumber
      v-model="selectedQuantity"
      class="col-span-full mt-3"
      :max="props.quantity"
      :min="0"
      color="neutral"
    />
  </div>
</template>

<script setup lang="ts">
  import { gsap } from "gsap";

  const props = defineProps<{
    id: string;
    extId: string | null | undefined;
    quantity: number;
    name: string|null|undefined;
    unitCost: number;

    childItems: {
      uuid: string;
      name: string | null | undefined;
      quantity: number;
      unitCost: number;
    }[];
  }>();

  const orderline = ref<HTMLElement | null>(null);

  const store = useSelectedOrderLines();
  const selected = computed(() => selectedQuantity.value > 0);
  const selectedQuantity = ref(0);

  const existingState = store.items.find((item) => item.id === props.id);
  if (existingState) {
    selectedQuantity.value = existingState.selectedQuantity;
  }

  const tl = gsap.timeline({
    defaults: {
      duration: 0.1,
      ease: 'power4.out'
    }
  });

  watch(selectedQuantity, (newQuantity) => {
    if (newQuantity > 0) {
      store.addSelectedOrderline(props.id, selectedQuantity.value)

      tl.to(orderline.value, {
        scale: 0.98,
      })

      tl.to(orderline.value, {
        scale: 1.02,
      });
    } else {
      store.removeSelectedOrderline(props.id);
      tl.to(orderline.value, {
        scale: 1,
      });
    }
  })

</script>
<template>
  <div
    ref="orderline"
    class="`
      col-span-full 
      grid grid-cols-7 gap-y-0 gap-x-1 p-2
      border border-neutral-300 dark:border-neutral-500
      rounded cursor-pointer
    `"
    :class="{
      'bg-neutral-200 dark:bg-neutral-700' : selected,
    }"
    @click="toggleSelection"
  >
    <Icon v-if="selected" name="lucide:check-square" />
    <Icon v-else name="lucide:square" />
    <div class="col-span-1">x{{ props.quantity }}</div>
    <div class="col-span-3">{{  props.name || 'Sin nombre' }}</div>
    <div class="col-span-2 flex justify-between"><span>$</span>{{ formatPrice(props.unitCost * props.quantity) }}</div>

    <template v-for="(childItem) in props.childItems" :key="childItem.uuid">
      <div class="col-span-3 col-start-3 opacity-50">{{ childItem.name || 'Sin nombre' }}</div>
      <div class="col-span-2 opacity-50 ml-auto"><span>+ {{ formatPrice(childItem.unitCost * childItem.quantity) }}</span></div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { gsap } from 'gsap';

  const props = defineProps<{
    uuid: string;
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

  const emit = defineEmits<{
    (event: 'selection-change', payload: { uuid: string, extId: string|null|undefined, selected: boolean }): void;
  }>();

  const orderline = ref<HTMLElement | null>(null);

  const selected = ref(false);

  const toggleSelection = () => {
    selected.value = !selected.value;
    emit('selection-change', {
      uuid: props.uuid,
      extId: props.extId,
      selected: selected.value,
    })

    const tl = gsap.timeline({
        defaults: {
          duration: 0.1,
          ease: 'power4.out'
        }
      }
    );

    tl.to(orderline.value, {
      scale: 0.98,
    })

    tl.to(orderline.value, {
      scale: 1,
    });

  }

</script>
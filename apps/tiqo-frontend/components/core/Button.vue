<template>
  <button
    ref="buttonRef"
    class="flex items-center justify-center px-3 py-4 gap-2 rounded cursor-pointer"
    :class="props.class"

    @mouseenter="onHover"
    @mouseleave="onLeave"
    @click="onClick"
  >

    <Icon v-if="props.effect == 'expandWhileLoading' && hasBeenClicked" name="lucide:loader" class="animate-spin" />
    <slot>Default value</slot>
    
  </button>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { gsap } from 'gsap';

  const props = defineProps<{
    class?: string;
    disabled?: boolean,
    effect?: 'expandWhileLoading';
  }>();

  const hasBeenClicked = ref(false);

  const buttonRef = ref<HTMLElement | null>(null);

  const tl = gsap.timeline({
    defaults: {
      duration: 0.2,
      ease: 'power4.out'
    }
  });

  const onHover = () => {
    console.log({ buttonRef });
    if (buttonRef.value && !props.disabled) {
      tl.to(buttonRef.value, {
        scale: 1.04,
      });
    }
  }

  const onLeave = () => {
    if (buttonRef.value) {
      tl.to(buttonRef.value, {
        scale: 1,
      });
    }
  }

  const onClick = () => {
    if (props.disabled) return;
    hasBeenClicked.value = true;

    if (props.effect === 'expandWhileLoading') {
      tl.to(buttonRef.value, {
        ease: 'expo.out',
        duration: 1.4,
        scale: 1.08,
      });
    }
  }
</script>
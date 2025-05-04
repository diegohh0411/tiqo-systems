<template>
  <button
    ref="buttonRef"
    :class="props.class"

    @mouseenter="onHover"
    @mouseleave="onLeave"
    @click="onClick"
  >
    <slot>Default value</slot>
  </button>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { gsap } from 'gsap';

  const props = defineProps<{
    class?: string;
    disabled?: boolean
  }>();

  const buttonRef = ref<HTMLElement | null>(null);

  const tl = gsap.timeline({
    defaults: {
      duration: 0.1,
      ease: 'power4.out'
    }
  });

  const onHover = () => {
    console.log({ buttonRef });
    if (buttonRef.value && !props.disabled) {
      tl.to(buttonRef.value, {
        scale: 1.02,
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
    
  }
</script>
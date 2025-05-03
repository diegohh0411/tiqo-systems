<template>
  <button
    ref="buttonRef"
    :class="props.class"

    @mouseenter="onHover"
    @mouseleave="onLeave"
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

  const onHover = () => {
    console.log({ buttonRef });
    if (buttonRef.value && !props.disabled) {
      gsap.to(buttonRef.value, {
        scale: 1.02,
        duration: 0.2,
        ease: 'power1.out',
      });
    }
  }

  const onLeave = () => {
    if (buttonRef.value) {
      gsap.to(buttonRef.value, {
        scale: 1,
        duration: 0.2,
        ease: 'power1.out',
      });
    }
  }
</script>
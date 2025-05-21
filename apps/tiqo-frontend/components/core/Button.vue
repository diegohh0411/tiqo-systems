<template>
  <UButton
    ref="button"
    v-bind="props"
    class="relative overflow-hidden cursor-pointer px-6"

    @mouseover="(e: Event) => onHover(e.target)"
    @mouseleave="(e: Event) => onLeave(e.target)"
  >
    
    <slot />

    <div id="hover-background" class="bg-black absolute inset-y-0 left-0 -z-10" />
  </UButton>

  
</template>

<script setup lang="ts">
  import { gsap } from 'gsap';

  const props = defineProps<{
    animate?: boolean;
  }>();

  const onHover = (eventTarget: EventTarget | null) => {
    const hoverBackground = (eventTarget as Element)?.querySelector('#hover-background') as HTMLElement;

    gsap.fromTo(
      hoverBackground,
      {
        width: '0%',
        borderRadius: '9999px',
        scale: 2,
        ease: 'power2.out',
      },
      {
        width: '100%',
        y: 0,
        borderRadius: '0px',
        scale: 1,
      }
    );

    gsap.to(
      eventTarget,
      {
        scale: 1.05,
        rotate: -0.5,
        ease: 'power2.out',
      }
    )
  }

  const onLeave = (eventTarget: EventTarget | null) => {
    const hoverBackground = (eventTarget as Element)?.querySelector('#hover-background') as HTMLElement;

    gsap.fromTo(
      hoverBackground,
      {
        width: '100%',
        y: 0,
        borderRadius: '0px',
        scale: 1,
        ease: 'power2.out',
      },
      {
        width: '0%',
        borderRadius: '9999px',
        scale: 2,
      }
    );

    gsap.to(
      eventTarget,
      {
        scale: 1,
        rotate: 0,
        ease: 'power2.out',
      }
    )
  }
</script>
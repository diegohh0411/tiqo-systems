<template>
  <div
    ref="smoothWrapper"
  >
    <div
      ref="smoothContent"
      :class="`
        flex flex-col gap-6 items-between
      `"
    >
      <LandingNavigation />

      <div
        :class="`
          flex flex-col gap-3
          page-padding-x
          page-width
          flex-grow
        `"
      >
        <slot />
      </div>

      <CoreFooter class="flex-end" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { gsap, ScrollSmoother, ScrollTrigger } from 'gsap/all';

  const smoothWrapper = ref<HTMLElement | null>(null);
  const smoothContent = ref<HTMLElement | null>(null);
  
  onMounted(() => {
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

    nextTick(() => {
      ScrollSmoother.create({
        wrapper: smoothWrapper.value,
        content: smoothContent.value,

        smooth: 1,
        ignoreMobileResize: true,
        normalizeScroll: true,

        effects: true,
      });

      ScrollTrigger.refresh();
    })
  })
</script>
<template>
  <div
    ref="smoothWrapper"
  >
    <LandingNavigation />

    <div
      ref="smoothContent"
      :class="`
        flex flex-col gap-6 items-between
      `"
    >
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
  /**
  const { ScrollSmoother, ScrollTrigger } = useGsap();

  
  const smoothWrapper = ref<HTMLElement | null>(null);
  const smoothContent = ref<HTMLElement | null>(null);
  
  onMounted(() => {
    nextTick(() => {
      ScrollSmoother.create({
        wrapper: smoothWrapper.value,
        content: smoothContent.value,

        smooth: 1,

        effects: true,

        normalizeScroll: true,
        ignoreMobileResize: true,
      });

      ScrollTrigger.refresh();
    })
  })
  */
</script>
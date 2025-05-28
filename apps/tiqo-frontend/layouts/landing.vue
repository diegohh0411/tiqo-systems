<template>
  <div
  :class="`
    flex flex-col gap-6 items-between
    min-h-screen h-full w-full
  `">
    <LandingNavigation />

    <div
    :class="`
      flex flex-col gap-3
      page-padding-x
      page-width
      flex-grow
    `">
      <slot />
    </div>

    <CoreFooter class="flex-end" />
  </div>
</template>

<script>
  import { gsap } from 'gsap';
  import { ScrollSmoother } from "gsap/ScrollSmoother";
  
  onMounted(() => {
    gsap.registerPlugin(ScrollSmoother);

    ScrollSmoother.create({
      smooth: 1,
      effects: true,
    });
  })
</script>
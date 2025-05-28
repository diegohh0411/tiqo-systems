<template>
  <div
  ref="sectionRef"
  :class="`
    rounded-3xl
    h-[80svh]
    bg-neutral-50 dark:bg-neutral-900
    grid grid-cols-2 gap-6
    p-12
    overflow-hidden
  `">
    <div class="flex flex-col gap-6 justify-center">
      <h2 ref="titleRef" >{{ props.title }}</h2>

      <slot />
    </div>

    <div ref="rightSideRef">
      <NuxtImg :src="props.image" class="w-full h-full object-cover rounded-3xl" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { gsap, ScrollTrigger, SplitText } from 'gsap/all'

  const props = defineProps<{
    title: string;
    image: string;
  }>()

  const sectionRef = ref<HTMLElement | null>(null)
  const titleRef = ref<HTMLElement | null>(null)
  const rightSideRef = ref<HTMLElement | null>(null)

  const commonConfig = {
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top top',
      end: '+=500',
      scrub: true,
      pin: true
    }
  }

  onMounted(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText)

    gsap.from(
      rightSideRef.value,
      {
        scale: 0.5,
        y: -500,
        ease: 'power4.inOut',
        ...commonConfig
      }
    )

    SplitText.create(
      titleRef.value,
      {
        type: "words",
        onSplit(self) {
          gsap.from(
            self.words,
            {
              opacity: 0,
              x: '100%',
              stagger: 0.5,
              ...commonConfig
            }
          )
        }
      }
    )
  })
</script>
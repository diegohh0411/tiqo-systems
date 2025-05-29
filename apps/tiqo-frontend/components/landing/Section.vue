<template>
  <div
  ref="sectionRef"
  :class="`
    rounded-3xl
    bg-neutral-50 dark:bg-neutral-900
    grid lg:grid-cols-2 gap-6
    p-6 lg:p-12
    overflow-hidden
  `">
    <div class="lg:p-0 flex flex-col gap-6 justify-center">
      <h1 ref="titleRef">{{ props.title }}</h1>

      <slot />
    </div>

    <div ref="rightSideRef" class="row-start-1 lg:row-start-auto">
      <NuxtImg :src="props.image" class="w-full h-[50svh] lg:h-[70svh] object-cover rounded-3xl" />
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

  onMounted(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText)

    nextTick(() => {
      const commonGsapConfig = {
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top center',
          end: 'center center',
          scrub: true,
        }
      }

      gsap.from(
        rightSideRef.value,
        {
          scale: 0.5,
          y: "-100%",
          ease: 'power4.inOut',
          ...commonGsapConfig
        }
      )

      SplitText.create(
        titleRef.value,
        {
          type: "words, chars",
          onSplit(self) {
            const tl = gsap.timeline({
              ...commonGsapConfig
            })

            self.words.forEach((char, i) => {
              tl.from(
                char,
                {
                  opacity: 0,
                  x: 100,
                  ease: 'power2.out',
                }, i * 0.1
              )
            })

            
          }
        }
      )
    })
  })

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach(trigger => {
      trigger.kill()
    })
  })
</script>
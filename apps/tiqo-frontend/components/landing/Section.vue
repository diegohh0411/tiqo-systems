<template>
  <div
  ref="sectionRef"
  :class="`
    rounded-3xl
    bg-neutral-50 dark:bg-neutral-800
    grid lg:grid-cols-2 gap-6
    p-6 lg:p-12
    overflow-hidden
  `">
    <div ref="leftSideRef" class="lg:p-0 flex flex-col gap-6 justify-center">
      <h1 ref="titleRef">{{ props.title }}</h1>

      <slot />
    </div>

    <div ref="rightSideRef" class="row-start-1 lg:row-start-auto z-10">
      <NuxtImg :src="props.image" class="w-full h-[50svh] lg:h-[70svh] object-cover rounded-3xl" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    title: string;
    image: string;
  }>()

  const { gsap, SplitText } = useGsap()
  let ctx: gsap.Context;

  const sectionRef = ref<HTMLElement | null>(null)
  const titleRef = ref<HTMLElement | null>(null)
  const leftSideRef = ref<HTMLElement | null>(null)
  const rightSideRef = ref<HTMLElement | null>(null)

  const { ready } = useWaitForRefs(
    sectionRef,
    titleRef,
    leftSideRef,
    rightSideRef
  )

  const animate = () => {
    ctx = gsap.context(() => {
      const commonGsapConfig = {
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 40%',
          end: 'center center',
          scrub: true,
        }
      }

      gsap.from(
        leftSideRef.value?.querySelectorAll('p') || [],
        {
          opacity: 0,
          y: 100,
          ease: 'power1.out',
          stagger: 0.2,
          ...commonGsapConfig
        }
      )

      SplitText.create(
        titleRef.value,
        {
          type: "words, chars",
          onSplit(self) {
            gsap.from(
              self.chars,
              {
                opacity: 0,
                // x: 100,
                y: '2rem',
                ease: 'power1.out',
                stagger: 0.05,
                ...commonGsapConfig
              }
            )
          }
        }
      )
    })
  }

  watchEffect(() => {
    if (ready.value) {
      animate()
    }
  })

  onUnmounted(() => {
    ctx.revert()
  })
</script>
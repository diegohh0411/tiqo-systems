<template>
  <div 
    ref="card"
    class="relative p-6 rounded-3xl overflow-hidden h-[70svh] flex flex-col justify-between gap-4 text-white"
  >
    <NuxtImg 
    ref="imageComponent"
    :src="props.image" 
    class="absolute inset-0 w-full h-full object-cover -z-20" 
    
    />

    <div ref="background" class="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 opacity-0 -z-10"/>

    <h2 ref="titleElement">{{ props.title }}</h2>

    <p>{{ texts[0] }}</p>
  </div>
</template>

<script setup lang="ts">
  import { gsap, ScrollTrigger } from 'gsap/all';
  

  const props = defineProps<{
    title: string;
    image: string;
    texts: string[];
  }>();

  const card = ref<HTMLElement | null>(null);
  const titleElement = ref<HTMLElement | null>(null);

  const imageComponent = ref();
  const background = ref<HTMLElement | null>(null);

  onMounted(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(
      background.value,
      {
        scrollTrigger: {
          trigger: card.value,
          start: 'center center',
          end: '+=200',
          scrub: true,
          pin: true,
        },
        opacity: 1
      }
    )
  })

</script>
  
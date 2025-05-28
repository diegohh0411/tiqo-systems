<template>
  <div class="grid md:grid-cols-2 gap-12 h-[80svh]">
    <div class="flex flex-col gap-6 justify-center">
      <h1 class="hero-title inline-block">{{ props.title }}</h1>
      <h3>{{ props.subtitle }}</h3>
      <UButton
        :to="props.cta.to"
        class="w-fit"
        size="xl"
      >
        {{ props.cta.text }}
      </UButton>
    </div>

    <div>
      <NuxtImg :src="props.image" class="w-full h-full object-cover rounded-3xl" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { gsap, ScrollTrigger, SplitText } from 'gsap/all';

  const props = defineProps<{
    title: string;
    subtitle: string;
    cta: {
      to: string;
      text: string;
    },
    // The source of the image to display in the hero section.
    image: string;
  }>();
  
  onMounted(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    SplitText.create(".hero-title", {
      type: "words",
      autoSplit: true,
      onSplit: (self) => {
        return gsap.from(self.words, {
          y: -100,
          opacity: 0,
          rotation: "random(-80, 80)",
          ease: "back",
          stagger: 0.15
        });
      }
    });
  });
</script>

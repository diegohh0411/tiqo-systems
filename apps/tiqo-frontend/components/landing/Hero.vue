<template>
  <div class="grid md:grid-cols-2 gap-12 h-[80vh] overflow-hidden">
    <div class="flex flex-col gap-6 justify-center">
      <h1 ref="heroTitleRef" class="inline-block">{{ props.title }}</h1>
      <h3>{{ props.subtitle }}</h3>
      <UButton
        :to="props.cta.to"
        class="w-fit"
        size="xl"
        :icon="props.cta.icon"
      >
        {{ props.cta.text }}
      </UButton>

      <UButton 
        v-if="props.sub"
        :to="props.sub.to"
        class="w-fit"
        size="xl"
        :icon="props.sub.icon"
        
        color="neutral"
        variant="outline"
      >
        {{ props.sub.text }}
      </UButton>
    </div>

    <NuxtImg :src="props.image" class="w-full h-full object-cover rounded-3xl" />      
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    title: string;
    subtitle: string;
    cta: {
      to: string;
      text: string;
      icon?: string;
    },
    sub?: {
      to: string;
      text: string;
      icon?: string;
    },
    // The source of the image to display in the hero section.
    image: string;
  }>();

  const { gsap, SplitText } = useGsap();

  const heroTitleRef = ref<HTMLElement | null>(null);

  const { refsAreReady } = waitForRefs(heroTitleRef);

  watchEffect(() => {
    if (refsAreReady.value) {
      SplitText.create(
        heroTitleRef.value, 
        {
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
        }
      );
    }
  })
</script>

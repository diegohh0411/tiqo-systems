<template>
  <div class="grid lg:grid-cols-2 gap-6 lg:gap-12 h-[80svh]">
    <div class="flex flex-col gap-6 justify-center">
      <h1>Cobra en segundos con Tiqo</h1>
      <h3>El celular de tu comensal es tu nueva terminal</h3>

      <UButton
        to="/demo"
        trailing-icon="lucide-rocket"
        class="rounded-full w-fit p-4"
        size="xl"
      >
        Ver demo
      </UButton>

      <UButton to="/interesado" variant="outline" trailing-icon="lucide-arrow-right" class="rounded-full w-fit p-4" size="xl">
        Estoy interesado
      </UButton>
    </div>

    <div class="overflow-hidden">
      <NuxtImg src="/images/TacoNightWithFriends.png" class="w-full h-full object-cover rounded-3xl" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { gsap } from 'gsap';
  import { SplitText } from 'gsap/SplitText';

  gsap.registerPlugin(SplitText);

  if (import.meta.client) {
    const splitText = new SplitText('h1', {
      type: 'words',
      wordsClass: 'word++',
    });

    gsap.from(
      splitText.words,
      {
        y: '-2rem',
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
      },
    )
  }
</script>

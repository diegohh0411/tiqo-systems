<template>
  <div class="py-3 w-full">
    <div class="page-padding-x page-width flex gap-3 justify-between py-3">
      <div class="flex">
        <UButton variant="link" size="xl" to="/" class="w-fit px-0 mr-6">
          <h3>Tiqo</h3>
        </UButton>

        <UNavigationMenu :items="items" class="w-full justify-center" />
      </div>

        <UButton
          id="ctaButton"
          class="z-50"
          to="/demo"
          size="xl"
          @mouseover="(e: Event) => animateOnHover(e.currentTarget)"
          @mouseleave="(e: Event) => animateOnLeave(e.currentTarget)"
        >
          Ver demo
        </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { gsap, ScrollTrigger } from 'gsap/all'
  import type { NavigationMenuItem } from '@nuxt/ui'
  gsap.registerPlugin(ScrollTrigger)

  const items = ref<NavigationMenuItem[]>([
    {
      label: '¿Por qué Tiqo?',
      icon: 'lucide-message-circle-question',
    },
    {
      label: '¿Cómo funciona?',
      icon: 'lucide-zap',
    },
    {
      label: 'Beneficios',
      icon: 'lucide-trending-up',
    },
    {
      label: 'Precios',
      icon: 'lucide-dollar-sign'
    },
    {
      label: 'Próximamente',
      icon: 'lucide-calendar',
    },
    {
      label: 'FAQ',
      icon: 'lucide-help-circle',
      children: [
        {
          label: 'Preguntas frecuentes',
          description: '¿Tienes dudas? Aquí están las respuestas.',
        }
      ]
    }
  ])


  onMounted(() => {
    ScrollTrigger.create({
      trigger: "#ctaButton",
      start: "center center",
      end: window.innerHeight,
      scrub: true,
      onUpdate: () => {
        gsap.to("#ctaButton", { 
          translateY: window.scrollY 
        });
      }
    });
  });

</script>
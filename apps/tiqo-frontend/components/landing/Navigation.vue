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
      label: '¿Cómo funciona?',
      icon: 'lucide-zap',
      children: [
        {
          label: 'Beneficios hoy',
          icon: 'lucide-trending-up',
          description: 'Descubre cómo Tiqo mejora tu negocio',
        },
        {
          label: 'Próximamente',
          icon: 'lucide-calendar-plus',
          description: 'Próximas funcionalidades que estamos desarrollando',
        }
      ]
    },
    {
      label: '¿Por qué Tiqo?',
      icon: 'lucide-message-circle-question',
      children: [
        {
          label: '¿Quienes somos?',
          icon: 'lucide-smile',
          description: 'Descubre nuestros rostros y nuestra motivación'
        },
        {
          label: '¿Por qué elegir Tiqo?',
          description: 'Conoce las ventajas de trabajar con nosotros'
        }
      ]
    },
    {
      label: 'Precios', 
      icon: 'lucide-dollar-sign',
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
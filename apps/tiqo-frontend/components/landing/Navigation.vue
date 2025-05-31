<template>
  <div class="py-3 w-full sticky top-0 z-50">
    <div class="page-padding-x page-width flex gap-3 items-center justify-between py-3">
      <div
        ref="leftSideRef" 
        class="flex gap-6 items-center px-3 bg-white/20 dark:bg-black/20 rounded-3xl backdrop-blur backdrop-brightness-110"
      >
        <UButton variant="link" size="xl" to="/" class="w-fit px-0">
          <h3>Tiqo</h3>
        </UButton>
        
        <UNavigationMenu :items="items" class="w-full justify-center hidden lg:block" />
      </div>

      <UButton
        to="/demo"
        size="xl"
        icon="lucide-zap"
        class="hidden lg:block"
        @mouseover="(e: Event) => animateOnHover(e.currentTarget)"
        @mouseleave="(e: Event) => animateOnLeave(e.currentTarget)"
      >
        Ver demo
      </UButton>

      <NavigationDrawer :items="items" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { NavigationMenuItem } from '@nuxt/ui'
  
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
      to: '/pricing',
    }
  ])
</script>
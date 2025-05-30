<template>
  <div 
  :class="`
    py-3 w-full
  `">
    <div
    :class="`
      flex gap-6 items-center
      page-padding-x page-width
    `">
      <NuxtLink to="/" class="text-2xl font-bold">Tiqo</NuxtLink>

      <UNavigationMenu :items="items" class="justify-center hidden lg:block" />
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
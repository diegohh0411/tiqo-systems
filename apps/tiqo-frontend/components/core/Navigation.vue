<template>
  <div 
  :class="`
    py-3 border-b w-full
  `">
    <div
    :class="`
      flex items-center justify-between
      page-padding-x page-width
    `">
      <NuxtLink to="/" class="text-2xl font-bold">Tiqo</NuxtLink>

      <UDropdownMenu :items="navItems">
        <UButton icon="lucide-menu" color="neutral" variant="outline" class="cursor-pointer" size="xl" />
      </UDropdownMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { DropdownMenuItem } from '#ui/types';

  const navItems = ref<DropdownMenuItem[][]>(
    [
      [
        {
          label: `¡Hola!`,
          type: 'label'
        },
        {
          label: 'Principal',
          icon: 'lucide-home',
          to: '/',
        }
      ],
      [
        {
          label: 'Login',
          icon: 'lucide-user',
          to: '/login',
        },
        {
          label: 'Sign up',
          icon: 'lucide-plus',
          to: '/signup',
        },
      ]
    ]
  );
</script>
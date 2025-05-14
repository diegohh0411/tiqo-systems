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

      <UDropdownMenu :items="navItems" :ui="{ content: 'min-w-64'}" :content="{ align: 'end' }">
        <UButton icon="lucide-menu" color="neutral" variant="outline" class="cursor-pointer" size="xl" />
      </UDropdownMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { DropdownMenuItem } from '#ui/types';

  const navItems = computed<DropdownMenuItem[][]>(() => {
    return [
      [
        {
          label: '¡Hola!',
          type: "label"
        },
        ...(isLoggedIn.value ? [
          {
            label: currentUser.value.identifier,
            to: '/dashboard',
            icon: 'lucide-user',
          }
        ] : [])
      ],
      [
        {
          label: 'Principal',
          icon: 'lucide-home',
          to: '/',
        },
        ...(isLoggedIn.value ?  [
          {
            label: "Cerrar sesión",
            icon: 'lucide-log-out',
            to: '/logout'
          }
        ] : [
          {
          label: 'Login',
          icon: 'lucide-user',
          to: '/login',
          },
          {
            label: 'Sign up',
            icon: 'lucide-plus',
            to: '/signup',
          }
        ]),
      ]
    ];
  });
</script>
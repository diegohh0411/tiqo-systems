<template>
  <div 
  :class="`
    flex items-center justify-between
    px-4 py-3 rounded border
    bg-neutral-100 dark:bg-neutral-800
    mb-6
  `">
    <NuxtLink to="/" class="text-2xl font-bold">Tiqo</NuxtLink>

    <div class="flex items-center gap-4">
      <NuxtLink to="/login" class="flex items-center gap-1"><Icon name="lucide:user" />  Inicia sesión</NuxtLink>
    </div>
  </div>
</template>
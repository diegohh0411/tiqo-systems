<template>
  <div 
  :class="`
    py-3 border-b w-full
  `">
    <div
    :class="`
      flex items-center justify-between
      w-full max-w-5xl mx-auto
      page-padding-x
    `">
      <NuxtLink to="/" class="text-2xl font-bold">Tiqo</NuxtLink>

      <div class="flex items-center gap-4">
        <NuxtLink to="/login" class="flex items-center gap-1"><Icon name="lucide:user" />  Inicia sesión</NuxtLink>
      </div>
    </div>
  </div>
</template>
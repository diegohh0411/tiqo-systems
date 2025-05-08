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

      <div class="flex items-center gap-4">
        <ULink to="/login" class="text-sm">Iniciar sesión</ULink>
        <ULink to="/signup" class="text-sm">Registrarse</ULink>
      </div>
  </div>
</div></template>
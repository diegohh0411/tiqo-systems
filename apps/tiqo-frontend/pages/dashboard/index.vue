<script lang="ts">
export const description = 'A login page with form and image.'
</script>

<script setup lang="ts">
  definePageMeta({
    middleware: ['authenticated']
  })
</script>

<template>
  <div class="flex flex-col gap-1">
    <h3>Bienvenido</h3>

    <div class="flex items-center gap-1">
      <UIcon name="lucide-circle-user" class="text-xl" />
      <p>{{ currentUser.identifier }}</p>
    </div>
  </div>
</template>

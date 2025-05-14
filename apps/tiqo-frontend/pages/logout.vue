<template>
  <UIcon v-if="isLoggingOut" name="lucide-loader" class="text-xl text-center mx-auto animate-spin" />
  <div v-else class="flex flex-col items-center gap-3">
    <UIcon name="lucide-check" class="text-xl text-center mx-auto text-green-600 dark:text-green-300" />
    <p>Has cerrado sesión.</p>
    <ULink to="/">Volver a la página principal</ULink>
  </div>
</template>

<script setup lang="ts">
  const isLoggingOut = ref(true);

  await doLogout();

  isLoggingOut.value = false;
</script>
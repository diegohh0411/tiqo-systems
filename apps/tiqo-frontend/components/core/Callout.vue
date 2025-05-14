<template>
  <div 
  class="p-2 border rounded" 
  :class="{
    'bg-red-50 !border-red-300': props.type === 'error'
  }" >
    <slot />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    type: 'info' | 'warning' | 'error' | 'success';
    class?: string;
  }>();

  </script>
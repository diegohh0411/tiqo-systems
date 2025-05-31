<template>
  <USlideover title="Menú" class="lg:hidden">
    <div ref="menuIconRef" class="cursor-pointer p-3 pb-2 bg-white/20 dark:bg-black/20 rounded-full backdrop-blur backdrop-brightness-110">
      <UIcon name="lucide-menu" class="" />
    </div>

    <template #body>
      <div v-for="item in props.items" :key="item.label" class="p-4">
        <UNavigationMenu :items="[item]" class="w-full" orientation="vertical" />
      </div>
    </template>
  </USlideover>
</template>

<script lang="ts" setup>
  import type { NavigationMenuItem } from '@nuxt/ui'

  const props = defineProps<{
    items: NavigationMenuItem[];
  }>();
</script>
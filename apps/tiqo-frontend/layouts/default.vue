<template>
  <div
  :class="`
    flex flex-col gap-3 p-6
    h-screen w-screen 
    bg-neutral-50 dark:bg-neutral-900
    text-neutral-900 dark:text-neutral-50
  `">
    <slot />
  </div>
</template>
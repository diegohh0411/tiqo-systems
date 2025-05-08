<template>
  <div 
  data-layout-body
  :class="`
    min-h-screen h-full w-screen 
    bg-white dark:bg-neutral-900
    text-neutral-900 dark:text-neutral-50
  `">

    <div
    :class="`
      flex flex-col gap-3 p-6
      w-full max-w-5xl mx-auto
    `">
      <CoreNavigation />

      <slot />
    </div>
  </div>
</template>
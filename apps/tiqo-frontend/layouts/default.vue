<template>
  <div
  :class="`
    flex flex-col gap-6 items-center
    min-h-screen h-full w-screen 
    bg-white dark:bg-neutral-900
    text-neutral-900 dark:text-neutral-50
  `">

    <CoreNavigation />

    <div
    :class="`
      flex flex-col gap-3
      page-padding-x
      w-full max-w-5xl
    `">
      <slot />
    </div>
  </div>
</template>
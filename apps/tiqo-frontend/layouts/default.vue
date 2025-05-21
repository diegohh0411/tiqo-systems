<template>
  <div
  :class="`
    flex flex-col gap-6 items-center justify-between
    min-h-screen h-full w-screen
  `">

    <CoreNavigation />

    <div
    :class="`
      flex flex-col gap-3
      page-padding-x
      page-width
    `">
      <slot />
    </div>

    <CoreFooter class="flex-end" />
  </div>
</template>
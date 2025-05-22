<template>
  <div
  :class="`
    flex flex-col gap-6 items-center
    min-h-screen h-full w-screen
  `">

    <CoreNavigation />

    <div
    :class="`
      flex flex-col gap-3
      page-padding-x
      page-width
      flex-grow
    `">
      <slot />
    </div>

    <CoreFooter class="flex-end" />
  </div>
</template>
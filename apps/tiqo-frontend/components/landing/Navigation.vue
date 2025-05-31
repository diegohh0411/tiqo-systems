<template>
  <div class="py-3 w-full sticky top-0 z-50">
    <div class="page-padding-x page-width flex gap-3 items-center justify-between py-3">
      <div
        ref="leftSideRef" 
        class="flex gap-6 items-center px-3 bg-white/20 dark:bg-black/20 rounded-3xl backdrop-blur backdrop-brightness-110"
      >
        <UButton variant="link" size="xl" to="/" class="w-fit px-0">
          <h3>Tiqo</h3>
        </UButton>
        
        <UNavigationMenu :items="items" class="w-full justify-center hidden lg:block" />
      </div>

      <UButton
        to="/demo"
        size="xl"
        icon="lucide-joystick"
        class="hidden lg:block"
        @mouseover="(e: Event) => animateOnHover(e.currentTarget)"
        @mouseleave="(e: Event) => animateOnLeave(e.currentTarget)"
      >
        Ver demo
      </UButton>

      <NavigationDrawer :items="items" />
    </div>
  </div>
</template>

<script lang="ts" setup>  
  const items = useNavigationItems();
</script>
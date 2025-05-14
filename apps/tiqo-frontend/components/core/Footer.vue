<template>
  <div
    :class="`
      flex items-center justify-between
      py-6 border-t
      w-full
  `" >
      <div class="flex items-center justify-between page-width page-padding-x text-sm">
        <p>Copyright &copy; {{ new Date().getFullYear() }} Tiqo. Todos los derechos reservados.</p>
      </div>
  </div>
</template>
<template>
  <div
    :class="`
      flex items-center justify-between
      py-3 border-t
      w-full
  `" >
      <div class="flex items-center justify-between page-width page-padding-x">
        <p>Copyright &copy; {{ new Date().getFullYear() }} Tiqo. Todos los derechos reservados.</p>
      </div>
  </div>
</template>
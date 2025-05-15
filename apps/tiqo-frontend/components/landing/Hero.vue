<template>
  <div class="grid lg:grid-cols-2 gap-6 lg:gap-12 h-[80svh]">
    <div class="flex flex-col gap-6 justify-center">
      <h1 clas="font-mono">Soluciones de pago diseñados para los mejores restaurantes del mundo</h1>
      <h3>Cobra desde el celular de tu comensal</h3>

      <UButton to="/interesado" trailing-icon="lucide-arrow-right" class="rounded-full w-fit p-4 !text-neutral-50" size="xl">
        Quiero saber más
      </UButton>
    </div>

    <div class="overflow-hidden">
      <NuxtImg src="/images/TacoNightWithFriends.png" class="w-full h-full object-cover rounded-3xl" />
    </div>
  </div>
</template>

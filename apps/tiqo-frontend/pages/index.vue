<template>
  <div class="flex flex-col gap-12">
    <LandingHero
      title="¿Cobrar? Es fácil y divertido"
      subtitle="Con Tiqo, tus clientes pagan desde su celular en segundos. Tú vendes más con menos esfuerzo."
      :cta="{
        to: '/demo',
        text: 'Ver demo'
      }"
      image="/images/TacoNightWithFriends.png"
    />

    <LandingSection title="Rotación más rápida de mesas" image="/images/dan-gold-E6HjQaB7UEA-unsplash.jpg" />
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'landing'
  })
</script>

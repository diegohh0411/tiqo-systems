<template>
  <div class="flex flex-col gap-12">
    <LandingHero
      title="¿Cobrar? Es fácil y divertido"
      subtitle="Con Tiqo, tus clientes pagan desde su celular en segundos. Tú vendes más con menos esfuerzo."
      :cta="{
        to: '/demo',
        text: 'Ver demo',
        icon: 'lucide-joystick'
      }"
      :sub="{
        to: '/interesado',
        text: 'Estoy interesado',
        icon: 'lucide-send'
      }"
      image="/images/TacoNightWithFriends.png"
    />

    <LandingHowItWorks id="como-funciona" />

    <h1 id="beneficios">Beneficios</h1>

    <LandingSection title="Rotación más rápida de mesas" image="/images/dan-gold-E6HjQaB7UEA-unsplash.jpg">
      <p>Tus clientes piden y pagan sin esperar al mesero.</p>
      <p>+15% en rotación de mesas significa más ventas por día.</p>
    </LandingSection>

    <LandingSection title="Más propinas, mejor servicio" image="/images/abiwin-krisna-qYrOqGunsQA-unsplash.jpg">
      <p>Los clientes pueden dejar propina fácilmente desde su celular.</p>
      <p>Tu equipo gana más y está más motivado.</p>
    </LandingSection>

    <LandingSection title="Ahorro de tiempo operativo" image="/images/jessie-mccall-guXX_Wm-wnY-unsplash.jpg">
      <p>Ahorra tiempo en toma de pedidos y cobros.</p>
      <p>El staff se enfoca en lo que importa: dar mejor servicio.</p>
    </LandingSection>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'landing'
  })

  const { gsap } = useGsap()

  const route = useRoute()

  onMounted(() => {
    watchEffect(() => {
      if (route.hash) {
        gsap.to(
          window,
          {
            scrollTo: {
              y: route.hash || 0,
              offsetY: 100,
            },
          }
        )
      }
    })
  })
</script>

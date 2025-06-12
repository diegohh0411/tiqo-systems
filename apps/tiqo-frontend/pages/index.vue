<template>
  <div class="flex flex-col gap-12">
    <!-- Hero Section -->
    <LandingHero
      title="Paga desde tu celular en segundos"
      subtitle="Con Tiqo, tus clientes pagan desde su celular en segundos. Tú vendes más con menos esfuerzo."
      :cta="{
        to: '/demo',
        text: 'Solicitar demo',
        icon: 'lucide-joystick'
      }"
      :sub="{
        to: '/interesado',
        text: 'Contáctanos',
        icon: 'lucide-send'
      }"
      image="/images/TacoNightWithFriends.png"
      class="animate-fade-in"
    />

    <h1 id="como-funciona" class="text-2xl font-bold text-center">¿Cómo funciona?</h1>

    <div class="flex flex-col md:flex-row gap-4 overflow-x-auto">
      <UCard variant="soft" class="w-full max-w-sm shrink-0">
          <div class="flex flex-col gap-8">
            <h3>1</h3>
            <p>Juan y sus amigos llegan a tu restaurante, escanean el código QR en su mesa y leen el menú.</p>
            <UIcon name="lucide-qr-code" class="!size-8 mt-auto" />
          </div>
      </UCard>
      <UCard variant="soft" class="w-full max-w-sm shrink-0">
          <div class="flex flex-col gap-8">
            <h3>2</h3>
            <p>Ordenan con el mesero, comen, pasan un buen rato y luego están listos para pagar.</p>
            <UIcon name="lucide-hand-platter" class="!size-8 mt-auto" />
          </div>
      </UCard>
      <UCard variant="soft" class="w-full max-w-sm shrink-0">
          <div class="flex flex-col gap-8">
            <h3>3</h3>
            <p>Ellos vuelven a escanear el código QR, cada uno elige lo que ordenó y paga su parte desde su celular.</p>
            <div class="flex items-center gap-2 mt-8">
              <UIcon name="logos-visa" />
              <UIcon name="logos-mastercard" />
              <UIcon name="logos-google-pay" />
              <UIcon name="logos-apple-pay" />
            </div>
          </div>
      </UCard>

      <UCard variant="soft" class="w-full max-w-sm shrink-0">
        <div class="flex flex-col gap-8">
          <h3 class="mb-8">4</h3>
          <p>El mesero recibe una notificación de que la orden fue pagada totalmente y cierra la cuenta.</p>
          <UIcon name="lucide-check-check" class="!size-8 mt-auto" />
        </div>
      </UCard>
    </div>

    <!-- Benefits Section -->
    <h1 id="beneficios" class="text-2xl font-bold text-center animate-slide-up">Beneficios</h1>
    
    <LandingSection title="Rotación más rápida de mesas" image="/images/dan-gold-E6HjQaB7UEA-unsplash.jpg" class="animate-parallax">
      <p>Aun con 20 clientes en la mesa, tú sigues cobrando en segundos.</p>
      <p>No vuelvas a quedarte sin mesas disponibles.</p>
    </LandingSection>

    <LandingSection title="Mantén contacto con tus clientes" image="/images/abiwin-krisna-qYrOqGunsQA-unsplash.jpg" class="animate-parallax">
      <p>Los clientes dejan su correo electrónico para obtener su recibo.</p>
      <p>Con su permiso, tú ya tienes cómo enviarles promociones y novedades.</p>
    </LandingSection>

    <LandingSection title="Ahorro de tiempo operativo" image="/images/jessie-mccall-guXX_Wm-wnY-unsplash.jpg" class="animate-parallax">
      <p>No vuelvas a perder tiempo cobrando mesas con una sola terminal.</p>
      <p>Tu staff se enfoca en lo que importa: dar mejor servicio.</p>
    </LandingSection>
    
    <!-- Call-to-Action Section -->
    <LandingInterestedCta />
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
            ease: 'power2.out',
            duration: 1,
          }
        )
      }
    })
  })
</script>

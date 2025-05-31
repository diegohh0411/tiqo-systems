<template>
  <div ref="containerRef" class="flex flex-col justify-center gap-3">
    <h1>¿Cómo funciona?</h1>

    <div class="flex gap-3 rounded-3xl overflow-hidden">
      <div
      v-for="(step, index) in steps"
      :key="index"
      :class="`
        panel
        flex flex-col gap-6
        h-96 w-full shrink-0 rounded-3xl surface p-6 overflow-hidden
      `"
      >
        <h1>Paso {{ index + 1 }}</h1>
        <h2>{{ step.text }}</h2>

        <div v-if="step.icons" class="flex items-center gap-3">
          <UIcon v-for="icon in step.icons" :key="icon" :name="icon" class="!size-12" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const steps = [
    { text: 'El cliente escanea un QR en la mesa', icons: ['lucide-qr-code'] },
    { text: 'Accede al menú digital y ordena con el mesero', icons: ['lucide-hand-platter'] },
    { text: 'Al terminar, el cliente paga desde su celular', icons: ['logos-mastercard', 'logos-visa', 'logos-google-pay', 'logos-apple-pay'] },
    { text: 'El mesero recibe una notificación y cierra la cuenta en el POS', icons: ['lucide-circle-check-big'] },
  ]

  const { gsap } = useGsap()

  const containerRef = ref<HTMLElement | null>(null)

  
  animateWhenRefsAreReady(
    [containerRef],
    () => {
      gsap.to(
        containerRef.value?.querySelectorAll('.panel') || [],
        {
          xPercent: - 100 * (steps.length - 1),
          scrollTrigger: {
            trigger: containerRef.value,
            start: 'center center',
            end: '+=2000',
            scrub: true,

            pin: true,
          }
        }
      )
    }
  )
  
</script>
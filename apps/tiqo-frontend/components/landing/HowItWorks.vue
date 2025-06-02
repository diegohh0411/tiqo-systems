<template>
  <div ref="containerRef" class="flex gap-12 items-center">
    <div 
    v-for="(step, index) in steps"
    :key="index"
    :ref="(el) => setPanelRef(el as HTMLElement, index)"
    :class="`
      grid grid-rows-3
      w-full max-w-xl
      h-full max-h-[80svh]
      surface
      rounded-3xl overflow-hidden
      shrink-0
    `"
    >
      <div class="flex flex-col gap-4 p-6">
        <h2>Paso {{ index + 1 }}</h2>
        <p class="text-xl">{{ step.text }}</p>

        <div v-if="step.icons" class="flex items-center gap-3">
          <UIcon v-for="icon in step.icons" :key="icon" :name="icon" class="!size-12" />
        </div>
      </div>

      <NuxtImg
        v-if="step.image" 
        :src="step.image"
        class="object-cover w-full h-full rounded-3xl row-span-2"
    />
  </div>
</div></template>

<script lang="ts" setup>
  const steps: Array<{ text: string; icons: string[]; image: string; }> = [
    { 
      text: 'El cliente escanea un QR en la mesa', 
      icons: ['lucide-qr-code'],
      image: '/images/albert-hu-RII9HuLDz4M-unsplash.jpg',
     },
    { 
      text: 'Accede al menú digital y ordena con el mesero', 
      icons: ['lucide-hand-platter'],
      image: '/images/jessie-mccall-guXX_Wm-wnY-unsplash.jpg',
    },
    { 
      text: 'Al terminar, el cliente paga desde su celular', 
      icons: ['lucide-credit-card'],
      image: '/images/pablo-merchan-montes-unsplash.jpg'
    },
    { 
      text: 'El mesero recibe una notificación y cierra la cuenta', 
      icons: ['lucide-circle-check-big'],
      image: '/images/abiwin-krisna-qYrOqGunsQA-unsplash.jpg'
    },
  ]

  const { gsap } = useGsap()

  const containerRef = ref<HTMLElement | null>(null)
  const panelRefs: Ref<HTMLElement | null>[] = []

  const setPanelRef = (el: HTMLElement | null, index: number) => {
    if (el) {
      panelRefs[index] = ref(el)
    } else {
      panelRefs[index] = ref(null)
    }
  }
  
  animateWhenRefsAreReady(
    [containerRef, ...panelRefs],
    () => {
      gsap.to(
        panelRefs.map(ref => ref.value),
        {
          scrollTrigger: {
            trigger: containerRef.value,
            start: 'center center',
            end: '+=2000',
            scrub: true,
            pin: true,
          },
          x: -(containerRef.value as HTMLElement).scrollWidth + (containerRef.value as HTMLElement).clientWidth,
          ease: 'none',
        }
      )
    }
  )
  
</script>
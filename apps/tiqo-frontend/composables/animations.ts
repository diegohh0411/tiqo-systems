export const useGsap = () => {
  const nuxtApp = useNuxtApp();

  return {
    gsap: nuxtApp.$gsap,
    ScrollTrigger: nuxtApp.$ScrollTrigger,
    SplitText: nuxtApp.$SplitText,
    ScrollSmoother: nuxtApp.$ScrollSmoother,
    Observer: nuxtApp.$Observer
  }
}

export const waitForRefs = (...refs: Array<Ref<HTMLElement | null>>) => {
  const refsAreReady = ref(false);

  onMounted(async () => {
    await nextTick();

    const checkReferences = () => refs.every(ref => ref.value !== null);

    while (!checkReferences()) {
      await nextTick();
    }

    refsAreReady.value = true;
  })

  return { refsAreReady };
}

export const animateWhenRefsAreReady = (refs: Array<Ref<HTMLElement | null>>, animationCallback: () => void): Ref<typeof gsap.context> => {
  const { refsAreReady } = waitForRefs(...refs);

  const { gsap } = useGsap();

  const context = ref<typeof gsap.context | null>(null);

  watchEffect(() => {
    if (refsAreReady.value) {
      context.value = gsap.context(() => animationCallback())
    }
  });

  onUnmounted(() => {
    console.debug(`Unmounting gsap context for current component.`);
    if (context.value) {
      context.value.revert();
      context.value = null;
    }
  })

  return context;
}

export const animateClick = (element: HTMLElement | EventTarget | null) => {
  if (!element) {
    return;
  }

  const { gsap } = useGsap();
  const tl = gsap.timeline({
    defaults: {
      duration: 0.1,
      ease: 'power4.out'
    }
  });

  tl.to(element, {
    scale: 0.98,
  })

  tl.to(element, {
    scale: 1,
  });
}

export const animateOnHover = (element: HTMLElement | EventTarget | null) => {
  if (!element) {
    return;
  }

  const { gsap } = useGsap();

  gsap.to(element, {
    rotate: 1,
    scale: 1.15,

    duration: 0.4,
    ease: 'power4.out'
  })
}

export const animateOnLeave = (element: HTMLElement | EventTarget | null) => {
  if (!element) {
    return;
  }

  const { gsap } = useGsap();

  gsap.to(element, {
    rotate: 0,
    scale: 1,

    duration: 0.4,
    ease: 'power4.out'
  })
}
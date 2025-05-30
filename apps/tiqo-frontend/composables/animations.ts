import { gsap } from "gsap";

const tl = gsap.timeline({
  defaults: {
    duration: 0.1,
    ease: 'power4.out'
  }
})

export const useWaitForRefs = (...refs: Array<Ref<HTMLElement | null>>) => {
  const ready = ref(false);

  onMounted(async () => {
    await nextTick();

    const check = () => refs.every(ref => ref.value !== null);

    while (!check()) {
      await nextTick();
    }

    ready.value = true;
  })

  return { ready };
}

export const animateClick = (element: HTMLElement | EventTarget | null) => {
  if (!element) {
    return;
  }

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

  gsap.to(element, {
    rotate: 0,
    scale: 1,

    duration: 0.4,
    ease: 'power4.out'
  })
}
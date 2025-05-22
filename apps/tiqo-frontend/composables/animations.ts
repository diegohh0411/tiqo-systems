import { gsap } from "gsap";

export const animateClick = (element: HTMLElement | EventTarget | null) => {
  if (!element) {
    return;
  }

  const tl = gsap.timeline({
    defaults: {
      duration: 0.1,
      ease: 'power4.out'
    }
  })

  tl.to(element, {
    scale: 0.98,
  })

  tl.to(element, {
    scale: 1,
  });
}
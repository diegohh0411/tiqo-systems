import { defineNuxtPlugin } from "#app";
import { gsap, ScrollTrigger, SplitText, ScrollSmoother } from "gsap/all";

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

  return {
    provide: {
      gsap,
      ScrollTrigger,
      SplitText,
      ScrollSmoother
    }
  }
})
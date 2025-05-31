import { defineNuxtPlugin } from "#app";
import { gsap, ScrollTrigger, SplitText, ScrollSmoother, Observer } from "gsap/all";

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother, Observer);

  return {
    provide: {
      gsap,
      ScrollTrigger,
      SplitText,
      ScrollSmoother,
      Observer
    }
  }
})
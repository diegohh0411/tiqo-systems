import { defineNuxtPlugin } from "#app";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother, Observer, ScrollToPlugin);

  ScrollTrigger.defaults({
    pinSpacing: 'margin',
    anticipatePin: 1,
  })

  return {
    provide: {
      gsap,
      ScrollTrigger,
      SplitText,
      ScrollSmoother,
      Observer,
      ScrollToPlugin
    }
  }
})
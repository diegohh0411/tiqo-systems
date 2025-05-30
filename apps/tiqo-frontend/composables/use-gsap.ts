export default () => {
  const nuxtApp = useNuxtApp();

  return {
    gsap: nuxtApp.$gsap,
    ScrollTrigger: nuxtApp.$ScrollTrigger,
    SplitText: nuxtApp.$SplitText,
    ScrollSmoother: nuxtApp.$ScrollSmoother
  }
}
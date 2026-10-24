import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function releaseScroll() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true))
  const lenis = window.__lenis
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo(0, 0)
}

export { gsap, ScrollTrigger }

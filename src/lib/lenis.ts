import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

let instance: Lenis | null = null;

export function initLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (instance) return instance;

  gsap.registerPlugin(ScrollTrigger);

  instance = new Lenis();

  // Keep ScrollTrigger's cached positions in sync with Lenis's virtual
  // scroll, and drive Lenis off GSAP's own ticker so the two stay on the
  // same animation frame — without this, ScrollTrigger-driven reveals can
  // get stuck at their initial (hidden) state.
  instance.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    instance?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return instance;
}

export function getLenis(): Lenis | null {
  return instance;
}

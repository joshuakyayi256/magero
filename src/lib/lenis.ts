import Lenis from "lenis";

let instance: Lenis | null = null;

export function initLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (instance) return instance;

  instance = new Lenis();
  function raf(time: number) {
    instance?.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  return instance;
}

export function getLenis(): Lenis | null {
  return instance;
}

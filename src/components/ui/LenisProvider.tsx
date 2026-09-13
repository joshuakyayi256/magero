"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { initLenis } from "@/lib/lenis";

export default function LenisProvider() {
  useEffect(() => {
    initLenis();

    // Section entrance animations below the fold cache their trigger
    // positions before the variable-weight Satoshi font finishes loading;
    // once it swaps in, the resulting reflow can leave later thresholds
    // uncrossable. Re-measure once fonts (and images) have settled.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);

    // Respect prefers-reduced-motion without rewriting every GSAP call
    // site-wide: cranking the global timeline speed collapses every tween's
    // travel time to a couple of frames while still rendering through each
    // one's real keyframes, so elements land in their correct final state
    // (opacity/position/etc.) almost immediately instead of sliding/parallaxing.
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotionPreference = () => {
      gsap.globalTimeline.timeScale(media.matches ? 60 : 1);
    };
    applyMotionPreference();
    media.addEventListener("change", applyMotionPreference);

    return () => {
      window.removeEventListener("load", refresh);
      media.removeEventListener("change", applyMotionPreference);
    };
  }, []);

  return null;
}

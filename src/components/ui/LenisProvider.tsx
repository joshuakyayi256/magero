"use client";
import { useEffect } from "react";
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
  }, []);

  return null;
}

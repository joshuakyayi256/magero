"use client";
import { useEffect } from "react";
import { initLenis } from "@/lib/lenis";

export default function LenisProvider() {
  useEffect(() => {
    initLenis();
  }, []);

  return null;
}

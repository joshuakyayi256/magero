"use client";
import { useEffect } from "react";
import { getLenis } from "@/lib/lenis";
import Hero from "@/components/sections/Hero";
import ExperienceBrief from "@/components/sections/ExperienceBrief";
import AboutManifesto from "@/components/sections/AboutManifesto";
import ProjectGrid from "@/components/sections/ProjectGrid";
import TechDNA from "@/components/sections/TechDNA";
import Services from "@/components/sections/Services";

export default function Home() {
  // Arriving from another page via a "/#section" link — scroll there once mounted.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.replace("#", "");
    const timeout = setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      getLenis()?.scrollTo(el, { offset: -80, duration: 1.2 });
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <main>
        {/* 01. Above the Fold: Identity */}
        <Hero />

        {/* 02. The Social/Expertise Bridge */}
        <ExperienceBrief />

        {/* 03. The Human Connection (About) */}
        <AboutManifesto />

        {/* 04. The Core Proof (Projects) */}
        <ProjectGrid />

        {/* 05. Technical Authority (Tech Stack) */}
        <TechDNA />

        {/* 06. Strategic Offerings (Services) */}
        <Services />
      </main>
    </div>
  );
}
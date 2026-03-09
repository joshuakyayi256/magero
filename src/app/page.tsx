"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import ExperienceBrief from "@/components/sections/ExperienceBrief";
import AboutManifesto from "@/components/sections/AboutManifesto";
import ProjectGrid from "@/components/sections/ProjectGrid";
import TechDNA from "@/components/sections/TechDNA";
import Services from "@/components/sections/Services";
import Footer from "@/components/sections/Footer";

export default function Home() {
  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Global Navigation */}
      <Navbar />

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

      {/* 07. The Kinetic Closer */}
      <Footer />
    </div>
  );
}
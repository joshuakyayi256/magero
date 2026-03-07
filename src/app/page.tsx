"use client";
import React from "react";
import Hero from "@/components/sections/Hero";
import ExperienceBrief from "@/components/sections/ExperienceBrief";
import AboutManifesto from "@/components/sections/AboutManifesto";
import TechDNA from "@/components/sections/TechDNA";
import ProjectGrid from "@/components/sections/ProjectGrid";
import Services from "@/components/sections/Services";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen selection:bg-white selection:text-black">
      {/* 01. Identity & First Impression */}
      <Hero />

      {/* 02. The Connective Tissue (Socials & Quick Meta) */}
      <ExperienceBrief />

      {/* 03. The Human Factor & Philosophy */}
      <AboutManifesto />

      {/* 04. Proof of Work (The 7 Selected Projects) */}
      <ProjectGrid />

      {/* 05. The Technical Rigor (Bento Grid Stack) */}
      <TechDNA />

      {/* 06. The Business Logic (Agency Services) */}
      <Services />

      {/* 07. Final Footer / CTA */}
      <Footer />
    </div>
  );
}
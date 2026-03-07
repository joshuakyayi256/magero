"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: "01", title: "Rentbetahouse", category: "Property & Fintech", span: "md:col-span-8" },
  { id: "02", title: "Munno Ddala SACCO", category: "System Architecture", span: "md:col-span-4" },
  { id: "03", title: "Green World Safaris", category: "Travel & Tourism", span: "md:col-span-4" },
  { id: "04", title: "Hanker Homes Ltd", category: "Real Estate Design", span: "md:col-span-4" },
  { id: "05", title: "Citie Photography", category: "Visual Storytelling", span: "md:col-span-4" },
  { id: "06", title: "Vivacity Aromatherapy", category: "E-Commerce", span: "md:col-span-6" },
  { id: "07", title: "Inspirational Youth", category: "Social Initiative", span: "md:col-span-6" },
];

export default function ProjectGrid() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP Reveal for the section title (Satoshi Font)
      gsap.from(".projects-title", {
        scrollTrigger: { trigger: ".projects-title", start: "top 80%" },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      // Inside your useEffect for ProjectGrid or Services
const lines = document.querySelectorAll(".reveal-text");
gsap.to(lines, {
  y: 0,
  duration: 1.2,
  stagger: 0.1,
  ease: "power4.out",
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top 75%",
  }
});

      // Staggered reveal for project cards
      gsap.from(".project-card", {
        scrollTrigger: { trigger: ".project-grid", start: "top 70%" },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0a0a0a] py-32 px-6 md:px-20 overflow-hidden">
      {/* "Wirkus" Inspired Header */}
      <div className="flex justify-between items-end mb-20 border-b border-white/10 pb-10">
        <h2 className="projects-title font-satoshi text-[12vw] md:text-[6vw] leading-none font-black uppercase tracking-tighter text-white">
          Projects<span className="text-white/20">.</span>
        </h2>
        <div className="hidden md:block font-sen text-white/40 text-right max-w-xs">
          (07 Selected Works) — Specialized in bridging high-end UX with complex back-end logic.
        </div>
      </div>

      {/* Asymmetrical Grid */}
      <div className="project-grid grid grid-cols-1 md:grid-cols-12 gap-4">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className={`project-card relative group aspect-square md:aspect-video overflow-hidden rounded-2xl bg-[#111] border border-white/5 ${project.span}`}
          >
            {/* Background Image Placeholder / Glassmorphism Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity" />
            
            {/* Content */}
            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
              {/* Find line 85 and replace it with this: */}
<span className="font-satoshi text-white/30 text-xs tracking-widest mb-2 uppercase">
  {project.id} — {project.category}
</span>
              <div className="flex items-center justify-between">
                <h3 className="font-satoshi text-2xl md:text-3xl font-bold text-white group-hover:translate-x-2 transition-transform duration-500">
                  {project.title}
                </h3>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Kinetic Infinite Scroll for the Name
    gsap.to(marquee, {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: "linear",
    });
  }, []);

  const footerLinks = {
    navigation: ["Works", "About", "Services", "Tech Stack"],
    socials: [
      { name: "LinkedIn", icon: <Linkedin size={14} />, href: "#" },
      { name: "GitHub", icon: <Github size={14} />, href: "#" },
      { name: "Twitter", icon: <Twitter size={14} />, href: "#" }
    ],
    projects: ["Rentbetahouse", "Munno Ddala", "Envirian", "Soma"]
  };

  return (
    <footer className="bg-[#0a0a0a] pt-32 pb-10 border-t border-white/5 overflow-hidden">
      {/* 01. The Kinetic Marquee (Inspired by thegr8binil) */}
      <div className="border-b border-white/5 pb-20 mb-20 whitespace-nowrap flex overflow-hidden">
        <div ref={marqueeRef} className="flex gap-10 pr-10">
          {[1, 2, 3, 4].map((i) => (
            <h2 key={i} className="font-satoshi text-[15vw] font-black uppercase tracking-tighter text-white/5 select-none">
              Magero Kyayi Joshua <span className="text-white/20">—</span>
            </h2>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          
          {/* Column 1: The CTA */}
          <div className="md:col-span-6">
            <h3 className="font-satoshi text-4xl md:text-6xl font-black text-white uppercase leading-none mb-8">
              Let's build <br /> <span className="text-white/20">the future.</span>
            </h3>
            <a 
              href="mailto:your-email@example.com"
              className="group inline-flex items-center gap-4 bg-white text-black px-8 py-5 rounded-full font-satoshi font-bold uppercase text-sm hover:scale-105 transition-transform duration-300"
            >
              Start a Conversation <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
            </a>
          </div>

          {/* Column 2: Navigation Grid */}
          <div className="md:col-span-2 space-y-6">
            <span className="font-satoshi text-[10px] uppercase tracking-[0.3em] text-white/30">Explore</span>
            <ul className="space-y-4">
              {footerLinks.navigation.map((link) => (
                <li key={link}>
                  <Link href={`#${link.toLowerCase().replace(" ", "")}`} className="font-sen text-sm text-white/60 hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Projects Grid */}
          <div className="md:col-span-2 space-y-6">
            <span className="font-satoshi text-[10px] uppercase tracking-[0.3em] text-white/30">Key Projects</span>
            <ul className="space-y-4">
              {footerLinks.projects.map((project) => (
                <li key={project} className="font-sen text-sm text-white/60">
                  {project}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Socials */}
          <div className="md:col-span-2 space-y-6">
            <span className="font-satoshi text-[10px] uppercase tracking-[0.3em] text-white/30">Connect</span>
            <ul className="space-y-4">
              {footerLinks.socials.map((social) => (
                <li key={social.name}>
                  <a href={social.href} className="flex items-center gap-2 font-sen text-sm text-white/60 hover:text-white transition-colors">
                    {social.icon} {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 03. Bottom Metadata Line */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-10 gap-6">
          <div className="flex gap-8 font-sen text-[10px] uppercase tracking-widest text-white/20">
            <span>© 2026 Magero Kyayi Joshua</span>
            <span className="hidden md:inline">— Based in Central Province, Uganda</span>
          </div>
          <div className="font-satoshi text-[10px] uppercase tracking-widest text-white/20">
            Crafted with Next.js & GSAP
          </div>
        </div>
      </div>
    </footer>
  );
}
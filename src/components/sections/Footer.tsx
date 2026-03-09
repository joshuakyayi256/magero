"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { ScrambleTextPlugin } from "gsap/dist/ScrambleTextPlugin"; 
import { ArrowUpRight, Github, Linkedin, Twitter, ArrowUp } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin, ScrambleTextPlugin);
}

const footerLinks = {
  navigation: [
    { label: "Works",      href: "#works" },
    { label: "About",      href: "#about" },
    { label: "Services",   href: "#services" },
    { label: "Tech Stack", href: "#techstack" },
  ],
  socials: [
    { name: "LinkedIn", icon: <Linkedin size={14} />, href: "#" },
    { name: "GitHub",   icon: <Github   size={14} />, href: "#" },
    { name: "Twitter",  icon: <Twitter  size={14} />, href: "#" },
  ],
  projects: ["Rentbetahouse", "Munno Ddala", "Envirian", "Soma"],
};

export default function Footer() {
  const footerRef    = useRef<HTMLElement>(null);
  const marqueeRef   = useRef<HTMLDivElement>(null);
  const ctaHeadRef   = useRef<HTMLHeadingElement>(null);
  const colRefs      = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. CTA Heading Reveal (SplitText)
      if (ctaHeadRef.current) {
        const split = new SplitText(ctaHeadRef.current, { type: "lines,words", linesClass: "overflow-hidden" });
        gsap.from(split.words, {
          scrollTrigger: { trigger: footerRef.current, start: "top 80%" },
          yPercent: 120,
          rotateX: -20,
          opacity: 0,
          stagger: 0.05,
          duration: 1.2,
          ease: "expo.out",
        });
      }

      // 2. Staggered Column Reveal
      colRefs.current.forEach((col, i) => {
        if (!col) return;
        gsap.from(col, {
          scrollTrigger: { trigger: footerRef.current, start: "top 75%" },
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "back.out(1.2)",
          delay: 0.1 * i,
        });
      });

      // 3. The Kinetic Bottom Marquee
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 20,
          ease: "linear",
        });

        // Speed mapping on scroll
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          onUpdate: (self) => {
            // Adjust timeScale based on scroll velocity for that "Inertia" feel
            const velocity = Math.abs(self.getVelocity() / 500);
            gsap.to(marqueeRef.current, { timeScale: 1 + velocity, duration: 0.5, overwrite: true });
          }
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // ScrollTo Top Function
  const handleScrollTop = () => {
    gsap.to(window, { duration: 1.5, scrollTo: 0, ease: "power4.inOut" });
  };

  // ScrambleText Hover Interaction
  const handleScrambleHover = (e: React.MouseEvent<HTMLAnchorElement>, originalText: string) => {
    gsap.to(e.currentTarget.querySelector(".scramble-target"), {
      duration: 0.6,
      scrambleText: { text: originalText, chars: "01X$#@*%", revealDelay: 0.1, speed: 0.8 },
    });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#0a0a0a] text-white pt-32 overflow-hidden flex flex-col justify-between min-h-screen z-50"
      data-theme="dark" // Forces dark mode for the footer anchor
    >
      <div className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto w-full flex-1">
        
        {/* ── TOP GRID: CTA & LINKS ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-20 gap-x-8 mb-32">
          
          {/* Left: Massive CTA */}
          <div ref={(el) => { colRefs.current[0] = el; }} className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-8 h-px bg-white/20" />
                <span className="font-satoshi text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">
                  Central Province, Uganda
                </span>
              </div>

              <h3 ref={ctaHeadRef} className="font-satoshi font-black uppercase tracking-tighter leading-[0.85] mb-12 text-[clamp(3.5rem,8vw,7rem)]">
                Let us build<br />
                <span className="text-white/20">the future.</span>
              </h3>

              <a
                href="mailto:magerokyayijoshua@gmail.com"
                className="group relative inline-flex items-center gap-4 px-10 py-6 rounded-full font-satoshi font-bold uppercase text-sm bg-white text-black overflow-hidden hover:scale-105 active:scale-95 transition-all duration-500"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start a conversation 
                  <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
                <div className="absolute inset-0 bg-[#e0e0e0] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              </a>
            </div>
          </div>

          {/* Right: Link Columns */}
          <div className="md:col-span-5 grid grid-cols-2 gap-12 mt-4 md:mt-0">
            {/* Explore */}
            <div ref={(el) => { colRefs.current[1] = el; }} className="space-y-8">
              <span className="font-satoshi text-[10px] uppercase tracking-[0.4em] font-black text-white/30 block">
                Explore
              </span>
              <ul className="space-y-5">
                {footerLinks.navigation.map(({ label, href }) => (
                  <li key={label}>
                    <button
                      onClick={() => gsap.to(window, { duration: 1.5, scrollTo: href, ease: "power4.inOut" })}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onMouseEnter={(e) => handleScrambleHover(e as any, label)}
                      className="group font-sen text-sm text-white/60 hover:text-white transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white/0 group-hover:bg-white/40 transition-colors" />
                      <span className="scramble-target">{label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div ref={(el) => { colRefs.current[2] = el; }} className="space-y-8">
              <span className="font-satoshi text-[10px] uppercase tracking-[0.4em] font-black text-white/30 block">
                Connect
              </span>
              <ul className="space-y-5">
                {footerLinks.socials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      className="group font-sen text-sm text-white/60 hover:text-white flex items-center gap-3 transition-colors"
                    >
                      <span className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                        {social.icon}
                      </span>
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── META & BACK TO TOP ── */}
        <div ref={(el) => { colRefs.current[3] = el; }} className="border-t border-white/10 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-sen text-[10px] uppercase tracking-[0.3em] text-white/40">
            © 2026 Magero Kyayi Joshua <span className="mx-4 hidden md:inline">|</span> Crafted with Next.js
          </div>
          
          <button 
            onClick={handleScrollTop}
            className="group flex items-center gap-3 font-satoshi text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 hover:text-white transition-colors"
          >
            Back to top
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
              <ArrowUp size={12} />
            </div>
          </button>
        </div>
      </div>

      {/* ── THE MASSIVE BOTTOM MARQUEE ── */}
      <div className="w-full overflow-hidden border-t border-white/5 bg-[#050505] py-4">
        <div ref={marqueeRef} className="inline-flex whitespace-nowrap pr-16">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-satoshi font-black uppercase tracking-tighter select-none px-8"
              style={{
                fontSize: "clamp(6rem, 15vw, 15rem)",
                lineHeight: "0.8",
                color: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.05)",
                WebkitTextStroke: i % 2 === 0 ? "1px rgba(255,255,255,0.05)" : "none",
              }}
            >
              Magero Kyayi Joshua
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
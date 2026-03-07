"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutManifesto() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for the portrait
      gsap.to(imageRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#0a0a0a] py-32 px-6 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        
        {/* Left: The "Human" Element (Inspired by image_c95fba.jpg) */}
        <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-[#111]">
          <div 
            ref={imageRef}
            className="absolute inset-0 bg-cover bg-center grayscale contrast-125 brightness-75 transition-all duration-700 hover:grayscale-0 hover:brightness-100"
            style={{ backgroundImage: "url('/magero-portrait.jpg')" }} // Placeholder for your high-end headshot
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>

        {/* Right: The "Authority" Content (Inspired by image_c9637d.png) */}
        <div className="flex flex-col">
          <span className="font-satoshi text-xs uppercase tracking-[0.3em] font-bold text-white/30 mb-8 flex items-center gap-4">
            <span className="w-8 h-px bg-white/10" /> The Philosophy
          </span>
          
          <h2 className="font-satoshi text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-8">
            Because good design <br />
            <span className="text-white/20 italic font-medium font-sen">is nt just about visuals.</span>
          </h2>

          <div className="space-y-6 font-sen text-lg text-white/60 leading-relaxed">
            <p>
              With years of experience grounding technical solutions in 
              <span className="text-white"> Information Systems logic</span>, I build digital products 
              that bridge the gap between complex engineering and market-ready strategy.
            </p>
            <p>
              From architecting the core of <span className="text-white">Soma</span> to leading the 
              digital growth of <span className="text-white">Synsify Studio</span>, my focus remains 
              constant: clarity, performance, and helping teams move forward.
            </p>
            <p className="text-sm font-satoshi uppercase tracking-widest pt-4 border-t border-white/5">
              Makerere University Alumnus // Software Engineer
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
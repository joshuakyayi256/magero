"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Plus, Code2, Database, BarChart4, Cpu } from "lucide-react";

const stack = [
  {
    category: "Interface & Experience",
    icon: <Code2 size={20} />,
    items: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "Vite"],
    color: "from-blue-500/10",
  },
  {
    category: "Architecture & Logic",
    icon: <Cpu size={20} />,
    items: ["Firebase", "Node.js", "System Design", "REST APIs", "WhatsApp API", "BaaS"],
    color: "from-purple-500/10",
  },
  {
    category: "Growth & Strategy",
    icon: <BarChart4 size={20} />,
    items: ["Growth Strategy", "SEO/SGE Optimization", "Digital Storytelling", "Authority Content", "Growth Ops"],
    color: "from-emerald-500/10",
  },
  {
    category: "Design Systems",
    icon: <Database size={20} />,
    items: ["Figma", "Design Tokens", "Apple-Style UI", "Cinematic 3D Renders", "Brand Identity"],
    color: "from-orange-500/10",
  }
];

export default function TechDNA() {
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tech-card", {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={gridRef} className="bg-[#0a0a0a] py-32 px-6 md:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="font-satoshi text-xs uppercase tracking-[0.3em] font-bold text-white/30 flex items-center gap-3">
            <Plus size={14} /> The Technical Stack
          </span>
          <h2 className="font-satoshi text-5xl md:text-7xl font-black text-white mt-6 uppercase tracking-tighter">
            Digital <span className="text-white/20">DNA.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stack.map((group, i) => (
            <div 
              key={i} 
              className={`tech-card relative group p-8 rounded-3xl border border-white/5 bg-linear-to-br ${group.color} to-transparent overflow-hidden hover:border-white/20 transition-all duration-500`}
            >
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-8 text-white/60 group-hover:text-white transition-colors">
                  {group.icon}
                </div>
                <h3 className="font-satoshi text-xl font-bold text-white mb-6 uppercase tracking-tight">
                  {group.category}
                </h3>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="font-sen text-sm text-white/50 group-hover:text-white/80 transition-colors flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-white/20" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Decorative Background "Plus" - Wirkus Inspired */}
              <Plus className="absolute -bottom-2 -right-2 text-white/5 scale-150" size={100} />
            </div>
          ))}
        </div>
        
        {/* Experience Footer Label */}
        <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
            <p className="font-sen text-xs text-white/30 uppercase tracking-widest">
              Proficiency: 5+ Years Active Engineering
            </p>
            <p className="font-sen text-xs text-white/30 uppercase tracking-widest">
              Strategy: Data-Driven Marketing
            </p>
        </div>
      </div>
    </section>
  );
}
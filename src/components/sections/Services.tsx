"use client";
import { Plus, Zap, BarChart3, Globe } from "lucide-react";

const services = [
  {
    title: "Systems Architecture",
    desc: "Building scalable, enterprise-grade ecosystems like Soma and Envirian with a focus on role-based logic and performance.",
    icon: <Zap size={24} />,
    tags: ["Next.js", "Firebase", "Node.js"]
  },
  {
    title: "Digital Strategy",
    desc: "Leveraging authority-based content and storytelling to scale agencies and brands in the digital space.",
    icon: <BarChart3 size={24} />,
    tags: ["Growth Ops", "Marketing", "SEO"]
  },
  {
    title: "Full-Stack Web",
    desc: "Crafting 'Apple-style' minimalist interfaces integrated with robust back-end systems for seamless user experiences.",
    icon: <Globe size={24} />,
    tags: ["React", "Tailwind", "GSAP"]
  }
];

export default function Services() {
  return (
    <section className="bg-[#0a0a0a] py-32 px-6 md:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="line-mask mb-16">
          <h2 className="reveal-text font-satoshi text-white text-[10vw] md:text-[5vw] font-black uppercase tracking-tighter">
            Services<span className="text-white/20">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className="group p-8 rounded-2xl border border-white/5 bg-white/1 hover:bg-white/3 transition-all duration-500">
              <div className="text-white/40 group-hover:text-white transition-colors mb-6">
                {service.icon}
              </div>
              <h3 className="font-satoshi text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Plus size={16} className="text-white/20" /> {service.title}
              </h3>
              <p className="font-sen text-white/60 leading-relaxed mb-8">
                {service.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-satoshi uppercase tracking-widest text-white/30 border border-white/10 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
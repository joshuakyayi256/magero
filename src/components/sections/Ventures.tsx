"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ventures = [
  {
    name: "Soma",
    category: "EdTech Infrastructure",
    description: "School admissions infrastructure for East African institutions.",
    status: "In Development",
  },
  {
    name: "Wola",
    category: "FinTech Infrastructure",
    description: "Multi-tenant loan management SaaS built for East African lenders.",
    status: "In Development",
  },
];

export default function Ventures() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRefs.current.filter(Boolean), {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ventures"
      className="relative py-28 md:py-40 px-6 md:px-16 lg:px-24 border-t transition-colors duration-500"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="block w-8 h-px" style={{ background: "var(--text-primary)", opacity: 0.2 }} />
            <span
              className="font-satoshi text-[9px] uppercase tracking-[0.55em] font-black"
              style={{ color: "var(--text-primary)", opacity: 0.45 }}
            >
              Founder-Built
            </span>
          </div>
          <h2
            className="font-satoshi font-black uppercase tracking-tighter leading-[0.88]"
            style={{ fontSize: "clamp(2.25rem, 10vw, 9.5rem)", color: "var(--text-primary)" }}
          >
            Ventures.
          </h2>
          <p
            className="font-sen text-sm md:text-base max-w-lg mt-6 leading-relaxed"
            style={{ color: "var(--text-primary)", opacity: 0.5 }}
          >
            Distinct from client work — infrastructure I own and build for East African institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {ventures.map((v, i) => (
            <div
              key={v.name}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="rounded-2xl p-8 md:p-10 border flex flex-col justify-between gap-10"
              style={{ borderColor: "var(--border-subtle)", background: "color-mix(in srgb, var(--text-primary) 3%, transparent)" }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-satoshi text-[9px] uppercase tracking-[0.4em] px-3 py-1.5 rounded-full border"
                  style={{ borderColor: "var(--border-subtle)", color: "var(--text-primary)", opacity: 0.5 }}
                >
                  {v.category}
                </span>
                <span
                  className="flex items-center gap-2 font-satoshi text-[9px] uppercase tracking-[0.3em]"
                  style={{ color: "var(--text-primary)", opacity: 0.4 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#facc15" }} />
                  {v.status}
                </span>
              </div>

              <div>
                <h3
                  className="font-satoshi font-black uppercase tracking-tight leading-none mb-3"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text-primary)" }}
                >
                  {v.name}
                </h3>
                <p
                  className="font-sen text-sm md:text-base leading-relaxed max-w-sm"
                  style={{ color: "var(--text-primary)", opacity: 0.6 }}
                >
                  {v.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

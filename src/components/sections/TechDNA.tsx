"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { Plus, Minus, Code2, Database, BarChart4, Cpu } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const stack = [
  {
    id: "stack-interface",
    number: "(001)",
    category: "Interface & Experience",
    icon: <Code2 size={18} />,
    items: [
      "Next.js 15", "React", "TypeScript", "Tailwind CSS",
      "GSAP", "Framer Motion", "Radix UI", "Storybook",
    ],
    description:
      "Building Apple-style minimalist, high-end interfaces with fluid motion and zero layout shift. Every pixel is intentional — from micro-interactions to full-page transitions.",
  },
  {
    id: "stack-architecture",
    number: "(002)",
    category: "Architecture & Logic",
    icon: <Cpu size={18} />,
    items: [
      "Firebase", "Node.js", "System Design",
      "REST APIs", "PostgreSQL", "Redis",
    ],
    description:
      "Architecting scalable systems and role-based data layers for complex applications. Clean separation of concerns, edge-ready infrastructure.",
  },
  {
    id: "stack-strategy",
    number: "(003)",
    category: "Growth & Strategy",
    icon: <BarChart4 size={18} />,
    items: [
      "Growth Strategy", "SEO / SGE", "Authority Content", "Growth Ops",
    ],
    description:
      "Leveraging storytelling and data-driven marketing to scale brands. From zero to traction — measuring what moves the needle.",
  },
  {
    id: "stack-design",
    number: "(004)",
    category: "Design Systems",
    icon: <Database size={18} />,
    items: [
      "Figma", "Design Tokens", "Cinematic 3D Renders", "Brand Identity",
    ],
    description:
      "Creating premium corporate design aesthetics and photorealistic visual generations. Systematic, scalable, and deeply intentional.",
  },
];

// ─── Pill overflow helper ───────────────────────────────
const PILL_LIMIT = 5;

function PillList({ items }: { items: string[] }) {
  const visible = items.slice(0, PILL_LIMIT);
  const overflow = items.length - PILL_LIMIT;
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {visible.map((item) => (
        <span
          key={item}
          className="text-xs px-3 py-1.5 rounded-full border border-(--border-subtle)var(--bg-primary)] text-(--text-primary) opacity-90 font-sen"
        >
          {item}
        </span>
      ))}
      {overflow > 0 && (
        <span className="text-xs px-3 py-1.5 rounded-full border border-(--border-subtle) text-(--text-primary) opacity-40 font-sen">
          {overflow}+
        </span>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────
export default function TechDNA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number>(0);

  // ── GSAP Animations ────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Eyebrow fade-up
      gsap.from(eyebrowRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // 2. Heading — masked line-by-line reveal
      const lines = headingRef.current?.querySelectorAll(".reveal-line");
      if (lines?.length) {
        gsap.from(lines, {
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
          yPercent: 110,
          opacity: 0,
          stagger: 0.12,
          duration: 1,
          ease: "power4.out",
          delay: 0.1,
        });
      }

      // 3. Subheading
      gsap.from(subRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%" },
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.3,
      });

      // 4. Accordion rows — stagger in
      gsap.from(rowRefs.current.filter(Boolean), {
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
      });

      // 5. CTA button
      gsap.from(ctaRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 50%" },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Accordion toggle ───────────────────────────────────
  const handleToggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  };

  return (
    <section
      ref={sectionRef}
      id="techstack"
      className="relative py-28 md:py-36 px-6 md:px-16 lg:px-24 border-t overflow-hidden transition-colors duration-500"
      style={{ borderColor: "var(--border-subtle)" }}
    >


      <div className="max-w-7xl mx-auto">

        {/* ── TOP: eyebrow + heading + sub ── */}
        <div className="mb-16 md:mb-24">

          {/* Eyebrow row — "How can I help" left, count right */}
          <div ref={eyebrowRef} className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <Plus size={12} style={{ color: "var(--text-primary)", opacity: 0.35 }} />
              <span
                className="font-satoshi text-[10px] uppercase tracking-[0.45em] font-black"
                style={{ color: "var(--text-primary)", opacity: 0.6 }}
              >
                How can I help
              </span>
            </div>
            {/* Floating count — top right, ghost style */}
            <span
              className="font-satoshi font-black text-xl md:text-2xl tracking-tight"
              style={{ color: "var(--text-primary)", opacity: 0.35 }}
            >
              ({stack.length})
            </span>
          </div>

          {/* Heading — full-width, newspaper-scale */}
          <div className="overflow-hidden mb-2">
            <h2
              ref={headingRef}
              className="font-satoshi font-black uppercase tracking-tighter leading-[0.88]"
              style={{
                fontSize: "clamp(3.5rem, 11vw, 10rem)",
                color: "var(--text-primary)",
              }}
            >
              <span className="block overflow-hidden">
                <span className="reveal-line block">The Technical</span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="reveal-line block"
                  style={{ color: "var(--text-primary)", opacity: 0.35 }}
                >
                  Foundation.
                </span>
              </span>
            </h2>
          </div>

          <p
            ref={subRef}
            className="font-sen text-base md:text-lg max-w-md leading-relaxed mt-8"
            style={{ color: "var(--text-primary)", opacity: 0.7 }}
          >
            Bridging the gap between complex engineering and market-ready strategy.
          </p>
        </div>

        {/* ── ACCORDION TABLE ── */}
        <div className="border-t" style={{ borderColor: "var(--border-subtle)" }}>
          {stack.map((group, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={group.id}
                id={group.id}
                ref={(el) => { rowRefs.current[i] = el; }}
                className="border-b transition-colors duration-300"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                {/* ── ROW HEADER — always visible ── */}
                <button
                  type="button"
                  onClick={() => handleToggle(i)}
                  className="w-full grid items-center gap-4 md:gap-8 py-6 md:py-8 text-left group cursor-pointer"
                  style={{
                    gridTemplateColumns: "6rem 1fr auto",
                  }}
                  aria-expanded={isOpen}
                >
                  {/* Number */}
                  <span
                    className="font-satoshi text-sm font-black tabular-nums"
                    style={{ color: "var(--text-primary)", opacity: 0.45 }}
                  >
                    {group.number}
                  </span>

                  {/* Title */}
                  <span
                    className="font-satoshi text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      color: "var(--text-primary)",
                      opacity: isOpen ? 1 : 0.88,
                    }}
                  >
                    {group.category}
                  </span>

                  {/* Toggle icon */}
                  <span
                    className="w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      borderColor: "var(--border-subtle)",
                      color: "var(--text-primary)",
                      opacity: isOpen ? 1 : 0.7,
                    }}
                  >
                    {isOpen
                      ? <Minus size={14} strokeWidth={2} />
                      : <Plus size={14} strokeWidth={2} />
                    }
                  </span>
                </button>

                {/* ── EXPANDED CONTENT ── */}
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: isOpen ? "500px" : "0px",
                    opacity: isOpen ? 1 : 0,
                    transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
                  }}
                >
                  <div
                    className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 md:pb-14"
                    style={{ paddingLeft: "0" }}
                  >
                    {/* Left: description */}
                    <div className="md:col-span-5 md:col-start-2 flex flex-col gap-6">
                      {/* Icon badge */}
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                        style={{
                          borderColor: "var(--border-subtle)",
                          color: "var(--text-primary)",
                          opacity: 0.8,
                          background: "transparent",
                        }}
                      >
                        {group.icon}
                      </div>
                      <p
                        className="font-sen text-base leading-relaxed"
                        style={{ color: "var(--text-primary)", opacity: 0.75 }}
                      >
                        {group.description}
                      </p>
                    </div>

                    {/* Right: pills + label */}
                    <div className="md:col-span-5 md:col-start-8">
                      <p
                        className="font-satoshi text-[9px] uppercase tracking-[0.45em] font-black mb-1"
                        style={{ color: "var(--text-primary)", opacity: 0.5 }}
                      >
                        Categories
                      </p>
                      <PillList items={group.items} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA BUTTON ── */}
        <div ref={ctaRef} className="mt-16">
          <button
            type="button"
            className="font-satoshi font-black text-sm uppercase tracking-widest px-8 py-4 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              borderColor: "var(--border-subtle)",
              color: "var(--text-primary)",
              background: "var(--bg-primary)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--text-primary)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--bg-primary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-primary)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
            }}
          >
            Get started
          </button>
        </div>

      </div>
    </section>
  );
}
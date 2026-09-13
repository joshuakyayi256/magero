"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
import { ArrowUpRight, Zap, BarChart3, Globe } from "lucide-react";
import { getLenis } from "@/lib/lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

/* ─── Data ─────────────────────────────────────────────── */
const services = [
  {
    number: "(01)",
    title: "Systems Architecture",
    verb: "Build",        // used in text-replace ticker
    desc: "Enterprise-grade ecosystems built with role-based logic, edge performance, and zero single points of failure. From schema design to deployment.",
    icon: <Zap size={20} />,
    tags: ["Next.js", "Firebase", "Node.js", "PostgreSQL"],
    stat: "12+ systems shipped",
  },
  {
    number: "(02)",
    title: "Digital Strategy",
    verb: "Scale",
    desc: "Authority-based content, growth operations, and narrative strategy that turns expertise into compounding digital assets.",
    icon: <BarChart3 size={20} />,
    tags: ["Growth Ops", "SEO / SGE", "Content", "Brand"],
    stat: "3× avg. organic growth",
  },
  {
    number: "(03)",
    title: "Full-Stack Web",
    verb: "Ship",
    desc: "Pixel-precise interfaces fused with robust back-ends. Every interaction considered, every millisecond measured.",
    icon: <Globe size={20} />,
    tags: ["React", "Tailwind", "GSAP", "APIs"],
    stat: "Sub-100ms load targets",
  },
];

/* ─── Rotating verb ticker ──────────────────────────────── */
const TICKER_WORDS = ["Build.", "Scale.", "Ship.", "Launch.", "Architect."];

function VerbTicker() {
  const tickerRef = useRef<HTMLSpanElement>(null);
  const indexRef  = useRef(0);

  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;

    const rotate = () => {
      const next = TICKER_WORDS[(indexRef.current + 1) % TICKER_WORDS.length];

      // slide current word out upward
      gsap.to(el, {
        yPercent: -110,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          indexRef.current = (indexRef.current + 1) % TICKER_WORDS.length;
          el.textContent = next;
          // snap to below, then slide in
          gsap.fromTo(el,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.55, ease: "power3.out" }
          );
        },
      });
    };

    const interval = setInterval(rotate, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      ref={tickerRef}
      className="inline-block font-satoshi font-black uppercase tracking-tighter"
      style={{
        color: "var(--text-primary)",
        opacity: 0.18,
        fontSize: "inherit",
        lineHeight: "inherit",
      }}
    >
      Build.
    </span>
  );
}

/* ─── Main Component ────────────────────────────────────── */
export default function Services() {
  const sectionRef    = useRef<HTMLElement>(null);
  const eyebrowRef    = useRef<HTMLDivElement>(null);
  const headingRef    = useRef<HTMLHeadingElement>(null);
  const subRowRef     = useRef<HTMLDivElement>(null);
  const cardRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef        = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  /* ── GSAP entrance + scroll animations ─────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Eyebrow wipe
      gsap.from(eyebrowRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        xPercent: -30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      // 2. Heading — SplitText word reveal with clip mask
      if (headingRef.current) {
        const split = new SplitText(headingRef.current, {
          type: "lines,words",
          linesClass: "line-clip-svc",
        });
        document.querySelectorAll<HTMLElement>(".line-clip-svc").forEach((el) => {
          el.style.overflow = "hidden";
          el.style.display  = "block";
        });
        gsap.from(split.words, {
          scrollTrigger: { trigger: sectionRef.current, start: "top 74%" },
          yPercent: 115,
          rotateX: -14,
          opacity: 0,
          stagger: 0.07,
          duration: 1.1,
          ease: "expo.out",
          delay: 0.1,
        });
      }

      // 3. Sub row
      gsap.from(subRowRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%" },
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.35,
      });

      // 4. Cards — staggered fade-up
      cardRefs.current.filter(Boolean).forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: sectionRef.current, start: "top 62%" },
          y: 70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.15 + i * 0.12,
        });
      });

      // 5. CTA
      gsap.from(ctaRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 50%" },
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.65,
      });

      // 6. Subtle parallax scrub on heading
      gsap.to(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "50% top",
          scrub: 2,
        },
        y: -40,
        ease: "none",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Card magnetic hover ────────────────────────────── */
  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const card = cardRefs.current[i];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width  / 2) * 0.06;
    const dy = (e.clientY - rect.top  - rect.height / 2) * 0.06;
    gsap.to(card, { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
  };
  const handleCardLeave = (i: number) => {
    gsap.to(cardRefs.current[i], {
      x: 0, y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.45)",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-28 md:py-40 px-6 md:px-16 lg:px-24 border-t overflow-hidden transition-colors duration-500"
      style={{ borderColor: "var(--border-subtle)" }}
    >

      {/* ── Ambient glow decoration ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-125 h-125 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)",
          filter: "blur(80px)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── HEADER BLOCK ── */}
        <div className="mb-20 md:mb-28">

          {/* Eyebrow */}
          <div ref={eyebrowRef} className="flex items-center gap-4 mb-8">
            <span className="block w-8 h-px" style={{ background: "var(--text-primary)", opacity: 0.2 }} />
            <span
              className="font-satoshi text-[9px] uppercase tracking-[0.55em] font-black"
              style={{ color: "var(--text-primary)", opacity: 0.5 }}
            >
              Strategic Offerings
            </span>
          </div>

          {/* Heading row — title left, rotating verb right */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 overflow-hidden">
            <h2
              ref={headingRef}
              className="font-satoshi font-black uppercase tracking-tighter leading-[0.88]"
              style={{
                fontSize: "clamp(2.25rem, 10vw, 9.5rem)",
                color: "var(--text-primary)",
                perspective: "800px",
              }}
            >
              Services.
            </h2>

            {/* Rotating verb — desktop only, sits bottom-right of heading */}
            <div
              className="hidden md:flex flex-col items-end pb-3 overflow-hidden"
              style={{ fontSize: "clamp(2rem, 4.5vw, 5rem)" }}
            >
              <span
                className="font-satoshi font-black uppercase text-[9px] tracking-[0.5em] mb-1"
                style={{ color: "var(--text-primary)", opacity: 0.3 }}
              >
                We
              </span>
              <VerbTicker />
            </div>
          </div>

          {/* Sub row — count + description */}
          <div
            ref={subRowRef}
            className="mt-10 flex flex-col md:flex-row md:items-start justify-between gap-6"
          >
            <p
              className="font-sen text-base md:text-lg leading-relaxed max-w-md"
              style={{ color: "var(--text-primary)", opacity: 0.65 }}
            >
              Three integrated disciplines — designed to work together or independently, depending on where you are.
            </p>
            <span
              className="font-satoshi font-black text-[9px] uppercase tracking-[0.5em] shrink-0"
              style={{ color: "var(--text-primary)", opacity: 0.25 }}
            >
              0{services.length} Disciplines
            </span>
          </div>
        </div>

        {/* ── SERVICE CARDS — full-width stacked rows ── */}
        <div className="space-y-4">
          {services.map((svc, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => { setHoveredIdx(null); handleCardLeave(i); }}
                onMouseMove={(e) => handleCardMove(e, i)}
                className="group relative border rounded-3xl p-8 md:p-12 cursor-pointer transition-colors duration-500"
                style={{
                  borderColor: isHovered
                    ? "rgba(255,255,255,0.18)"
                    : "var(--border-subtle)",
                  background: isHovered
                    ? "rgba(255,255,255,0.04)"
                    : "transparent",
                  willChange: "transform",
                }}
              >
                {/* ── Inner grid: number | content | stat+arrow ── */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                  {/* Number + icon */}
                  <div className="md:col-span-2 flex md:flex-col items-center md:items-start gap-4">
                    <span
                      className="font-satoshi font-black text-sm tabular-nums"
                      style={{ color: "var(--text-primary)", opacity: 0.3 }}
                    >
                      {svc.number}
                    </span>
                    <span
                      className="p-2.5 rounded-xl border transition-[border-color,color,opacity] duration-500"
                      style={{
                        borderColor: "var(--border-subtle)",
                        color: "var(--text-primary)",
                        opacity: isHovered ? 1 : 0.5,
                      }}
                    >
                      {svc.icon}
                    </span>
                  </div>

                  {/* Title + description + tags */}
                  <div className="md:col-span-7">
                    <h3
                      className="font-satoshi font-black uppercase tracking-tighter mb-4 leading-none transition-opacity duration-500"
                      style={{
                        fontSize: "clamp(1.5rem, 3vw, 2.8rem)",
                        color: "var(--text-primary)",
                        opacity: isHovered ? 1 : 0.85,
                      }}
                    >
                      {svc.title}
                    </h3>
                    <p
                      className="font-sen text-base leading-relaxed mb-7 max-w-xl"
                      style={{ color: "var(--text-primary)", opacity: isHovered ? 0.8 : 0.55 }}
                    >
                      {svc.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {svc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-satoshi text-[10px] uppercase tracking-[0.4em] px-3 py-1.5 rounded-full border transition-[background-color,border-color,opacity] duration-300"
                          style={{
                            borderColor: "var(--border-subtle)",
                            color: "var(--text-primary)",
                            opacity: isHovered ? 0.85 : 0.45,
                            background: isHovered ? "rgba(255,255,255,0.04)" : "transparent",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stat + arrow — desktop */}
                  <div className="hidden md:flex md:col-span-3 flex-col items-end justify-between h-full">
                    <ArrowUpRight
                      size={22}
                      className="transition-[opacity,transform] duration-500"
                      style={{
                        color: "var(--text-primary)",
                        opacity: isHovered ? 1 : 0.2,
                        transform: isHovered ? "translate(4px, -4px)" : "translate(0,0)",
                      }}
                    />
                    <div className="text-right mt-auto pt-8">
                      <span
                        className="font-satoshi font-black text-[10px] uppercase tracking-[0.4em] block mb-1"
                        style={{ color: "var(--text-primary)", opacity: 0.25 }}
                      >
                        Track record
                      </span>
                      <span
                        className="font-satoshi font-black text-lg transition-opacity duration-500"
                        style={{
                          color: "var(--text-primary)",
                          opacity: isHovered ? 0.9 : 0.35,
                        }}
                      >
                        {svc.stat}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Progress bar — animates on hover. scaleX (not width) so this stays
                    a compositor-only transform instead of triggering layout. */}
                <div
                  className="absolute bottom-0 left-0 w-full h-px rounded-full transition-transform duration-700"
                  style={{
                    transform: `scaleX(${isHovered ? 1 : 0})`,
                    transformOrigin: "left",
                    background: "var(--text-primary)",
                    opacity: 0.15,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* ── CTA ROW ── */}
        <div
          ref={ctaRef}
          className="mt-16 md:mt-20 flex flex-col md:flex-row md:items-center justify-between gap-6 pt-12 border-t"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <p
            className="font-sen text-sm leading-relaxed max-w-sm"
            style={{ color: "var(--text-primary)", opacity: 0.45 }}
          >
            Every engagement starts with a conversation — no templates, no packages, no assumptions.
          </p>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) getLenis()?.scrollTo(el, { offset: -80, duration: 1.2 });
            }}
            className="font-satoshi font-black text-sm uppercase tracking-widest px-8 py-4 rounded-full border shrink-0 transition-[background-color,color,transform] duration-300 hover:scale-105 active:scale-95 group flex items-center gap-3"
            style={{
              borderColor: "var(--border-subtle)",
              color: "var(--text-primary)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget).style.background = "var(--text-primary)";
              (e.currentTarget).style.color = "var(--bg-primary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget).style.background = "transparent";
              (e.currentTarget).style.color = "var(--text-primary)";
            }}
          >
            Start a conversation
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
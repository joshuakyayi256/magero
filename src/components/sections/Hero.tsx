"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/dist/SplitText";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { getLenis } from "@/lib/lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

/* ─── Specialties that cycle in the headline ──────── */
const SPECIALTIES = ["Founder.", "Engineer.", "Architect.", "Builder."];

/* ─── Character scramble helper ──────────────────── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";

function scrambleTo(el: HTMLElement, target: string, duration = 0.65, onComplete?: () => void) {
  const totalFrames = Math.round(duration * 60);
  let frame = 0;
  const tick = () => {
    frame++;
    const progress = frame / totalFrames;
    const revealed  = Math.floor(progress * target.length);
    let text        = target.slice(0, revealed);
    for (let i = revealed; i < target.length; i++) {
      text += CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    el.textContent = text;
    if (frame < totalFrames) requestAnimationFrame(tick);
    else { el.textContent = target; onComplete?.(); }
  };
  requestAnimationFrame(tick);
}

export default function Hero() {
  const sectionRef   = useRef<HTMLElement>(null);
  const eyebrowRef   = useRef<HTMLSpanElement>(null);
  const line1Ref     = useRef<HTMLSpanElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLButtonElement>(null);
  const ctaSecRef    = useRef<HTMLButtonElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const orbRef       = useRef<HTMLDivElement>(null);
  const grainRef     = useRef<HTMLDivElement>(null);
  const cursorOrbRef = useRef<HTMLDivElement>(null);
  const taglineRef   = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const indexRef     = useRef(0);
  const [specIdx, setSpecIdx] = useState(0);

  /* ─── Entrance timeline ──────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(grainRef.current,
        { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }
      );
      gsap.fromTo(orbRef.current,
        { scale: 0.4, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.4, ease: "power4.out" }
      );
      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1, ease: "expo.out", delay: 0.3 }
      );

      if (eyebrowRef.current) {
        const split = new SplitText(eyebrowRef.current, { type: "chars" });
        gsap.fromTo(split.chars,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, stagger: 0.02, duration: 0.5, ease: "power3.out", delay: 0.5 }
        );
      }

      // Headline entrance
      gsap.fromTo(line1Ref.current,
        { yPercent: 110, opacity: 0, rotateX: -14 },
        { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.1, ease: "expo.out", delay: 0.7 }
      );

      gsap.fromTo(subRef.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.15 }
      );

      gsap.fromTo(taglineRef.current,
        { x: -24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 1.3 }
      );

      const statItems = statsRef.current?.querySelectorAll(".stat-item");
      if (statItems?.length) {
        gsap.fromTo(statItems,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "back.out(1.5)", delay: 1.4 }
        );
      }

      gsap.fromTo(ctaRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "expo.out", delay: 1.5 }
      );

      gsap.fromTo(ctaSecRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 1.7 }
      );

      // Scroll parallax
      gsap.to(line1Ref.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        y: -70,
        opacity: 0.3,
        ease: "none",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ─── Cycling specialty with scramble ────────────── */
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIdx = (indexRef.current + 1) % SPECIALTIES.length;
      const next    = SPECIALTIES[nextIdx];
      const l1      = line1Ref.current;
      if (!l1) return;

      // Slide line out upward
      gsap.to(l1, {
        yPercent: -115,
        opacity: 0,
        rotateX: 12,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          indexRef.current = nextIdx;
          setSpecIdx(nextIdx);
          gsap.set(l1, { yPercent: 110, rotateX: -12 });

          // Scramble then resolve
          scrambleTo(l1, next.toUpperCase(), 0.5);

          // Slide back in
          gsap.to(l1, {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.75,
            ease: "expo.out",
            delay: 0.05,
          });
        },
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* ─── Cursor orb ──────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    const orb     = cursorOrbRef.current;
    if (!section || !orb) return;
    let raf: number;
    let mx = 0, my = 0;
    let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    section.addEventListener("mousemove", onMove);
    const tick = () => {
      cx = lerp(cx, mx, 0.07); cy = lerp(cy, my, 0.07);
      gsap.set(orb, { x: cx - 180, y: cy - 180 });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { section.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  /* ─── Magnetic CTA ────────────────────────────────── */
  const magneticMove = (e: React.MouseEvent<HTMLButtonElement>, ref: React.RefObject<HTMLButtonElement | null>) => {
    const btn  = ref.current!;
    const rect = btn.getBoundingClientRect();
    const dx   = (e.clientX - rect.left - rect.width  / 2) * 0.32;
    const dy   = (e.clientY - rect.top  - rect.height / 2) * 0.32;
    gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: "power2.out" });
  };
  const magneticLeave = (ref: React.RefObject<HTMLButtonElement | null>) => {
    gsap.to(ref.current, { x: 0, y: 0, scale: 1, duration: 0.65, ease: "elastic.out(1, 0.45)" });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    getLenis()?.scrollTo(el, { offset: -80, duration: 1.2 });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex flex-col justify-center overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Grain */}
      <div ref={grainRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Ambient orb */}
      <div ref={orbRef} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
        style={{ width: "600px", height: "600px", background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      {/* Cursor orb */}
      <div ref={cursorOrbRef} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 rounded-full z-0"
        style={{ width: "360px", height: "360px", background: "radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 px-6 md:px-16 lg:px-24 w-full max-w-7xl mx-auto">

        <div ref={lineRef} className="mb-8 h-px w-16" style={{ background: "var(--text-primary)", opacity: 0.2 }} />

        <span ref={eyebrowRef} className="font-sen uppercase tracking-[0.45em] text-xs block mb-6"
          style={{ color: "var(--text-primary)", opacity: 0.45 }}>
          Based in Kampala, Uganda
        </span>

        {/* Headline */}
        <div className="mb-10 overflow-hidden" style={{ perspective: "1000px" }}>
          <div className="overflow-hidden">
            <span ref={line1Ref}
              className="font-satoshi font-black uppercase tracking-tighter leading-[0.88] block"
              style={{ fontSize: "clamp(2.25rem, 11vw, 10.5rem)", color: "var(--text-primary)" }}
            >
              {SPECIALTIES[0].toUpperCase()}
            </span>
          </div>
        </div>

        {/* ── Bottom grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">

          {/* Left: specialty pills + bio ── */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Specialty indicator pills */}
            <div ref={taglineRef} className="flex flex-wrap gap-2">
              {SPECIALTIES.map((s, i) => (
                <span key={s}
                  className="font-satoshi font-black text-[8px] uppercase tracking-[0.4em] px-3 py-1.5 rounded-full border transition-all duration-500"
                  style={{
                    borderColor: i === specIdx ? "color-mix(in srgb, var(--text-primary) 40%, transparent)" : "var(--border-subtle)",
                    color: "var(--text-primary)",
                    opacity: i === specIdx ? 1 : 0.3,
                    background: i === specIdx ? "color-mix(in srgb, var(--text-primary) 8%, transparent)" : "transparent",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Manifesto line — short, punchy, not duplicated below */}
            <p ref={subRef} className="font-sen text-base md:text-lg leading-relaxed"
              style={{ color: "var(--text-primary)", opacity: 0.55 }}>
              Institutional-grade systems — insurance, edtech, fintech — built for East African conditions.
            </p>
          </div>

          {/* Centre: location + availability ── */}
          <div ref={statsRef} className="lg:col-span-4 flex flex-col gap-5">
            <div className="stat-item border-t pt-5" style={{ borderColor: "var(--border-subtle)" }}>
              <p className="font-satoshi font-black text-[9px] uppercase tracking-[0.5em] mb-2"
                style={{ color: "var(--text-primary)", opacity: 0.3 }}>
                Currently
              </p>
              <p className="font-sen text-sm leading-snug"
                style={{ color: "var(--text-primary)", opacity: 0.65 }}>
                Building digital infrastructure<br />for East African institutions.
              </p>
            </div>
            <div className="stat-item flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full shrink-0"
                style={{ background: "#4ade80", boxShadow: "0 0 7px #4ade80", animation: "heroPulse 2s ease-in-out infinite" }} />
              <span className="font-satoshi font-black text-[9px] uppercase tracking-[0.45em]"
                style={{ color: "var(--text-primary)", opacity: 0.55 }}>
                Open to new projects — 2026
              </span>
            </div>
          </div>

          {/* Right: CTAs ── */}
          <div className="lg:col-span-3 flex flex-col gap-3 items-start lg:items-end">
            <button ref={ctaRef} type="button"
              onClick={() => scrollToSection("contact")}
              onMouseMove={(e) => magneticMove(e, ctaRef)}
              onMouseLeave={() => magneticLeave(ctaRef)}
              className="font-satoshi font-black text-sm uppercase tracking-widest px-8 py-4 rounded-full flex items-center gap-3 group"
              style={{ background: "var(--text-primary)", color: "var(--bg-primary)", clipPath: "inset(0 100% 0 0)" }}
            >
              Start a Project
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button ref={ctaSecRef} type="button"
              onClick={() => scrollToSection("works")}
              onMouseMove={(e) => magneticMove(e, ctaSecRef)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "color-mix(in srgb, var(--text-primary) 6%, transparent)";
                gsap.to(e.currentTarget, { scale: 1.04, duration: 0.3, ease: "power2.out" });
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                magneticLeave(ctaSecRef);
              }}
              className="font-satoshi font-black text-sm uppercase tracking-widest px-8 py-4 rounded-full border flex items-center gap-3 group"
              style={{ borderColor: "var(--border-subtle)", color: "var(--text-primary)", background: "transparent", opacity: 0 }}
            >
              View My Work
            </button>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-6 md:left-16 lg:left-24 flex items-center gap-4" style={{ opacity: 0.22 }}>
        <div className="w-px h-12 origin-top"
          style={{ background: "var(--text-primary)", animation: "scrollPulse 2s ease-in-out infinite" }} />
        <span className="font-sen text-[9px] uppercase tracking-[0.5em]"
          style={{ color: "var(--text-primary)" }}>Scroll</span>
      </div>

      {/* Index counter top-right */}
      <div className="absolute top-28 right-6 md:right-16 lg:right-24" style={{ opacity: 0.2 }}>
        <span className="font-satoshi font-black text-[9px] uppercase tracking-[0.5em]"
          style={{ color: "var(--text-primary)" }}>
          {String(specIdx + 1).padStart(2, "0")} / {String(SPECIALTIES.length).padStart(2, "0")}
        </span>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(1);   opacity: 0.4; }
          50%       { transform: scaleY(0.5); opacity: 1;   }
        }
        @keyframes heroPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
}
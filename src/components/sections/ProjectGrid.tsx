"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const projects = [
  {
    id: "01",
    title: "Rentbetahouse",
    category: "Property & Fintech",
    desc: "Role-based rental platform with real-time listings and integrated payments.",
    span: "lg:col-span-8",
    tall: false,
  },
  {
    id: "02",
    title: "Munno Ddala SACCO",
    category: "System Architecture",
    desc: "Full savings & credit cooperative system with member dashboards.",
    span: "lg:col-span-4",
    tall: false,
  },
  {
    id: "03",
    title: "Green World Safaris",
    category: "Travel & Tourism",
    desc: "Immersive booking experience for East African safari packages.",
    span: "lg:col-span-4",
    tall: true,
  },
  {
    id: "04",
    title: "Hanker Homes Ltd",
    category: "Real Estate Design",
    desc: "Premium property showcase with 3D render integrations.",
    span: "lg:col-span-4",
    tall: true,
  },
  {
    id: "05",
    title: "Citie Photography",
    category: "Visual Storytelling",
    desc: "Editorial photography studio site with gallery and booking flow.",
    span: "lg:col-span-4",
    tall: true,
  },
  {
    id: "06",
    title: "Vivacity Aromatherapy",
    category: "E-Commerce",
    desc: "Wellness brand store with curated product experience.",
    span: "lg:col-span-6",
    tall: false,
  },
  {
    id: "07",
    title: "Inspirational Youth",
    category: "Social Initiative",
    desc: "Community platform connecting mentors with young professionals.",
    span: "lg:col-span-6",
    tall: false,
  },
];

export default function ProjectGrid() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const metaRef     = useRef<HTMLDivElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Eyebrow slide in
      gsap.from(eyebrowRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        x: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // 2. Heading — SplitText word tumble
      if (headingRef.current) {
        const split = new SplitText(headingRef.current, {
          type: "lines,words",
          linesClass: "proj-line-clip",
        });
        document.querySelectorAll<HTMLElement>(".proj-line-clip").forEach((el) => {
          el.style.overflow = "hidden";
          el.style.display  = "block";
        });
        gsap.from(split.words, {
          scrollTrigger: { trigger: sectionRef.current, start: "top 76%" },
          yPercent: 115,
          rotateX: -12,
          opacity: 0,
          stagger: 0.06,
          duration: 1,
          ease: "expo.out",
          delay: 0.1,
        });
      }

      // 3. Meta text fade
      gsap.from(metaRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        y: 16,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.4,
      });

      // 4. Cards — stagger with back.out inertia, alternating directions
      cardRefs.current.filter(Boolean).forEach((card, i) => {
        const fromLeft = i % 2 === 0;
        gsap.from(card, {
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
          x: fromLeft ? -30 : 30,
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.3)",
          delay: 0.1 + i * 0.08,
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Card hover — image scale + content lift
  const handleCardEnter = (i: number) => {
    setHoveredIdx(i);
    const card = cardRefs.current[i];
    if (!card) return;
    gsap.to(card.querySelector(".card-img"), {
      scale: 1.06,
      duration: 0.8,
      ease: "power2.out",
    });
    gsap.to(card.querySelector(".card-content"), {
      y: -6,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(card.querySelector(".card-arrow"), {
      x: 4,
      y: -4,
      scale: 1.1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleCardLeave = (i: number) => {
    setHoveredIdx(null);
    const card = cardRefs.current[i];
    if (!card) return;
    gsap.to(card.querySelector(".card-img"), {
      scale: 1,
      duration: 0.7,
      ease: "power2.out",
    });
    gsap.to(card.querySelector(".card-content"), {
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
    gsap.to(card.querySelector(".card-arrow"), {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative py-28 md:py-40 px-6 md:px-16 lg:px-24 overflow-hidden border-t transition-colors duration-500"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── HEADER ── */}
        <div className="mb-16 md:mb-20">

          {/* Eyebrow */}
          <div ref={eyebrowRef} className="flex items-center gap-4 mb-8">
            <span
              className="block w-8 h-px"
              style={{ background: "var(--text-primary)", opacity: 0.2 }}
            />
            <span
              className="font-satoshi text-[9px] uppercase tracking-[0.55em] font-black"
              style={{ color: "var(--text-primary)", opacity: 0.45 }}
            >
              Selected Works
            </span>
          </div>

          {/* Heading + meta row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-10"
            style={{ borderColor: "var(--border-subtle)" }}>
            <h2
              ref={headingRef}
              className="font-satoshi font-black uppercase tracking-tighter leading-[0.88]"
              style={{
                fontSize: "clamp(3.2rem, 10vw, 9.5rem)",
                color: "var(--text-primary)",
                perspective: "800px",
              }}
            >
              Projects.
            </h2>

            <div ref={metaRef} className="flex flex-col items-start md:items-end gap-2 shrink-0 pb-1">
              <span
                className="font-satoshi font-black text-[9px] uppercase tracking-[0.5em]"
                style={{ color: "var(--text-primary)", opacity: 0.25 }}
              >
                0{projects.length} Works
              </span>
              <p
                className="font-sen text-sm max-w-xs text-right leading-relaxed hidden md:block"
                style={{ color: "var(--text-primary)", opacity: 0.45 }}
              >
                Bridging high-end UX with complex back-end logic.
              </p>
            </div>
          </div>
        </div>

        {/* ── ASYMMETRIC GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              onMouseEnter={() => handleCardEnter(i)}
              onMouseLeave={() => handleCardLeave(i)}
              className={`relative group overflow-hidden rounded-2xl cursor-pointer ${project.span} ${
                project.tall ? "md:row-span-2" : ""
              }`}
              style={{
                aspectRatio: project.tall ? "3/4" : "16/9",
                background: "var(--text-primary)",
                opacity: 0.97,
              }}
            >
              {/* Image layer — placeholder tinted bg, swap for next/image */}
              <div
                className="card-img absolute inset-0 w-full h-full"
                style={{
                  background: `linear-gradient(135deg,
                    hsl(${(i * 37) % 360}, 8%, 10%) 0%,
                    hsl(${(i * 37 + 60) % 360}, 5%, 16%) 100%)`,
                  transformOrigin: "center",
                }}
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 z-10 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
                  opacity: hoveredIdx === i ? 0.95 : 0.75,
                }}
              />

              {/* Content */}
              <div className="card-content absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-between">

                {/* Top — id + category */}
                <div className="flex items-center justify-between">
                  <span
                    className="font-satoshi font-black text-[9px] uppercase tracking-[0.5em]"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {project.id}
                  </span>
                  <span
                    className="font-satoshi text-[9px] uppercase tracking-[0.4em] px-3 py-1.5 rounded-full border"
                    style={{
                      borderColor: "rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Bottom — title + arrow */}
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p
                      className="font-sen text-xs leading-relaxed mb-3 max-w-50 transition-all duration-500"
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        opacity: hoveredIdx === i ? 1 : 0,
                        transform: hoveredIdx === i ? "translateY(0)" : "translateY(8px)",
                        transition: "opacity 0.4s ease, transform 0.4s ease",
                      }}
                    >
                      {project.desc}
                    </p>
                    <h3
                      className="font-satoshi font-black uppercase tracking-tight leading-none"
                      style={{
                        fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)",
                        color: "rgba(255,255,255,0.95)",
                      }}
                    >
                      {project.title}
                    </h3>
                  </div>

                  {/* Arrow button */}
                  <div
                    className="card-arrow shrink-0 w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-500"
                    style={{
                      borderColor: hoveredIdx === i ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
                      background: hoveredIdx === i ? "rgba(255,255,255,1)" : "transparent",
                      color: hoveredIdx === i ? "#000" : "rgba(255,255,255,0.8)",
                    }}
                  >
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA ROW ── */}
        <div
          className="mt-12 flex justify-end"
        >
          <button
            type="button"
            className="font-satoshi font-black text-sm uppercase tracking-widest px-8 py-4 rounded-full border group flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95"
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
            View All Work
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>

      </div>
    </section>
  );
}
"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export default function AboutManifesto() {
  const sectionRef   = useRef<HTMLElement>(null);
  const imageRef     = useRef<HTMLImageElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef   = useRef<HTMLDivElement>(null);
  const headingRef   = useRef<HTMLHeadingElement>(null);
  const para1Ref     = useRef<HTMLParagraphElement>(null);
  const para2Ref     = useRef<HTMLParagraphElement>(null);
  const taglineRef   = useRef<HTMLDivElement>(null);
  const credRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Image — constant zoom (buffer for the parallax below) + scroll scrub.
      // Set as a GSAP transform (not a CSS class) so it composes correctly
      // with the yPercent tween instead of being overwritten by it.
      gsap.set(imageRef.current, { scale: 1.15 });
      gsap.to(imageRef.current, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // 2. Image wrapper — clip-path reveal (curtain wipe downward)
      gsap.from(imageWrapRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.4,
        ease: "expo.out",
      });

      // 3. Eyebrow slide in
      gsap.from(eyebrowRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 74%" },
        x: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

      // 4. Heading — SplitText word tumble
      if (headingRef.current) {
        const split = new SplitText(headingRef.current, {
          type: "lines,words",
          linesClass: "about-line-clip",
        });
        document.querySelectorAll<HTMLElement>(".about-line-clip").forEach((el) => {
          el.style.overflow = "hidden";
          el.style.display  = "block";
        });
        gsap.from(split.words, {
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          yPercent: 115,
          rotateX: -12,
          opacity: 0,
          stagger: 0.05,
          duration: 1,
          ease: "expo.out",
          delay: 0.3,
        });
      }

      // 5. Paragraphs — line-by-line reveal
      [para1Ref, para2Ref].forEach((ref, i) => {
        if (!ref.current) return;
        const split = new SplitText(ref.current, {
          type: "lines",
          linesClass: "para-line-clip",
        });
        document.querySelectorAll<HTMLElement>(".para-line-clip").forEach((el) => {
          el.style.overflow = "hidden";
          el.style.display  = "block";
        });
        gsap.from(split.lines, {
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
          yPercent: 100,
          opacity: 0,
          stagger: 0.06,
          duration: 0.85,
          ease: "power4.out",
          delay: 0.45 + i * 0.15,
        });
      });

      // 6. Tagline wipe
      gsap.from(taglineRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 58%" },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "expo.out",
        delay: 0.3,
      });

      // 7. Credentials fade up
      gsap.from(credRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 55%" },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.5,
      });

      // 8. Horizontal scroll-scrub on heading for depth
      gsap.to(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "60% top",
          scrub: 2,
        },
        y: -30,
        ease: "none",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Image grayscale toggle via GSAP on hover
  const handleImgEnter = () => {
    gsap.to(imageRef.current, {
      filter: "grayscale(0%) brightness(100%)",
      duration: 0.8,
      ease: "power2.out",
    });
  };
  const handleImgLeave = () => {
    gsap.to(imageRef.current, {
      filter: "grayscale(100%) brightness(70%) contrast(1.2)",
      duration: 1,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 md:py-40 px-6 md:px-16 lg:px-24 overflow-hidden border-t transition-colors duration-500"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-150 h-150 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.018) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 gap-x-8 xl:gap-x-20 items-start">

          {/* ── LEFT: Portrait ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">

            {/* Image container with curtain reveal */}
            <div
              ref={imageWrapRef}
              className="relative overflow-hidden rounded-2xl"
              style={{
                aspectRatio: "4/5",
                background: "rgba(255,255,255,0.03)",
                clipPath: "inset(0% 0% 0% 0%)", // reset after animation
              }}
              onMouseEnter={handleImgEnter}
              onMouseLeave={handleImgLeave}
            >
              <Image
                ref={imageRef}
                src="/magero-portrait.jpg"
                alt="Magero Kyayi Joshua, founder of Soma and Synsify, portrait photograph"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                priority
                className="object-cover object-[center_25%]"
                style={{
                  filter: "grayscale(100%) brightness(70%) contrast(1.2)",
                  willChange: "transform",
                }}
              />

              {/* Bottom gradient */}
              <div
                className="absolute inset-0 z-10"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)",
                }}
              />

              {/* Corner label */}
              <div className="absolute top-5 left-5 z-20">
                <span
                  className="font-satoshi font-black text-[8px] uppercase tracking-[0.5em] px-3 py-1.5 rounded-full border"
                  style={{
                    borderColor: "rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.5)",
                    background: "rgba(0,0,0,0.3)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  Hover to reveal
                </span>
              </div>

              {/* Name overlay at bottom */}
              <div className="absolute bottom-6 left-6 z-20">
                <p
                  className="font-satoshi font-black uppercase tracking-tighter leading-none"
                  style={{
                    fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  Magero Kyayi
                </p>
                <p
                  className="font-sen text-xs mt-1"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Founder, Soma & Synsify · Uganda
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Content ── */}
          <div className="lg:col-span-7 flex flex-col gap-10 lg:pt-4">

            {/* Eyebrow */}
            <div ref={eyebrowRef} className="flex items-center gap-4">
              <span
                className="block w-8 h-px"
                style={{ background: "var(--text-primary)", opacity: 0.2 }}
              />
              <span
                className="font-satoshi text-[9px] uppercase tracking-[0.55em] font-black"
                style={{ color: "var(--text-primary)", opacity: 0.4 }}
              >
                The Philosophy
              </span>
            </div>

            {/* Heading */}
            <h2
              ref={headingRef}
              className="font-satoshi font-black leading-[0.9] tracking-tighter"
              style={{
                fontSize: "clamp(2.2rem, 5.5vw, 5rem)",
                color: "var(--text-primary)",
                perspective: "800px",
              }}
            >
              Good design is never
              <br />
              <span
                className="font-sen italic font-light"
                style={{ color: "var(--text-primary)", opacity: 0.25 }}
              >
                just about visuals.
              </span>
            </h2>

            {/* Divider */}
            <div
              ref={taglineRef}
              className="h-px w-full"
              style={{ background: "var(--border-subtle)" }}
            />

            {/* Body copy — capped at a readable measure independent of how
                wide the outer container gets on large screens. */}
            <div className="space-y-6 max-w-[65ch]">
              <p
                ref={para1Ref}
                className="font-sen leading-relaxed"
                style={{
                  fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                  color: "var(--text-primary)",
                  opacity: 0.7,
                }}
              >
                Consulting as an{" "}
                <strong style={{ color: "var(--text-primary)", opacity: 1, fontWeight: 700 }}>
                  Information Systems Consultant
                </strong>{" "}
                at MUA Insurance, a regulated insurer, gives me a rare
                vantage point: I see how African institutions actually
                operate under real compliance and infrastructure
                constraints, then build the systems that let them operate
                better.
              </p>

              <p
                ref={para2Ref}
                className="font-sen leading-relaxed"
                style={{
                  fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                  color: "var(--text-primary)",
                  opacity: 0.7,
                }}
              >
                I&apos;m the founder of{" "}
                <strong style={{ color: "var(--text-primary)", opacity: 1, fontWeight: 700 }}>
                  Soma
                </strong>{" "}
                and{" "}
                <strong style={{ color: "var(--text-primary)", opacity: 1, fontWeight: 700 }}>
                  Synsify
                </strong>
                , built on the same belief: the systems powering education,
                finance, and healthcare across East Africa deserve the same
                rigor as anywhere else.
              </p>
            </div>

            {/* Credentials strip */}
            <div
              ref={credRef}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <div className="flex flex-wrap gap-3">
                {["Founder, Soma & Synsify", "Information Systems Consultant, MUA", "BSc. Information Systems, Makerere University"].map((tag) => (
                  <span
                    key={tag}
                    className="font-satoshi font-black text-[9px] uppercase tracking-[0.4em] px-3 py-2 rounded-full border"
                    style={{
                      borderColor: "var(--border-subtle)",
                      color: "var(--text-primary)",
                      opacity: 0.55,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Availability dot */}
              <div className="flex items-center gap-2.5 shrink-0">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "#4ade80",
                    boxShadow: "0 0 8px #4ade80",
                    animation: "pulse-dot 2s ease-in-out infinite",
                  }}
                />
                <span
                  className="font-sen text-xs"
                  style={{ color: "var(--text-primary)", opacity: 0.4 }}
                >
                  Open to projects
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
}
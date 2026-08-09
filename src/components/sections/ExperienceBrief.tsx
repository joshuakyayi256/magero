"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
import { Github, Linkedin, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const skills = [
  "Testing & Debugging",
  "Agile Methodologies",
  "Web Standards",
  "Progressive Web Apps",
  "Design Systems",
  "Full-Stack Architecture",
  "Performance Optimisation",
  "System Design",
];

const stats = [
  { value: "4+",  label: "Years Building" },
  { value: "12+", label: "Systems Shipped" },
  { value: "3×",  label: "Avg. Growth" },
];

const socials = [
  { icon: <Github   size={16} />, label: "GitHub",   href: "https://github.com/joshuakyayi256" },
  { icon: <Linkedin size={16} />, label: "LinkedIn",  href: "https://ug.linkedin.com/in/magero-kyayi-joshua" },
];

export default function ExperienceBrief() {
  const sectionRef  = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const bioRef      = useRef<HTMLParagraphElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const pillsRef    = useRef<HTMLDivElement>(null);
  const socialsRef  = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Vertical divider line grows downward
      gsap.from(lineRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.2,
        ease: "expo.out",
      });

      // 2. Eyebrow slide in
      gsap.from(eyebrowRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 76%" },
        x: -24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // 3. Socials — stagger up
      const socialItems = socialsRef.current?.querySelectorAll(".social-item");
      if (socialItems?.length) {
        gsap.from(socialItems, {
          scrollTrigger: { trigger: sectionRef.current, start: "top 74%" },
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
        });
      }

      // 4. Stats — count-up feel with stagger
      const statItems = statsRef.current?.querySelectorAll(".stat-item");
      if (statItems?.length) {
        gsap.from(statItems, {
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "back.out(1.6)",
          delay: 0.15,
        });
      }

      // 5. Bio paragraph — SplitText line reveal
      if (bioRef.current) {
        const split = new SplitText(bioRef.current, {
          type: "lines",
          linesClass: "bio-line-clip",
        });
        document.querySelectorAll<HTMLElement>(".bio-line-clip").forEach((el) => {
          el.style.overflow = "hidden";
          el.style.display  = "block";
        });
        gsap.from(split.lines, {
          scrollTrigger: { trigger: sectionRef.current, start: "top 68%" },
          yPercent: 105,
          opacity: 0,
          stagger: 0.07,
          duration: 0.95,
          ease: "power4.out",
          delay: 0.1,
        });
      }

      // 6. Skill pills — stagger with back.out inertia
      const pills = pillsRef.current?.querySelectorAll(".skill-pill");
      if (pills?.length) {
        gsap.from(pills, {
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
          y: 22,
          opacity: 0,
          scale: 0.92,
          stagger: 0.05,
          duration: 0.7,
          ease: "back.out(1.5)",
          delay: 0.3,
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic hover for social icons
  const handleSocialMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el   = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const dx   = (e.clientX - rect.left - rect.width  / 2) * 0.3;
    const dy   = (e.clientY - rect.top  - rect.height / 2) * 0.3;
    gsap.to(el, { x: dx, y: dy, duration: 0.3, ease: "power2.out" });
  };
  const handleSocialLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.45)" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-16 lg:px-24 border-t overflow-hidden transition-colors duration-500"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 gap-x-8 xl:gap-x-16">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-4 flex flex-col gap-14">

            {/* Eyebrow */}
            <div ref={eyebrowRef} className="flex items-center gap-3">
              <span
                className="block w-6 h-px"
                style={{ background: "var(--text-primary)", opacity: 0.2 }}
              />
              <span
                className="font-satoshi text-[9px] uppercase tracking-[0.55em] font-black"
                style={{ color: "var(--text-primary)", opacity: 0.4 }}
              >
                Experience Brief
              </span>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 lg:grid-cols-1 gap-8 lg:gap-10 border-t lg:border-t-0"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              {stats.map(({ value, label }) => (
                <div key={label} className="stat-item pt-6 lg:pt-0 border-t lg:border-t" style={{ borderColor: "var(--border-subtle)" }}>
                  <p
                    className="font-satoshi font-black tracking-tighter leading-none mb-1"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {value}
                  </p>
                  <p
                    className="font-sen text-xs uppercase tracking-[0.4em]"
                    style={{ color: "var(--text-primary)", opacity: 0.4 }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div ref={socialsRef} className="space-y-3">
              <p
                className="font-satoshi text-[9px] uppercase tracking-[0.5em] font-black mb-5"
                style={{ color: "var(--text-primary)", opacity: 0.3 }}
              >
                Connect
              </p>
              {socials.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-item group flex items-center justify-between py-3 border-b transition-all duration-300"
                  style={{ borderColor: "var(--border-subtle)" }}
                  onMouseMove={handleSocialMove}
                  onMouseLeave={handleSocialLeave}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "color-mix(in srgb, var(--text-primary) 30%, transparent)";
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span style={{ color: "var(--text-primary)", opacity: 0.5 }}>
                      {icon}
                    </span>
                    <span
                      className="font-sen text-sm transition-all duration-300 group-hover:opacity-100"
                      style={{ color: "var(--text-primary)", opacity: 0.6 }}
                    >
                      {label}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={13}
                    className="transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: "var(--text-primary)", opacity: 0.2 }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* ── Vertical divider — desktop only ── */}
          <div className="hidden lg:flex lg:col-span-1 justify-center">
            <div
              ref={lineRef}
              className="w-px h-full min-h-80"
              style={{ background: "var(--border-subtle)" }}
            />
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="lg:col-span-7 flex flex-col gap-14">

            {/* Bio */}
            <p
              ref={bioRef}
              className="font-sen leading-relaxed"
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                color: "var(--text-primary)",
                opacity: 0.75,
              }}
            >
              My work spans the architecture of{" "}
              <strong style={{ color: "var(--text-primary)", opacity: 1, fontWeight: 700 }}>
                institutional-grade systems
              </strong>
              {" "}— role-based financial platforms, admissions infrastructure,
              data-driven dashboards — built for the conditions East African
              organisations actually operate in. I specialise in bridging
              institutional insight with{" "}
              <strong style={{ color: "var(--text-primary)", opacity: 1, fontWeight: 700 }}>
                production-grade engineering
              </strong>
              , so every system holds up under real-world use.
            </p>

            {/* Divider */}
            <div
              className="h-px w-full"
              style={{ background: "var(--border-subtle)" }}
            />

            {/* Skill pills */}
            <div>
              <p
                className="font-satoshi text-[9px] uppercase tracking-[0.5em] font-black mb-6"
                style={{ color: "var(--text-primary)", opacity: 0.3 }}
              >
                Disciplines
              </p>
              <div ref={pillsRef} className="flex flex-wrap gap-2.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-pill font-satoshi text-[10px] uppercase tracking-[0.4em] px-4 py-2.5 rounded-full border cursor-default transition-all duration-300"
                    style={{
                      borderColor: "var(--border-subtle)",
                      color: "var(--text-primary)",
                      opacity: 0.65,
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, { scale: 1.06, duration: 0.25, ease: "power2.out" });
                      (e.currentTarget as HTMLElement).style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" });
                      (e.currentTarget as HTMLElement).style.opacity = "0.65";
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
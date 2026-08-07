"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Menu, X } from "lucide-react";
import { getLenis } from "@/lib/lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const navLinks = [
  { label: "Works",     href: "#works" },
  { label: "About",     href: "#about" },
  { label: "Services",  href: "#services" },
  { label: "Tech",      href: "#techstack" },
  { label: "Contact",   href: "#contact" },
];

/* ── Pages with a hardcoded background (opt out of the light/dark toggle) ──
   need the navbar's own colors forced to match, since var(--text-primary)
   would otherwise be computed from a theme the page itself isn't following. */
function useNavVariant() {
  const pathname = usePathname();
  if (pathname === "/projects") return "dark" as const;
  if (pathname?.startsWith("/projects/")) return "light" as const;
  return "auto" as const;
}

export default function Navbar() {
  const navRef      = useRef<HTMLElement>(null);
  const logoRef     = useRef<HTMLAnchorElement>(null);
  const linksRef    = useRef<HTMLDivElement>(null);
  const badgeRef    = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [activeSection, setActive]  = useState("");
  const router   = useRouter();
  const pathname = usePathname();
  const variant  = useNavVariant();

  const isHome = pathname === "/";

  const text      = variant === "light" ? "#1d1d1f" : variant === "dark" ? "#ffffff" : "var(--text-primary)";
  const border    = variant === "light" ? "rgba(0,0,0,0.1)" : variant === "dark" ? "rgba(255,255,255,0.1)" : "var(--border-subtle)";
  const bgSolid   = variant === "light" ? "rgba(245,245,247,0.9)" : variant === "dark" ? "rgba(10,10,10,0.85)" : "color-mix(in srgb, var(--bg-primary) 85%, transparent)";
  const bgTint4   = variant === "light" ? "rgba(0,0,0,0.04)" : variant === "dark" ? "rgba(255,255,255,0.04)" : "color-mix(in srgb, var(--text-primary) 4%, transparent)";
  const bgTint8   = variant === "light" ? "rgba(0,0,0,0.08)" : variant === "dark" ? "rgba(255,255,255,0.08)" : "color-mix(in srgb, var(--text-primary) 8%, transparent)";

  // Off-homepage, there's no hero to breathe against — always show a solid backdrop.
  const showSolid = scrolled || !isHome;

  /* ── Entrance animation ──────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
      });

      tl.from(logoRef.current, {
        x: -20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      }, "-=0.5");

      const linkEls = linksRef.current?.querySelectorAll(".nav-link");
      if (linkEls?.length) {
        tl.from(linkEls, {
          y: -12,
          opacity: 0,
          stagger: 0.07,
          duration: 0.6,
          ease: "power3.out",
        }, "-=0.4");
      }

      tl.from(badgeRef.current, {
        x: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      }, "-=0.4");

    }, navRef);

    return () => ctx.revert();
  }, []);

  /* ── Scroll: shrink + active section (homepage only) ─ */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);

      if (!isHome) return;
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) {
          setActive(sections[i]);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  /* ── GSAP scroll-based navbar sizing ─────────────── */
  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      paddingTop:    scrolled ? "14px" : "28px",
      paddingBottom: scrolled ? "14px" : "28px",
      duration: 0.5,
      ease: "power2.out",
    });
  }, [scrolled]);

  /* ── Mobile menu open/close ──────────────────────── */
  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;
    if (menuOpen) {
      gsap.fromTo(menu,
        { yPercent: -8, opacity: 0, pointerEvents: "none" },
        { yPercent: 0, opacity: 1, pointerEvents: "auto", duration: 0.5, ease: "expo.out" }
      );
    } else {
      gsap.to(menu, {
        yPercent: -8,
        opacity: 0,
        pointerEvents: "none",
        duration: 0.35,
        ease: "power3.in",
      });
    }
  }, [menuOpen]);

  /* ── Smooth scroll handler — redirects home first when off-page ── */
  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    if (!isHome) {
      router.push(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    getLenis()?.scrollTo(el, { offset: -80, duration: 1.2 });
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 px-6 md:px-16 lg:px-24 transition-colors duration-500"
        style={{
          paddingTop: "28px",
          paddingBottom: "28px",
          background: showSolid ? bgSolid : "transparent",
          backdropFilter: showSolid ? "blur(16px) saturate(180%)" : "none",
          borderBottom: showSolid ? `1px solid ${border}` : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <Link
            ref={logoRef}
            href="/"
            className="font-satoshi font-black text-xl uppercase tracking-tighter transition-opacity duration-300 hover:opacity-70"
            style={{ color: text }}
          >
            Magero
            <span style={{ color: text, opacity: 0.3 }}>.</span>
          </Link>

          {/* Desktop links */}
          <div ref={linksRef} className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => {
              const id       = href.replace("#", "");
              const isActive = isHome && activeSection === id;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleNavClick(href)}
                  className="nav-link relative font-satoshi font-black text-[9px] uppercase tracking-[0.45em] px-4 py-2 rounded-full transition-all duration-300"
                  style={{
                    color: text,
                    opacity: isActive ? 1 : 0.45,
                    background: isActive ? bgTint8 : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.opacity = "0.85";
                    gsap.to(e.currentTarget, { y: -2, duration: 0.25, ease: "power2.out" });
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.opacity = "0.45";
                    gsap.to(e.currentTarget, { y: 0, duration: 0.4, ease: "elastic.out(1, 0.5)" });
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Right: badge + mobile trigger */}
          <div className="flex items-center gap-4">

            {/* Availability badge */}
            <div
              ref={badgeRef}
              className="hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-full border"
              style={{
                borderColor: border,
                background: bgTint4,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: "#4ade80",
                  boxShadow: "0 0 6px #4ade80",
                  animation: "nav-pulse 2s ease-in-out infinite",
                }}
              />
              <span
                className="font-satoshi font-black text-[8px] uppercase tracking-[0.45em]"
                style={{ color: text, opacity: 0.7 }}
              >
                Available
              </span>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300"
              style={{
                borderColor: border,
                color: text,
              }}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen
                ? <X size={15} strokeWidth={2} />
                : <Menu size={15} strokeWidth={2} />
              }
            </button>
          </div>

        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 left-0 w-full z-40 md:hidden"
        style={{
          opacity: 0,
          pointerEvents: "none",
          paddingTop: "100px",
          background: bgSolid,
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${border}`,
        }}
      >
        <div className="px-6 pb-10 space-y-1">
          {navLinks.map(({ label, href }, i) => (
            <button
              key={label}
              type="button"
              onClick={() => handleNavClick(href)}
              className="w-full text-left flex items-center justify-between py-5 border-b"
              style={{ borderColor: border }}
            >
              <div className="flex items-center gap-5">
                <span
                  className="font-satoshi font-black text-[10px] tabular-nums"
                  style={{ color: text, opacity: 0.25 }}
                >
                  0{i + 1}
                </span>
                <span
                  className="font-satoshi font-black text-2xl uppercase tracking-tighter"
                  style={{ color: text }}
                >
                  {label}
                </span>
              </div>
              <span style={{ color: text, opacity: 0.3 }}>↗</span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes nav-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }
      `}</style>
    </>
  );
}

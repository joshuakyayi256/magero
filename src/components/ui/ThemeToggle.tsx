"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function ThemeToggle() {
  const [theme,   setTheme]   = useState("dark");
  const [mounted, setMounted] = useState(false);
  const btnRef    = useRef<HTMLButtonElement>(null);
  const iconRef   = useRef<HTMLSpanElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);

  /* ── Init theme from storage ─────────────────────── */
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setMounted(true);
      const saved = localStorage.getItem("theme") || "dark";
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ── Entrance animation (once mounted) ──────────── */
  useEffect(() => {
    if (!mounted || !btnRef.current) return;
    gsap.from(btnRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(2)",
      delay: 1.2,
    });
  }, [mounted]);

  /* ── Toggle ──────────────────────────────────────── */
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    // 1. Ripple burst
    if (rippleRef.current) {
      gsap.fromTo(rippleRef.current,
        { scale: 0, opacity: 0.3 },
        { scale: 3.5, opacity: 0, duration: 0.6, ease: "power2.out" }
      );
    }

    // 2. Icon swap — spin out, update, spin in
    gsap.to(iconRef.current, {
      rotateY: 90,
      scale: 0.5,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        gsap.fromTo(iconRef.current,
          { rotateY: -90, scale: 0.5 },
          { rotateY: 0, scale: 1, duration: 0.35, ease: "back.out(2)" }
        );
      },
    });

    // 3. Button press feel
    gsap.to(btnRef.current, {
      scale: 0.88,
      duration: 0.12,
      ease: "power2.in",
      yoyo: true,
      repeat: 1,
    });
  };

  /* ── Magnetic hover ──────────────────────────────── */
  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn  = btnRef.current!;
    const rect = btn.getBoundingClientRect();
    const dx   = (e.clientX - rect.left - rect.width  / 2) * 0.35;
    const dy   = (e.clientY - rect.top  - rect.height / 2) * 0.35;
    gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: "power2.out" });
  };
  const handleLeave = () => {
    gsap.to(btnRef.current, {
      x: 0, y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.45)",
    });
  };

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      ref={btnRef}
      onClick={toggleTheme}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center overflow-hidden"
      style={{
        background: "var(--text-primary)",
        color: "var(--bg-primary)",
        border: "1px solid var(--border-subtle)",
        willChange: "transform",
      }}
    >
      {/* Ripple layer */}
      <span
        ref={rippleRef}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: "var(--bg-primary)", opacity: 0 }}
      />

      {/* Icon */}
      <span
        ref={iconRef}
        className="relative z-10 flex items-center justify-center"
        style={{ fontSize: "16px", lineHeight: 1 }}
      >
        {isDark ? "☀" : "☽"}
      </span>
    </button>
  );
}
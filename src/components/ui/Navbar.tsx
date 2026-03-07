"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-100 px-6 py-8 flex justify-between items-center mix-blend-difference">
      <Link href="/" className="font-satoshi font-black text-2xl uppercase tracking-tighter text-white">
        Magero<span className="text-white/40">.</span>
      </Link>

      <div className="flex gap-8 items-center">
        {["Works", "About", "Services", "Contact"].map((item) => (
          <Link 
            key={item} 
            href={`#${item.toLowerCase()}`}
            className="font-sen text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors hidden md:block"
          >
            {item}
          </Link>
        ))}
        
        {/* Subtle "Status" Indicator - Very Apple/Wirkus Style */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-sen text-[10px] uppercase tracking-widest text-white/80">Available for Projects</span>
        </div>
      </div>
    </nav>
  );
}
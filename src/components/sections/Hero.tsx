"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen w-full bg-[#0a0a0a] flex flex-col justify-center px-6 md:px-20 overflow-hidden">
      {/* Background Interactive Element (Inspired by Mendoza) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-sen text-white/50 uppercase tracking-widest text-sm mb-4 block"
        >
          Based in Central Province, Uganda
        </motion.span>

        <motion.h1 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-satoshi text-white text-[12vw] md:text-[8vw] leading-[0.85] font-black uppercase tracking-tighter"
        >
          Software <br /> 
          <span className="text-white/20">Engineer.</span>
        </motion.h1>

        <div className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <p className="font-sen text-white/60 max-w-md text-lg leading-relaxed">
            Architecting scalable systems like Soma and Envirian while crafting authority-based digital strategies for the modern web.
          </p>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="bg-white text-black px-8 py-4 font-satoshi font-bold rounded-full text-sm uppercase transition-all hover:bg-white/90"
          >
            Start a Project
          </motion.button>
        </div>
      </div>
    </section>
  );
}
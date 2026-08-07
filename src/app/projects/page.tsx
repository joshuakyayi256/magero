"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function ProjectsIndex() {
  return (
    <section className="bg-[#0a0a0a] min-h-screen py-32 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 flex items-end justify-between border-b border-white/10 pb-10">
          <h1 className="font-satoshi text-[10vw] md:text-[6vw] font-black uppercase tracking-tighter leading-none">
            Selected <br /><span className="text-white/20">Works.</span>
          </h1>
          <span className="font-sen text-white/40 uppercase tracking-widest text-xs hidden md:block">
            {projects.length} Case Studies / 2024—2026
          </span>
        </div>

        <div className="flex flex-col">
          {projects.map((project, i) => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              <motion.div
                whileHover={{ x: 20 }}
                className="group border-b border-white/5 py-10 flex flex-col md:flex-row md:items-center justify-between transition-all"
              >
                <div className="flex items-center gap-8">
                  <span className="font-satoshi text-white/20 text-xl font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-satoshi text-4xl md:text-6xl font-black uppercase text-white group-hover:text-white/60 transition-colors">
                    {project.title}
                  </h2>
                </div>

                <div className="flex items-center gap-12 mt-4 md:mt-0">
                  {project.comingSoon && (
                    <span className="font-sen text-[10px] uppercase tracking-[0.3em] text-white/25 border border-white/10 rounded-full px-3 py-1">
                      Coming Soon
                    </span>
                  )}
                  <span className="font-sen text-sm uppercase tracking-[0.2em] text-white/40">
                    {project.category}
                  </span>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import { use } from "react";
import { getProject } from "@/data/projects";
import { motion } from "framer-motion";
import { Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ProjectSlug({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = getProject(slug);

  if (!project) return notFound();

  return (
    <article className="bg-[#f5f5f7] text-black min-h-screen selection:bg-black selection:text-white">
      {/* 01. Navigation & Header */}
      <header className="pt-36 px-6 md:px-20">
        <Link href="/projects" className="group flex items-center gap-2 font-satoshi text-xs uppercase tracking-widest font-bold mb-12 opacity-40 hover:opacity-100 transition-opacity">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Works
        </Link>
        
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-satoshi text-[12vw] md:text-[8vw] font-black leading-[0.85] uppercase tracking-tighter mb-16"
          >
            {project.title}<span className="text-black/10">.</span>
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-black/5 pt-12">
            <div className="md:col-span-4 flex items-center gap-3">
              <Plus size={18} className="text-black/20" />
              <span className="font-satoshi text-sm uppercase tracking-widest font-bold">Introduction</span>
            </div>
            <div className="md:col-span-8">
              <p className="font-sen text-2xl md:text-3xl text-black/80 leading-tight">
                {project.description ?? project.teaser}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 02. Technical Metadata Table */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-black/5 py-12">
          {[
            { label: "Year", value: project.year ?? "TBD" },
            { label: "Category", value: project.category },
            { label: "Role", value: project.role ?? "TBD" },
            { label: "Stack", value: project.tools?.join(", ") ?? "TBD" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span className="font-satoshi text-[10px] uppercase tracking-[0.3em] text-black/30">{item.label}</span>
              <span className="font-sen text-lg font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 03. Problem/Solution Architecture */}
      <section className="pb-32 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          {project.comingSoon ? (
            <div className="border-t border-black/5 pt-12">
              <h3 className="font-satoshi font-black text-xs uppercase tracking-widest text-black/40 mb-4">
                Full Case Study
              </h3>
              <p className="font-sen text-xl text-black/70 leading-relaxed max-w-2xl">
                The detailed write-up for this project — challenge, approach, and outcome — is coming soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-20 items-start">
              <div className="md:col-span-6 space-y-8">
                <h3 className="font-satoshi font-black text-xs uppercase tracking-widest text-black/40 border-b border-black/5 pb-4">01 // The Challenge</h3>
                <p className="font-sen text-xl text-black/70 leading-relaxed">{project.challenge}</p>
              </div>
              <div className="md:col-span-6 space-y-8">
                <h3 className="font-satoshi font-black text-xs uppercase tracking-widest text-black/40 border-b border-black/5 pb-4">02 // The Solution</h3>
                <p className="font-sen text-xl text-black/70 leading-relaxed">{project.solution}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
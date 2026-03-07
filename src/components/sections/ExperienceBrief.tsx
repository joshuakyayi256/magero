"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Globe, Plus } from "lucide-react";

const skills = [
  "Testing and Debugging",
  "Agile Methodologies",
  "Web Standards",
  "Progressive Web Apps",
  "Design Systems",
  "Full-Stack Architecture"
];

export default function ExperienceBrief() {
  return (
    <section className="bg-[#0a0a0a] text-white py-24 px-6 md:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Left Column: Socials & "Meta" Info */}
        <div className="md:col-span-4 flex flex-col justify-between">
          <div>
            <h3 className="font-satoshi text-sm uppercase tracking-[0.2em] text-white/40 mb-8 flex items-center gap-2">
              <Plus size={14} /> Connect
            </h3>
            <div className="flex gap-4">
              {[
                { icon: <Github size={20} />, link: "#" },
                { icon: <Linkedin size={20} />, link: "#" },
                { icon: <Globe size={20} />, link: "#" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.1)" }}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-colors hover:border-white/40"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Bio & Skills */}
        <div className="md:col-span-8">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sen text-xl md:text-2xl leading-relaxed text-white/80 mb-16"
          >
            My work spans the architecture of <span className="text-white font-medium">scalable web platforms</span>, 
            enterprise-grade systems, and data-driven dashboards. I specialize in bridging the gap between 
            high-end UX design and seamless <span className="text-white font-medium">back-end integration</span>, 
            ensuring every product is as performant as it is visually authoritative.
          </motion.p>

          {/* Skill Pills - Redesigned for Premium Look */}
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="px-6 py-3 rounded-full border border-white/5 bg-white/2 font-satoshi text-xs uppercase tracking-widest text-white/60 hover:border-white/20 hover:text-white transition-all cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
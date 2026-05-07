"use client";

import { motion } from "framer-motion";
import { Monitor, Server, Database, Cloud, Cpu } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import { skillCategories } from "@/data/skills";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Server,
  Database,
  Cloud,
  Cpu,
};

export default function AboutSkills() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          badge="Skills"
          title="Technical"
          highlight="Expertise"
          description="Technologies I work with daily to build reliable, performant applications."
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, catIndex) => {
            const Icon = iconMap[category.icon] || Monitor;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: catIndex * 0.1 }}
                className="p-5 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 hover:border-zinc-700/60 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-zinc-200">{category.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2.5 py-1 rounded-lg bg-zinc-800/80 text-zinc-400 border border-zinc-700/40 hover:text-zinc-200 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap, Award } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import { timeline, stats } from "@/data/experience";
import { skillCategories } from "@/data/skills";
import { Monitor, Server, Database, Cloud, Cpu } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Server,
  Database,
  Cloud,
  Cpu,
};

export default function ResumeClient() {
  return (
    <section className="pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
              Resume
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100">
              Usama <span className="gradient-text">Adil</span>
            </h1>
            <p className="text-zinc-400 mt-2 text-lg">Full Stack Software Engineer</p>
          </div>
          <a
            href="/assets/Muhammad Usama Adil (1).pdf"
            download
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl border border-zinc-800/50 bg-zinc-900/30 text-center"
            >
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-zinc-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mb-14">
          <SectionHeading
            badge="Experience"
            title="Work"
            highlight="History"
            centered={false}
            className="mb-8"
          />
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-zinc-800" />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative flex gap-8 pl-14"
                >
                  <div className="absolute left-3.5 top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-zinc-950 -translate-x-1/2">
                    {item.type === "work" && (
                      <Briefcase className="w-2 h-2 absolute -top-0.5 -left-0.5 text-white" />
                    )}
                    {item.type === "education" && (
                      <GraduationCap className="w-2 h-2 absolute -top-0.5 -left-0.5 text-white" />
                    )}
                    {item.type === "milestone" && (
                      <Award className="w-2 h-2 absolute -top-0.5 -left-0.5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-mono text-zinc-500">{item.year}</span>
                    <h3 className="text-base font-semibold text-zinc-100 mt-0.5">{item.title}</h3>
                    <p className="text-zinc-400 text-sm mt-1.5 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <SectionHeading
            badge="Skills"
            title="Technical"
            highlight="Competencies"
            centered={false}
            className="mb-8"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillCategories.map((category, catIndex) => {
              const Icon = iconMap[category.icon] || Monitor;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.08 }}
                  className="p-5 rounded-xl border border-zinc-800/50 bg-zinc-900/30"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-semibold text-zinc-200">{category.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2 py-1 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/40"
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
      </div>
    </section>
  );
}

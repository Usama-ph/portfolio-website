"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/section-heading";
import { techStack } from "@/data/skills";

const categoryColors: Record<string, string> = {
  Frontend: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-300",
  Backend: "from-violet-500/20 to-violet-600/10 border-violet-500/30 text-violet-300",
  Database: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-300",
  DevOps: "from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-300",
  Integration: "from-pink-500/20 to-pink-600/10 border-pink-500/30 text-pink-300",
  AI: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-300",
};

export default function TechStackSection() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          badge="Tech Stack"
          title="Tools I"
          highlight="Build With"
          description="A carefully chosen set of technologies I use to build fast, scalable, and maintainable products."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {techStack.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              whileHover={{ scale: 1.08, y: -2 }}
              className={`px-4 py-2 rounded-xl bg-gradient-to-br border text-sm font-medium transition-all cursor-default ${
                categoryColors[item.category] ||
                "from-zinc-700/20 to-zinc-800/10 border-zinc-700/30 text-zinc-300"
              }`}
            >
              {item.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

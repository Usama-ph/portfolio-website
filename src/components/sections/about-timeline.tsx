"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/section-heading";
import { timeline } from "@/data/experience";
import { cn } from "@/lib/utils";

const typeColors = {
  work: "bg-blue-500",
  milestone: "bg-violet-500",
  education: "bg-emerald-500",
};

export default function AboutTimeline() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          badge="Journey"
          title="My Development"
          highlight="Timeline"
          description="How I got here — the key milestones that shaped my engineering career."
        />

        <div className="mt-16 relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-zinc-800" />

          <div className="space-y-10">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative flex gap-8 pl-16"
              >
                <div
                  className={cn(
                    "absolute left-4 top-1.5 w-4 h-4 rounded-full border-2 border-zinc-950 -translate-x-1/2",
                    typeColors[item.type]
                  )}
                />

                <div className="flex-1 pb-2">
                  <div className="text-xs font-mono text-zinc-500 mb-1">{item.year}</div>
                  <h3 className="text-lg font-semibold text-zinc-100 mb-2">{item.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

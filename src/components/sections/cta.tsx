"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden border border-zinc-700/50 bg-zinc-900/50 p-12 text-center"
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(59,130,246,0.2) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Open to new projects
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-100 mb-6">
              Let&apos;s Build Something{" "}
              <span className="gradient-text">Great Together</span>
            </h2>

            <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Have an idea, a product to build, or a team that needs a senior engineer? I&apos;d love to hear about it.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
              >
                Hire Me
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://cal.com/usamaadil"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-zinc-800/60 text-zinc-200 font-semibold border border-zinc-700/50 hover:bg-zinc-700/60 transition-all hover:scale-105"
              >
                <Calendar className="w-4 h-4" />
                Schedule a Call
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

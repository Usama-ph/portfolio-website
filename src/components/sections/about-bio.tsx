"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Code2, Cpu, Layers } from "lucide-react";

const highlights = [
  { icon: Code2, text: "TypeScript & Python specialist" },
  { icon: Layers, text: "Full-stack architecture expert" },
  { icon: Cpu, text: "AI & automation integrations" },
  { icon: MapPin, text: "Remote-first, worldwide clients" },
];

export default function AboutBio() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              About Me
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6 leading-tight">
              Building Products
              <br />
              <span className="gradient-text">People Actually Use</span>
            </h1>
            <div className="space-y-4 text-zinc-400 text-lg leading-relaxed">
              <p>
                I&apos;m a full-stack software engineer with 3+ years of experience building
                production-grade web applications, APIs, and AI-powered tools for startups and
                businesses worldwide.
              </p>
              <p>
                My focus is on building clean, scalable systems with TypeScript on both the frontend
                (React/Next.js) and backend (NestJS). I care deeply about code quality, developer
                experience, and shipping products that solve real problems.
              </p>
              <p>
                Beyond web development, I&apos;ve developed expertise in AI integrations — building
                chatbots, content generation systems, and automation tools using OpenAI APIs and
                LangChain.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden border border-zinc-700/50 shadow-2xl">
                <Image
                  src="/git-profile.png"
                  alt="Usama Adil"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 blur-xl -z-10" />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-zinc-300 text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

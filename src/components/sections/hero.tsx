"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Sparkles, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/social-icons";

const floatingBadges = [
  { label: "TypeScript", x: "5%", y: "20%", delay: 0 },
  { label: "React", x: "88%", y: "15%", delay: 0.3 },
  { label: "NestJS", x: "92%", y: "70%", delay: 0.6 },
  { label: "PostgreSQL", x: "2%", y: "75%", delay: 0.9 },
  { label: "OpenAI", x: "80%", y: "40%", delay: 1.2 },
  { label: "Docker", x: "8%", y: "45%", delay: 0.5 },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="hidden lg:block">
        {floatingBadges.map((badge) => (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: badge.delay + 1, duration: 0.4 }}
            className="absolute z-10"
            style={{ left: badge.x, top: badge.y }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3 + badge.delay, repeat: Infinity, ease: "easeInOut" }}
              className="px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-700/50 backdrop-blur-sm text-xs text-zinc-400 font-medium shadow-lg"
            >
              {badge.label}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          Available for freelance projects
        </motion.div> */}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-zinc-100">Full Stack Engineer</span>
          <br />
          <span className="gradient-text">Building Modern Web</span>
          <br />
          <span className="text-zinc-100">&amp; AI Products</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          3+ years building scalable applications, CMS systems, and AI-powered tools.
          Specializing in TypeScript, React, NestJS, and Python.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <Link
            href="/projects"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            View Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800/60 text-zinc-200 font-medium border border-zinc-700/50 hover:bg-zinc-700/60 hover:border-zinc-600/50 transition-all hover:scale-105"
          >
            <Mail className="w-4 h-4" />
            Contact Me
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="https://github.com/usama-ph"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-zinc-800/60 border border-zinc-700/50 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all hover:scale-110"
            aria-label="GitHub"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/usama-adil-77b223239/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-zinc-800/60 border border-zinc-700/50 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all hover:scale-110"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/part_time_gamer.2001/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-zinc-800/60 border border-zinc-700/50 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all hover:scale-110"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>
          <a
            href="mailto:adilusama16@gmail.com"
            className="w-10 h-10 rounded-xl bg-zinc-800/60 border border-zinc-700/50 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all hover:scale-110"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 mx-auto max-w-lg"
        >
          <div className="rounded-xl bg-zinc-900/80 border border-zinc-700/50 overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/50 bg-zinc-900/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex items-center gap-1.5 ml-2">
                <Terminal className="w-3 h-3 text-zinc-500" />
                <span className="text-zinc-500 text-xs">terminal</span>
              </div>
            </div>
            <div className="p-4 font-mono text-sm text-left">
              <p className="text-zinc-500">
                <span className="text-green-400">usama@dev</span>
                <span className="text-blue-400"> ~/portfolio</span>
                <span className="text-zinc-400"> $ </span>
                <span className="text-zinc-100">whoami</span>
              </p>
              <div className="mt-2 space-y-1">
                <p className="text-zinc-400">
                  <span className="text-violet-400">name:</span>{" "}
                  <span className="text-zinc-200">Usama Adil</span>
                </p>
                <p className="text-zinc-400">
                  <span className="text-violet-400">role:</span>{" "}
                  <span className="text-zinc-200">Full Stack Engineer</span>
                </p>
                <p className="text-zinc-400">
                  <span className="text-violet-400">stack:</span>{" "}
                  <span className="text-zinc-200">TypeScript · NestJS · React · AI</span>
                </p>
                <p className="text-zinc-400">
                  <span className="text-violet-400">status:</span>{" "}
                  <span className="text-green-400">available_for_hire ✓</span>
                </p>
              </div>
              <p className="mt-2 text-zinc-500">
                <span className="text-green-400">usama@dev</span>
                <span className="text-blue-400"> ~/portfolio</span>
                <span className="text-zinc-400"> $ </span>
                <span className="animate-pulse">█</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

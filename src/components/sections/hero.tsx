"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/social-icons";

const floatingBadges = [
  { label: "TypeScript", x: "3%", y: "18%", delay: 0 },
  { label: "React", x: "87%", y: "14%", delay: 0.3 },
  { label: "NestJS", x: "91%", y: "68%", delay: 0.6 },
  { label: "PostgreSQL", x: "1%", y: "72%", delay: 0.9 },
  { label: "OpenAI", x: "79%", y: "38%", delay: 1.2 },
  { label: "Docker", x: "6%", y: "44%", delay: 0.5 },
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

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
        {/* Two-column layout on lg+, stacked on smaller screens */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Profile image column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex-shrink-0 flex flex-col items-center gap-4"
          >
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 via-violet-500/20 to-transparent blur-2xl scale-110" />
              {/* Gradient ring */}
              <div className="relative p-[3px] rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-zinc-700 shadow-2xl shadow-blue-500/20">
                <div className="rounded-full overflow-hidden bg-zinc-900">
                  <Image
                    src="/git-profile.png"
                    alt="Usama Adil"
                    width={220}
                    height={220}
                    className="rounded-full object-cover w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] lg:w-[220px] lg:h-[220px]"
                    priority
                  />
                </div>
              </div>
              {/* Available badge */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-700/60 shadow-lg text-xs font-medium text-zinc-300"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_2px_rgba(74,222,128,0.4)]" />
                Available for hire
              </motion.div>
            </div>
          </motion.div>

          {/* Text content column */}
          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5"
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
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-zinc-400 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              3+ years building scalable applications, CMS systems, and AI-powered tools.
              Specializing in TypeScript, React, NestJS, and Python.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8"
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
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-4"
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
          </div>
        </div>

        {/* Terminal card — full width below */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-14 mx-auto max-w-lg"
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

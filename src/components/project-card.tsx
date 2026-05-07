"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, ChevronRight, Layers } from "lucide-react";
import { GithubIcon } from "@/components/social-icons";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index?: number;
};

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="group relative rounded-2xl border border-zinc-800/50 bg-zinc-900/40 hover:border-zinc-700/60 transition-all duration-300 overflow-hidden cursor-pointer"
        onClick={() => setModalOpen(true)}
        whileHover={{ y: -4 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative h-44 bg-zinc-800/50 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Layers className="w-12 h-12 text-zinc-600" />
          </div>
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `linear-gradient(135deg, ${
                project.category.includes("AI") ? "rgba(59,130,246,0.3)" : "rgba(139,92,246,0.3)"
              } 0%, transparent 60%)`,
            }}
          />
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
            {project.category.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="text-xs px-2 py-0.5 rounded-full bg-zinc-900/80 text-zinc-300 border border-zinc-700/50"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-semibold text-zinc-100 mb-2 group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/40"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-xs px-2 py-1 rounded-md bg-zinc-800/80 text-zinc-500 border border-zinc-700/40">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium">
              View Details <ChevronRight className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-zinc-500 hover:text-zinc-200 transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-zinc-500 hover:text-zinc-200 transition-colors"
                  aria-label="Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-2xl bg-zinc-900 border border-zinc-700/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-52 bg-zinc-800 overflow-hidden rounded-t-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Layers className="w-16 h-16 text-zinc-600" />
                </div>
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    background: `linear-gradient(135deg, ${
                      project.category.includes("AI")
                        ? "rgba(59,130,246,0.4)"
                        : "rgba(139,92,246,0.4)"
                    } 0%, transparent 70%)`,
                  }}
                />
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-900/80 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.category.map((cat) => (
                    <span
                      key={cat}
                      className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <h2 className="text-2xl font-bold text-zinc-100 mb-3">{project.title}</h2>
                <p className="text-zinc-400 leading-relaxed mb-6">{project.longDescription}</p>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">
                    Key Highlights
                  </h3>
                  <ul className="space-y-2">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">
                    Challenges Solved
                  </h3>
                  <ul className="space-y-2">
                    {project.challenges.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-sm text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-sm px-3 py-1 rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 text-zinc-200 text-sm font-medium hover:bg-zinc-700 transition-colors border border-zinc-700/50"
                    >
                      <GithubIcon className="w-4 h-4" />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

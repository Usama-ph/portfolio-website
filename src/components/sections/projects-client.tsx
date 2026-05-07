"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/section-heading";
import ProjectCard from "@/components/project-card";
import { projects } from "@/data/projects";

const categories = ["All", "AI", "Full Stack", "CMS", "APIs", "SaaS", "Freelance"];

export default function ProjectsClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category.includes(activeCategory));

  return (
    <section className="pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="Portfolio"
          title="All"
          highlight="Projects"
          description="A complete collection of systems and products I've designed and built."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:text-zinc-200 hover:bg-zinc-700/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-20 text-center text-zinc-500">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  );
}

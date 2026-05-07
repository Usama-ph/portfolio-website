"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import ProjectCard from "@/components/project-card";
import { featuredProjects } from "@/data/projects";

export default function FeaturedProjectsSection() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="Projects"
          title="Featured"
          highlight="Work"
          description="A selection of products and systems I've built — from AI platforms to full-stack applications."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800/60 text-zinc-300 font-medium border border-zinc-700/50 hover:bg-zinc-700/60 hover:text-white transition-all group"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

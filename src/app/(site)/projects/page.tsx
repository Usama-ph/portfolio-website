import type { Metadata } from "next";
import AnimatedBackground from "@/components/animated-background";
import ProjectsClient from "@/components/sections/projects-client";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore projects built by Usama Adil — AI platforms, CMS systems, SaaS products, and full-stack applications.",
};

export default function ProjectsPage() {
  return (
    <>
      <AnimatedBackground />
      <ProjectsClient />
    </>
  );
}

import type { Metadata } from "next";
import AnimatedBackground from "@/components/animated-background";
import AboutBio from "@/components/sections/about-bio";
import AboutTimeline from "@/components/sections/about-timeline";
import AboutSkills from "@/components/sections/about-skills";
import CtaSection from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Usama Adil — Full Stack Engineer specializing in TypeScript, React, NestJS, and AI integrations.",
};

export default function AboutPage() {
  return (
    <>
      <AnimatedBackground />
      <div className="pt-24">
        <AboutBio />
        <AboutTimeline />
        <AboutSkills />
        <CtaSection />
      </div>
    </>
  );
}

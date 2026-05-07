import type { Metadata } from "next";
import AnimatedBackground from "@/components/animated-background";
import ResumeClient from "@/components/sections/resume-client";

export const metadata: Metadata = {
  title: "Resume",
  description: "Usama Adil's resume — Full Stack Engineer with 3+ years of experience.",
};

export default function ResumePage() {
  return (
    <>
      <AnimatedBackground />
      <ResumeClient />
    </>
  );
}

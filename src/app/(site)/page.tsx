import AnimatedBackground from "@/components/animated-background";
import HeroSection from "@/components/sections/hero";
import TechStackSection from "@/components/sections/tech-stack";
import FeaturedProjectsSection from "@/components/sections/featured-projects";
import StatsSection from "@/components/sections/stats";
import TestimonialsSection from "@/components/sections/testimonials";
import CtaSection from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <HeroSection />
      <TechStackSection />
      <FeaturedProjectsSection />
      <StatsSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}

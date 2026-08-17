import type { Metadata } from "next";
import AnimatedBackground from "@/components/animated-background";
import ContactClient from "@/components/sections/contact-client";
import ElevenLabsVoiceAgent from "@/components/elevenlabs-voice-agent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Usama Adil. Let's discuss your project, idea, or collaboration opportunity.",
};

export default function ContactPage() {
  return (
    <>
      <AnimatedBackground />
      <ContactClient />
      <ElevenLabsVoiceAgent />
    </>
  );
}

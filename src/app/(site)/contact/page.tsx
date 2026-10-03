import type { Metadata } from "next";
import AnimatedBackground from "@/components/animated-background";
import ContactClient from "@/components/sections/contact-client";
import ElevenLabsVoiceAgent from "@/components/elevenlabs-voice-agent";
import { parseElevenLabsAgentId } from "@/lib/elevenlabs";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Usama Adil. Let's discuss your project, idea, or collaboration opportunity.",
};

export default function ContactPage() {
  const agentId = parseElevenLabsAgentId(
    process.env.NEXT_ELEVENLABS_AGENT_URL,
  );

  return (
    <>
      <AnimatedBackground />
      <ContactClient />
      <ElevenLabsVoiceAgent agentId={agentId} />
    </>
  );
}

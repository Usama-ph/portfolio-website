"use client";

import Script from "next/script";
import { parseElevenLabsAgentId } from "@/lib/elevenlabs";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { "agent-id"?: string },
        HTMLElement
      >;
    }
  }
}

const WIDGET_SCRIPT =
  "https://unpkg.com/@elevenlabs/convai-widget-embed";

export default function ElevenLabsVoiceAgent() {
  const agentId = parseElevenLabsAgentId(
    process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_URL,
  );

  if (!agentId) return null;

  return (
    <>
      <Script src={WIDGET_SCRIPT} strategy="lazyOnload" />
      <elevenlabs-convai agent-id={agentId} />
    </>
  );
}

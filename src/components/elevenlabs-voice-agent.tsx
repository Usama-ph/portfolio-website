"use client";

import Script from "next/script";

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

export default function ElevenLabsVoiceAgent({
  agentId,
}: {
  agentId: string | null;
}) {
  if (!agentId) return null;

  return (
    <>
      <Script src={WIDGET_SCRIPT} strategy="lazyOnload" />
      <elevenlabs-convai agent-id={agentId} />
    </>
  );
}

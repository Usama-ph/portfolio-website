import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  mapTranscriptionToLead,
  verifyElevenLabsSignature,
} from "@/lib/elevenlabs-webhook";

export async function POST(req: NextRequest) {
  const secret = process.env.ELEVENLABS_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 },
    );
  }

  const rawBody = await req.text();
  const signature = req.headers.get("elevenlabs-signature");

  if (!verifyElevenLabsSignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const type =
    payload &&
    typeof payload === "object" &&
    "type" in payload &&
    typeof (payload as { type: unknown }).type === "string"
      ? (payload as { type: string }).type
      : null;

  if (type && type !== "post_call_transcription") {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const lead = mapTranscriptionToLead(payload);
  if (!lead) {
    return NextResponse.json(
      { error: "Missing conversation_id or invalid payload" },
      { status: 400 },
    );
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("leads").upsert(lead, {
      onConflict: "conversation_id",
    });

    if (error) {
      console.error("leads upsert failed:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("webhook handler error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

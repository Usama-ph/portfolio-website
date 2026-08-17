import { createHmac, timingSafeEqual } from "crypto";

export type LeadInsert = {
  conversation_id: string;
  agent_id: string | null;
  full_name: string | null;
  contact_number: string | null;
  interest_type: string | null;
  field_career_interest: string | null;
  preferred_country_region: string | null;
  education_level: string | null;
  transcript_summary: string | null;
  raw_analysis: unknown;
  called_at: string | null;
};

const DATA_FIELDS = [
  "full_name",
  "contact_number",
  "interest_type",
  "field_career_interest",
  "preferred_country_region",
  "education_level",
] as const;

type DataField = (typeof DATA_FIELDS)[number];

function extractCollectionValue(entry: unknown): string | null {
  if (entry == null) return null;
  if (typeof entry === "string") {
    const t = entry.trim();
    return t.length ? t : null;
  }
  if (typeof entry === "object" && "value" in entry) {
    const v = (entry as { value: unknown }).value;
    if (v == null) return null;
    if (typeof v === "string") {
      const t = v.trim();
      return t.length ? t : null;
    }
    return String(v);
  }
  return null;
}

export function verifyElevenLabsSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
): boolean {
  if (!signatureHeader || !secret) return false;

  const parts = Object.fromEntries(
    signatureHeader.split(",").map((p) => {
      const [k, ...rest] = p.trim().split("=");
      return [k, rest.join("=")];
    }),
  ) as Record<string, string>;

  const timestamp = parts.t;
  const signature = parts.v0;
  if (!timestamp || !signature) return false;

  const ts = Number(timestamp);
  if (!Number.isFinite(ts)) return false;

  const skewMs = Math.abs(Date.now() - ts * 1000);
  if (skewMs > 30 * 60 * 1000) return false;

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");

  try {
    const a = Buffer.from(expected, "utf8");
    const b = Buffer.from(signature, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

export function mapTranscriptionToLead(payload: unknown): LeadInsert | null {
  const root = asRecord(payload);
  if (!root) return null;

  const data = asRecord(root.data) ?? root;
  const conversationId =
    (typeof data.conversation_id === "string" && data.conversation_id) ||
    (typeof root.conversation_id === "string" && root.conversation_id) ||
    null;

  if (!conversationId) return null;

  const analysis = asRecord(data.analysis);
  const results =
    asRecord(analysis?.data_collection_results) ??
    asRecord(data.data_collection_results) ??
    {};

  const fields = {} as Record<DataField, string | null>;
  for (const key of DATA_FIELDS) {
    fields[key] = extractCollectionValue(results[key]);
  }

  const metadata = asRecord(data.metadata);
  const startUnix =
    typeof metadata?.start_time_unix_secs === "number"
      ? metadata.start_time_unix_secs
      : null;

  return {
    conversation_id: conversationId,
    agent_id: typeof data.agent_id === "string" ? data.agent_id : null,
    ...fields,
    transcript_summary:
      typeof analysis?.transcript_summary === "string"
        ? analysis.transcript_summary
        : null,
    raw_analysis: analysis ?? null,
    called_at: startUnix ? new Date(startUnix * 1000).toISOString() : null,
  };
}

export type Lead = {
  id: string;
  conversation_id: string;
  agent_id: string | null;
  full_name: string | null;
  contact_number: string | null;
  interest_type: string | null;
  field_career_interest: string | null;
  preferred_country_region: string | null;
  education_level: string | null;
  transcript_summary: string | null;
  called_at: string | null;
  created_at: string;
};

export function formatLeadDate(value: string | null | undefined) {
  if (!value) return "—";
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

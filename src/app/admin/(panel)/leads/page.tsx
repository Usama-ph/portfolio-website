import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import LeadsTable from "@/components/admin/leads-table";
import type { Lead } from "@/lib/leads";

export const metadata: Metadata = {
  title: "Admin Leads",
  robots: { index: false, follow: false },
};

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select(
      "id, conversation_id, agent_id, full_name, contact_number, interest_type, field_career_interest, preferred_country_region, education_level, transcript_summary, called_at, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(200);

  const leads = (data ?? []) as Lead[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-50">Leads</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Data captured by the Eleven Labs voice agent.
        </p>
      </div>

      {error && (
        <p className="rounded-lg border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-300">
          Failed to load leads: {error.message}
        </p>
      )}

      <LeadsTable leads={leads} />
    </div>
  );
}

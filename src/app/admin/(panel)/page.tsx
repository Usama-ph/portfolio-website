import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import StatsCards from "@/components/admin/stats-cards";
import LeadsTable from "@/components/admin/leads-table";
import type { Lead } from "@/lib/leads";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

function startOfUtcDay(d = new Date()) {
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
  ).toISOString();
}

function startOfUtcWeek(d = new Date()) {
  const day = d.getUTCDay(); // 0 Sun
  const diff = (day + 6) % 7; // Monday-start week
  const monday = new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - diff),
  );
  return monday.toISOString();
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const todayIso = startOfUtcDay();
  const weekIso = startOfUtcWeek();

  const [totalRes, todayRes, weekRes, recentRes] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayIso),
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .gte("created_at", weekIso),
    supabase
      .from("leads")
      .select(
        "id, conversation_id, agent_id, full_name, contact_number, interest_type, field_career_interest, preferred_country_region, education_level, transcript_summary, called_at, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const recent = (recentRes.data ?? []) as Lead[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-50">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Overview of voice-agent leads (UTC day / week).
        </p>
      </div>

      <StatsCards
        stats={[
          { label: "Total leads", value: totalRes.count ?? 0 },
          { label: "Today", value: todayRes.count ?? 0 },
          { label: "This week", value: weekRes.count ?? 0 },
        ]}
      />

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-zinc-400">Recent leads</h2>
        <LeadsTable leads={recent} />
      </section>
    </div>
  );
}

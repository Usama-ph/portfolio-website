import { type Lead, formatLeadDate } from "@/lib/leads";

function cell(value: string | null) {
  return value?.trim() ? value : "—";
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-800 px-6 py-12 text-center text-sm text-zinc-500">
        No leads yet. Complete a voice call or wait for the webhook.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-zinc-800 bg-zinc-900/80 text-zinc-500">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Contact</th>
            <th className="px-4 py-3 font-medium">Interest</th>
            <th className="px-4 py-3 font-medium">Field / career</th>
            <th className="px-4 py-3 font-medium">Country / region</th>
            <th className="px-4 py-3 font-medium">Education</th>
            <th className="px-4 py-3 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="border-b border-zinc-800/80 last:border-0 hover:bg-zinc-900/40"
            >
              <td className="px-4 py-3 text-zinc-100">
                {cell(lead.full_name)}
              </td>
              <td className="px-4 py-3 text-zinc-300">
                {cell(lead.contact_number)}
              </td>
              <td className="px-4 py-3 text-zinc-300">
                {cell(lead.interest_type)}
              </td>
              <td className="px-4 py-3 text-zinc-300">
                {cell(lead.field_career_interest)}
              </td>
              <td className="px-4 py-3 text-zinc-300">
                {cell(lead.preferred_country_region)}
              </td>
              <td className="px-4 py-3 text-zinc-300">
                {cell(lead.education_level)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-zinc-400">
                {formatLeadDate(lead.called_at ?? lead.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

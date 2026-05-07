import SectionHeading from "@/components/section-heading";
import StatCard from "@/components/stats-card";
import { stats } from "@/data/experience";

export default function StatsSection() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          badge="By the Numbers"
          title="Experience &"
          highlight="Impact"
          description="Real results from real projects, built with intention and shipped with care."
        />

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              description={stat.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

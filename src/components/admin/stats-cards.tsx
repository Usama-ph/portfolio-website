type Stat = {
  label: string;
  value: number;
};

export default function StatsCards({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-4"
        >
          <p className="text-sm text-zinc-500">{stat.label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}

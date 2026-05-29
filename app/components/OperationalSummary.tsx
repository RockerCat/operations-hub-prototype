import type { SummaryStat } from "@/app/lib/mockData"

function StatCard({ stat }: { stat: SummaryStat }) {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm px-4 py-3.5 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-xs text-slate-500 truncate">{stat.label}</p>
        <p
          className={`mt-0.5 text-2xl font-semibold tracking-tight leading-none ${
            stat.isAlert ? "text-red-600" : "text-slate-900"
          }`}
        >
          {stat.value}
        </p>
      </div>
      <p
        className={`text-xs shrink-0 ${
          stat.isAlert ? "text-red-400" : "text-slate-400"
        }`}
      >
        {stat.subtext}
      </p>
    </div>
  )
}

export default function OperationalSummary({ stats }: { stats: SummaryStat[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      {stats.map((stat, i) => (
        <StatCard key={i} stat={stat} />
      ))}
    </div>
  )
}

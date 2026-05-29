import type { Metric } from "@/app/lib/mockData"

function MetricCell({ metric }: { metric: Metric }) {
  return (
    <div className="bg-white p-4">
      <p className="text-xs text-slate-500">{metric.label}</p>
      <p
        className={`mt-1.5 text-2xl font-semibold tracking-tight ${
          metric.isAlert ? "text-red-600" : "text-slate-900"
        }`}
      >
        {metric.value}
      </p>
      <p
        className={`mt-0.5 text-xs ${
          metric.isAlert ? "text-red-400" : "text-slate-400"
        }`}
      >
        {metric.subtext}
      </p>
    </div>
  )
}

export default function MetricsSection({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-slate-900">
          Operational Metrics
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">Today's snapshot</p>
      </div>
      <div className="grid grid-cols-2 gap-px bg-gray-100">
        {metrics.map((metric, i) => (
          <MetricCell key={i} metric={metric} />
        ))}
      </div>
    </div>
  )
}

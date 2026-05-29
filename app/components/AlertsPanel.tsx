import type { Alert, AlertSeverity, AlertCategory } from "@/app/lib/mockData"

const severityStyles: Record<
  AlertSeverity,
  { border: string; dot: string }
> = {
  high: { border: "border-red-400", dot: "bg-red-400" },
  medium: { border: "border-amber-400", dot: "bg-amber-400" },
  low: { border: "border-blue-300", dot: "bg-blue-300" },
}

const categoryStyles: Record<AlertCategory, { label: string; className: string }> = {
  Documentation: {
    label: "Documentation",
    className: "bg-slate-100 text-slate-600",
  },
  Authorization: {
    label: "Authorization",
    className: "bg-purple-50 text-purple-700",
  },
  Financial: {
    label: "Financial",
    className: "bg-red-50 text-red-700",
  },
  Fulfillment: {
    label: "Fulfillment",
    className: "bg-blue-50 text-blue-700",
  },
}

function AlertItem({ alert }: { alert: Alert }) {
  const severity = severityStyles[alert.severity]
  const category = categoryStyles[alert.category]
  return (
    <div className="px-5 py-3.5">
      <div className={`border-l-2 pl-3 ${severity.border}`}>
        <div className="flex items-center gap-1.5 mb-1.5">
          <span
            className={`text-xs font-medium px-1.5 py-0.5 rounded ${category.className}`}
          >
            {category.label}
          </span>
          <span className="text-xs text-slate-400">{alert.time}</span>
        </div>
        <p className="text-xs font-semibold text-slate-800 leading-snug">
          {alert.title}
        </p>
        <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">
          {alert.description}
        </p>
      </div>
    </div>
  )
}

export default function AlertsPanel({ alerts }: { alerts: Alert[] }) {
  const criticalCount = alerts.filter((a) => a.severity === "high").length
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">
            Operational Alerts
          </h2>
          <div className="flex items-center gap-2">
            {criticalCount > 0 && (
              <span className="bg-red-100 text-red-700 text-xs font-semibold rounded-full px-2 py-0.5">
                {criticalCount} critical
              </span>
            )}
            <span className="text-xs text-slate-400">{alerts.length} active</span>
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-50">
        {alerts.map((alert) => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
      </div>
      <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
        <button className="text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors">
          View all alerts →
        </button>
      </div>
    </div>
  )
}

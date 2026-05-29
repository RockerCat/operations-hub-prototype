import type { AttentionOrder, AttentionSeverity } from "@/app/lib/mockData"

const severityStyles: Record<
  AttentionSeverity,
  { border: string; badge: string; badgeLabel: string; button: string }
> = {
  high: {
    border: "border-l-red-400",
    badge: "bg-red-100 text-red-700",
    badgeLabel: "High Priority",
    button: "bg-slate-900 text-white hover:bg-slate-700",
  },
  medium: {
    border: "border-l-amber-400",
    badge: "bg-amber-50 text-amber-700",
    badgeLabel: "Needs Attention",
    button: "bg-white text-slate-700 border border-gray-200 hover:bg-gray-50",
  },
}

function AttentionCard({ order }: { order: AttentionOrder }) {
  const styles = severityStyles[order.severity]
  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 border-l-4 shadow-sm p-5 flex flex-col justify-between gap-4 ${styles.border}`}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <span
            className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${styles.badge}`}
          >
            {styles.badgeLabel}
          </span>
          <span className="font-mono text-xs text-slate-400 shrink-0">
            {order.orderId}
          </span>
        </div>
        <p className="text-sm font-semibold text-slate-900 leading-snug">
          {order.patient}
        </p>
        <p className="text-xs text-slate-500 mt-0.5">{order.product}</p>
        <div className="mt-3 flex items-start gap-2">
          <svg
            className="h-3.5 w-3.5 text-slate-400 mt-0.5 shrink-0"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M8 5v3.5M8 11h.01"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <p className="text-xs text-slate-600 leading-relaxed">{order.blocker}</p>
        </div>
      </div>
      <button
        className={`w-full text-xs font-semibold px-3 py-2 rounded-lg transition-colors ${styles.button}`}
      >
        {order.action} →
      </button>
    </div>
  )
}

export default function AttentionOrders({
  orders,
}: {
  orders: AttentionOrder[]
}) {
  return (
    <section className="mb-8">
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Orders Requiring Attention
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            High-priority orders that need action before processing can continue.
          </p>
        </div>
        <span className="text-xs text-slate-400">{orders.length} items</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {orders.map((order) => (
          <AttentionCard key={order.id} order={order} />
        ))}
      </div>
    </section>
  )
}

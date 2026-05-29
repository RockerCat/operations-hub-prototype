import type { OrderStatus } from "@/app/lib/mockData"

const statusStyles: Record<OrderStatus, { wrapper: string; dot: string }> = {
  Draft: {
    wrapper: "bg-gray-100 text-gray-500",
    dot: "bg-gray-400",
  },
  "Pending Approval": {
    wrapper: "bg-amber-50 text-amber-700",
    dot: "bg-amber-400",
  },
  Approved: {
    wrapper: "bg-blue-50 text-blue-700",
    dot: "bg-blue-500",
  },
  "Awaiting Payment": {
    wrapper: "bg-orange-50 text-orange-700",
    dot: "bg-orange-400",
  },
  Completed: {
    wrapper: "bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
  },
}

export default function StatusBadge({ status }: { status: OrderStatus }) {
  const styles = statusStyles[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${styles.wrapper}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
      {status}
    </span>
  )
}

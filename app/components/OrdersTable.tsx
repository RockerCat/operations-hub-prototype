import StatusBadge from "@/app/components/StatusBadge"
import type { Order } from "@/app/lib/mockData"

function MarginCell({ margin }: { margin: string }) {
  if (margin === "—") {
    return <span className="text-sm text-slate-300">{margin}</span>
  }
  const value = parseInt(margin)
  const isLow = value < 30
  return (
    <span
      className={`text-sm font-medium tabular-nums ${
        isLow ? "text-red-600" : "text-slate-700"
      }`}
    >
      {margin}
      {isLow && (
        <span className="ml-1 text-xs text-red-400" aria-label="below threshold">
          ↓
        </span>
      )}
    </span>
  )
}

function ActionCell({ status }: { status: Order["status"] }) {
  const canReview = status === "Pending Approval"
  return (
    <div className="flex items-center gap-3">
      <button className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors">
        View
      </button>
      {canReview && (
        <button className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
          Review
        </button>
      )}
    </div>
  )
}

const columnHeaders = [
  "Order ID",
  "Patient",
  "Product",
  "Vendor",
  "Status",
  "Margin",
  "Last Updated",
  "",
]

export default function OrdersTable({
  orders,
  limit,
}: {
  orders: Order[]
  limit?: number
}) {
  const rows = limit ? orders.slice(0, limit) : orders
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Recent Orders</h2>
          <p className="text-xs text-slate-400 mt-0.5">{rows.length} of {orders.length} orders</p>
        </div>
        <button className="text-xs font-medium text-slate-500 hover:text-slate-800 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors">
          Filter
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {columnHeaders.map((header, i) => (
                <th
                  key={i}
                  className="text-left text-xs font-semibold text-slate-400 px-5 py-3 first:pl-6 last:pr-6"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors last:border-0"
              >
                <td className="px-5 pl-6 py-2.5">
                  <span className="font-mono text-xs text-slate-400">
                    {order.id}
                  </span>
                </td>
                <td className="px-5 py-2.5">
                  <span className="text-sm font-medium text-slate-800">
                    {order.patient}
                  </span>
                </td>
                <td className="px-5 py-2.5 max-w-[180px]">
                  <span
                    className="text-sm text-slate-600 block truncate"
                    title={order.product}
                  >
                    {order.product}
                  </span>
                </td>
                <td className="px-5 py-2.5">
                  <span className="text-sm text-slate-500">{order.vendor}</span>
                </td>
                <td className="px-5 py-2.5">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-5 py-2.5">
                  <MarginCell margin={order.margin} />
                </td>
                <td className="px-5 py-2.5">
                  <span className="text-xs text-slate-400">
                    {order.lastUpdated}
                  </span>
                </td>
                <td className="px-5 pr-6 py-2.5">
                  <ActionCell status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
        <span className="text-xs text-slate-400">Showing {rows.length} most recent orders</span>
        <button className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
          View all orders →
        </button>
      </div>
    </div>
  )
}

import AppHeader from "@/app/components/AppHeader"
import WorkQueueCard from "@/app/components/WorkQueueCard"
import OrdersTable from "@/app/components/OrdersTable"
import AlertsPanel from "@/app/components/AlertsPanel"
import MetricsSection from "@/app/components/MetricsSection"
import OperationalSummary from "@/app/components/OperationalSummary"
import AttentionOrders from "@/app/components/AttentionOrders"
import {
  workQueue,
  orders,
  alerts,
  metrics,
  summaryStats,
  attentionOrders,
} from "@/app/lib/mockData"

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
      {children}
    </p>
  )
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader activePage="dashboard" />

      <main className="max-w-screen-xl mx-auto px-6 py-8">
        {/* Page title */}
        <div className="mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Operations Hub
              </h2>
              <p className="mt-1 text-sm text-slate-500 max-w-xl">
                Today&apos;s operational workload, approvals, payments, and
                fulfillment activity.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-white border border-gray-100 rounded-lg px-3 py-2 shadow-sm">
              <svg
                className="h-3.5 w-3.5 text-emerald-500"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <circle cx="8" cy="8" r="3" />
              </svg>
              Updated just now
            </div>
          </div>
        </div>

        {/* Operational Summary */}
        <OperationalSummary stats={summaryStats} />

        {/* Work Queue */}
        <section className="mb-8">
          <SectionLabel>Work Queue</SectionLabel>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {workQueue.map((item) => (
              <WorkQueueCard key={item.id} {...item} />
            ))}
          </div>
        </section>

        {/* Orders Requiring Attention */}
        <AttentionOrders orders={attentionOrders} />

        {/* Main grid: Recent Orders + Alerts & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SectionLabel>Recent Orders</SectionLabel>
            <OrdersTable orders={orders} limit={5} />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <SectionLabel>Alerts</SectionLabel>
              <AlertsPanel alerts={alerts} />
            </div>
            <div>
              <SectionLabel>Metrics</SectionLabel>
              <MetricsSection metrics={metrics} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

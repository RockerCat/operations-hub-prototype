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

function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0">
              <svg
                className="h-3.5 w-3.5 text-white"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor" opacity="0.6" />
                <rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.6" />
                <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.3" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-slate-900 leading-none">
                Operations Hub
              </h1>
              <p className="text-xs text-slate-400 mt-0.5 leading-none">
                Medical Supply Operations Platform
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 text-sm text-slate-500">
            <span className="px-3 py-1.5 rounded-lg bg-gray-100 text-slate-700 font-medium text-xs">
              Dashboard
            </span>
            <span className="px-3 py-1.5 text-xs hover:text-slate-900 cursor-pointer transition-colors">
              Orders
            </span>
            <span className="px-3 py-1.5 text-xs hover:text-slate-900 cursor-pointer transition-colors">
              Vendors
            </span>
            <span className="px-3 py-1.5 text-xs hover:text-slate-900 cursor-pointer transition-colors">
              Documents
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <button className="text-xs font-medium text-slate-600 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              Export Orders
            </button>
            <button className="text-xs font-medium text-white px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 transition-colors flex items-center gap-1.5">
              <svg
                className="h-3 w-3"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 1v10M1 6h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              New Order
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

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
      {/* 1. Header */}
      <Header />

      <main className="max-w-screen-xl mx-auto px-6 py-8">

        {/* Page title — command center framing */}
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

        {/* 2. Operational Summary — executive snapshot */}
        <OperationalSummary stats={summaryStats} />

        {/* 3. Work Queue */}
        <section className="mb-8">
          <SectionLabel>Work Queue</SectionLabel>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {workQueue.map((item) => (
              <WorkQueueCard key={item.id} {...item} />
            ))}
          </div>
        </section>

        {/* 4. Orders Requiring Attention */}
        <AttentionOrders orders={attentionOrders} />

        {/* 5 + 6. Main grid: Recent Orders (secondary) + Alerts & Metrics */}
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

import Link from "next/link"
import type { Metadata } from "next"
import AppHeader from "@/app/components/AppHeader"

export const metadata: Metadata = {
  title: "Approval Queue — Operations Hub",
  description: "Review and prioritize pending operational approvals.",
}

// ─── Types ────────────────────────────────────────────────────────────────────

type RiskLevel = "High" | "Medium" | "Low"
type ApprovalStatus = "Pending Review" | "Escalated"

type QueueItem = {
  orderId: string
  patient: string
  product: string
  submitted: string
  confidence: number
  riskLevel: RiskLevel
  status: ApprovalStatus
  reviewer: string
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const QUEUE: QueueItem[] = [
  {
    orderId: "ORD-2024-0888",
    patient: "Thomas Baker",
    product: "Breast Prosthesis – Custom Fit",
    submitted: "Yesterday, 4:22 PM",
    confidence: 58,
    riskLevel: "High",
    status: "Escalated",
    reviewer: "Sarah Kim",
  },
  {
    orderId: "ORD-2024-0892",
    patient: "Maria Rodriguez",
    product: "Lymphedema Kit – Full Arm",
    submitted: "Today, 2:14 PM",
    confidence: 72,
    riskLevel: "Medium",
    status: "Pending Review",
    reviewer: "Alex Sosa",
  },
  {
    orderId: "ORD-2024-0886",
    patient: "Patricia Moore",
    product: "Compression Garments – Bilateral",
    submitted: "Yesterday, 10:15 AM",
    confidence: 65,
    riskLevel: "Medium",
    status: "Pending Review",
    reviewer: "Sarah Kim",
  },
  {
    orderId: "ORD-2024-0891",
    patient: "John Smith",
    product: "Compression Sleeve – Grade 2",
    submitted: "Today, 11:30 AM",
    confidence: 91,
    riskLevel: "Low",
    status: "Pending Review",
    reviewer: "Alex Sosa",
  },
  {
    orderId: "ORD-2024-0887",
    patient: "David Nguyen",
    product: "Lymphedema Kit – Lower Extremity",
    submitted: "Today, 9:45 AM",
    confidence: 84,
    riskLevel: "Low",
    status: "Pending Review",
    reviewer: "Alex Sosa",
  },
  {
    orderId: "ORD-2024-0885",
    patient: "Angela Fischer",
    product: "Compression Stockings – Class III",
    submitted: "2 days ago",
    confidence: 78,
    riskLevel: "Low",
    status: "Pending Review",
    reviewer: "Alex Sosa",
  },
]

const SUMMARY = [
  { label: "Pending Approvals", value: "12", subtext: "Require review" },
  {
    label: "High Risk Orders",
    value: "3",
    subtext: "Immediate attention",
    isAlert: true,
  },
  {
    label: "Waiting > 48 Hours",
    value: "2",
    subtext: "Past SLA threshold",
    isAlert: true,
  },
  { label: "Avg Review Time", value: "18 min", subtext: "Last 30 days" },
]

// ─── Badge components ─────────────────────────────────────────────────────────

const riskStyles: Record<RiskLevel, { wrapper: string; dot: string }> = {
  High: { wrapper: "bg-red-50 text-red-700", dot: "bg-red-400" },
  Medium: { wrapper: "bg-amber-50 text-amber-700", dot: "bg-amber-400" },
  Low: { wrapper: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
}

const statusStyles: Record<ApprovalStatus, { wrapper: string; dot: string }> = {
  "Pending Review": {
    wrapper: "bg-amber-50 text-amber-700",
    dot: "bg-amber-400",
  },
  Escalated: { wrapper: "bg-red-50 text-red-700", dot: "bg-red-500" },
}

function RiskBadge({ level }: { level: RiskLevel }) {
  const s = riskStyles[level]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${s.wrapper}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {level}
    </span>
  )
}

function StatusBadge({ status }: { status: ApprovalStatus }) {
  const s = statusStyles[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${s.wrapper}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  )
}

function ConfidenceScore({ score }: { score: number }) {
  const color =
    score >= 85
      ? "text-emerald-600"
      : score >= 70
      ? "text-slate-700"
      : "text-red-600"
  return (
    <span className={`text-sm font-semibold tabular-nums ${color}`}>
      {score}%
    </span>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ApprovalsPage() {
  const highRiskCount = QUEUE.filter((q) => q.riskLevel === "High").length

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader activePage="orders" />

      <main className="max-w-screen-xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
          <Link
            href="/dashboard"
            className="hover:text-slate-700 transition-colors"
          >
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">Approval Queue</span>
        </nav>

        {/* Page heading */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Approval Queue
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Review and prioritize pending operational approvals.
              </p>
            </div>
            {highRiskCount > 0 && (
              <span className="text-xs font-semibold bg-red-100 text-red-700 rounded-full px-3 py-1 mt-0.5">
                {highRiskCount} high-risk order{highRiskCount > 1 ? "s" : ""}{" "}
                require attention
              </span>
            )}
          </div>
        </div>

        {/* Summary metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {SUMMARY.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-100 shadow-sm px-4 py-3.5"
            >
              <p className="text-xs text-slate-500 truncate">{s.label}</p>
              <p
                className={`mt-0.5 text-2xl font-semibold tracking-tight ${
                  s.isAlert ? "text-red-600" : "text-slate-900"
                }`}
              >
                {s.value}
              </p>
              <p
                className={`text-xs mt-0.5 ${
                  s.isAlert ? "text-red-400" : "text-slate-400"
                }`}
              >
                {s.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-start">

          {/* Queue table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Pending Approvals
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Sorted by risk level and submission age
                </p>
              </div>
              <span className="text-xs text-slate-400">12 orders</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/60">
                    {[
                      "Order ID",
                      "Patient",
                      "Submitted",
                      "Confidence",
                      "Risk Level",
                      "Status",
                      "Assigned Reviewer",
                      "Action",
                    ].map((h, i) => (
                      <th
                        key={i}
                        className="text-left text-xs font-semibold text-slate-400 px-5 py-3 first:pl-6 last:pr-6"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {QUEUE.map((item) => (
                    <tr
                      key={item.orderId}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50/40 transition-colors"
                    >
                      <td className="px-5 pl-6 py-3">
                        <span className="font-mono text-xs text-slate-400">
                          {item.orderId}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <p className="text-sm font-medium text-slate-800">
                          {item.patient}
                        </p>
                        <p
                          className="text-xs text-slate-400 truncate max-w-[150px]"
                          title={item.product}
                        >
                          {item.product}
                        </p>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-xs text-slate-400">
                          {item.submitted}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <ConfidenceScore score={item.confidence} />
                      </td>
                      <td className="px-5 py-3">
                        <RiskBadge level={item.riskLevel} />
                      </td>
                      <td className="px-5 py-3">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-sm text-slate-500">
                          {item.reviewer}
                        </span>
                      </td>
                      <td className="px-5 pr-6 py-3">
                        <Link
                          href="/orders/review"
                          className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/40 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Showing {QUEUE.length} of 12 pending approvals
              </span>
              <button className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
                View all 12 →
              </button>
            </div>
          </div>

          {/* Prioritization sidebar */}
          <div className="sticky top-20 flex flex-col gap-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-slate-900">
                  Approval Prioritization
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  How the queue is sorted and managed
                </p>
              </div>
              <div className="px-5 py-4">
                <p className="text-xs text-slate-500 leading-relaxed mb-3">
                  Orders are automatically prioritized using:
                </p>
                <div className="space-y-2">
                  {[
                    "Risk level",
                    "Documentation completeness",
                    "Operational confidence score",
                    "Submission age",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <span className="h-1 w-1 rounded-full bg-slate-400 shrink-0" />
                      <p className="text-xs text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  Higher-risk and older orders are surfaced first.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

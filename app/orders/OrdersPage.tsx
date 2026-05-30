"use client"

import { useState } from "react"
import Link from "next/link"
import AppHeader from "@/app/components/AppHeader"

// ─── Types ────────────────────────────────────────────────────────────────────

type OrderStatus =
  | "Pending Approval"
  | "Awaiting Payment"
  | "Documents Generated"
  | "Completed"

type WorkflowStage =
  | "Approval Review"
  | "Payment Collection"
  | "Documentation"
  | "Fulfillment"
  | "Complete"

type RiskLevel = "High" | "Medium" | "Low"
type ApprovalStatus = "Pending Review" | "Escalated"

type StatusKey =
  | "all"
  | "pending-approval"
  | "awaiting-payment"
  | "documents-generated"
  | "completed"

type Order = {
  id: string
  patient: string
  product: string
  submitted: string
  status: OrderStatus
  reviewer: string
  stage: WorkflowStage
  // Approval-specific (populated only for Pending Approval orders)
  confidence?: number
  riskLevel?: RiskLevel
  approvalStatus?: ApprovalStatus
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ORDERS: Order[] = [
  {
    id: "ORD-2024-0892",
    patient: "Maria Rodriguez",
    product: "Lymphedema Kit – Full Arm",
    submitted: "Today, 2:14 PM",
    status: "Pending Approval",
    reviewer: "Alex Sosa",
    stage: "Approval Review",
    confidence: 72,
    riskLevel: "Medium",
    approvalStatus: "Pending Review",
  },
  {
    id: "ORD-2024-0891",
    patient: "John Smith",
    product: "Compression Sleeve – Grade 2",
    submitted: "Today, 11:30 AM",
    status: "Pending Approval",
    reviewer: "Alex Sosa",
    stage: "Approval Review",
    confidence: 91,
    riskLevel: "Low",
    approvalStatus: "Pending Review",
  },
  {
    id: "ORD-2024-0888",
    patient: "Thomas Baker",
    product: "Breast Prosthesis – Custom Fit",
    submitted: "Yesterday, 4:22 PM",
    status: "Pending Approval",
    reviewer: "Sarah Kim",
    stage: "Approval Review",
    confidence: 58,
    riskLevel: "High",
    approvalStatus: "Escalated",
  },
  {
    id: "ORD-2024-0890",
    patient: "Linda Chen",
    product: "Breast Prosthesis – Custom Fit",
    submitted: "Yesterday",
    status: "Awaiting Payment",
    reviewer: "Sarah Kim",
    stage: "Payment Collection",
  },
  {
    id: "ORD-2024-0889",
    patient: "Robert Stein",
    product: "Compression Garments – Lower Limb",
    submitted: "Yesterday",
    status: "Completed",
    reviewer: "Alex Sosa",
    stage: "Complete",
  },
  {
    id: "ORD-2024-0887",
    patient: "David Nguyen",
    product: "Lymphedema Kit – Lower Extremity",
    submitted: "2 days ago",
    status: "Documents Generated",
    reviewer: "Alex Sosa",
    stage: "Documentation",
  },
  {
    id: "ORD-2024-0886",
    patient: "Patricia Moore",
    product: "Compression Garments – Bilateral",
    submitted: "2 days ago",
    status: "Awaiting Payment",
    reviewer: "Sarah Kim",
    stage: "Payment Collection",
  },
  {
    id: "ORD-2024-0885",
    patient: "Angela Fischer",
    product: "Compression Stockings – Class III",
    submitted: "3 days ago",
    status: "Completed",
    reviewer: "Alex Sosa",
    stage: "Complete",
  },
  {
    id: "ORD-2024-0884",
    patient: "Kevin Okafor",
    product: "Lymphedema Sleeve & Gauntlet",
    submitted: "3 days ago",
    status: "Awaiting Payment",
    reviewer: "Alex Sosa",
    stage: "Payment Collection",
  },
  {
    id: "ORD-2024-0883",
    patient: "Susan Patel",
    product: "Compression Arm Sleeve – Post-Op",
    submitted: "4 days ago",
    status: "Documents Generated",
    reviewer: "Sarah Kim",
    stage: "Documentation",
  },
  {
    id: "ORD-2024-0882",
    patient: "James Whitfield",
    product: "Compression Sleeve – Grade 2",
    submitted: "4 days ago",
    status: "Completed",
    reviewer: "Alex Sosa",
    stage: "Complete",
  },
  {
    id: "ORD-2024-0881",
    patient: "William Torres",
    product: "Lymphedema Kit – Full Arm",
    submitted: "5 days ago",
    status: "Awaiting Payment",
    reviewer: "Sarah Kim",
    stage: "Payment Collection",
  },
  {
    id: "ORD-2024-0880",
    patient: "Elena Russo",
    product: "Post-Mastectomy Bra",
    submitted: "5 days ago",
    status: "Awaiting Payment",
    reviewer: "Alex Sosa",
    stage: "Payment Collection",
  },
]

const KPIS = [
  { label: "Total Orders", value: "47", subtext: "Active pipeline" },
  { label: "Pending Approval", value: "12", subtext: "Require review" },
  {
    label: "Awaiting Payment",
    value: "5",
    subtext: "Payment pending",
    isAlert: true,
  },
  { label: "Completed", value: "42", subtext: "This month" },
]

const STATUS_TABS: {
  key: StatusKey
  label: string
  status: OrderStatus | null
}[] = [
  { key: "all", label: "All Orders", status: null },
  { key: "pending-approval", label: "Pending Approval", status: "Pending Approval" },
  { key: "awaiting-payment", label: "Awaiting Payment", status: "Awaiting Payment" },
  { key: "documents-generated", label: "Documents Generated", status: "Documents Generated" },
  { key: "completed", label: "Completed", status: "Completed" },
]

// ─── Badge components ─────────────────────────────────────────────────────────

const orderStatusStyles: Record<OrderStatus, { wrapper: string; dot: string }> = {
  "Pending Approval": { wrapper: "bg-amber-50 text-amber-700", dot: "bg-amber-400" },
  "Awaiting Payment": { wrapper: "bg-orange-50 text-orange-700", dot: "bg-orange-400" },
  "Documents Generated": { wrapper: "bg-blue-50 text-blue-700", dot: "bg-blue-500" },
  Completed: { wrapper: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
}

const riskStyles: Record<RiskLevel, { wrapper: string; dot: string }> = {
  High: { wrapper: "bg-red-50 text-red-700", dot: "bg-red-400" },
  Medium: { wrapper: "bg-amber-50 text-amber-700", dot: "bg-amber-400" },
  Low: { wrapper: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
}

const approvalStatusStyles: Record<ApprovalStatus, { wrapper: string; dot: string }> = {
  "Pending Review": { wrapper: "bg-amber-50 text-amber-700", dot: "bg-amber-400" },
  Escalated: { wrapper: "bg-red-50 text-red-700", dot: "bg-red-500" },
}

function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const s = orderStatusStyles[status]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${s.wrapper}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  )
}

function RiskBadge({ level }: { level: RiskLevel }) {
  const s = riskStyles[level]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${s.wrapper}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {level}
    </span>
  )
}

function ApprovalStatusBadge({ status }: { status: ApprovalStatus }) {
  const s = approvalStatusStyles[status]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${s.wrapper}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  )
}

function ConfidenceScore({ score }: { score: number }) {
  const color =
    score >= 85 ? "text-emerald-600" : score >= 70 ? "text-slate-700" : "text-red-600"
  return (
    <span className={`text-sm font-semibold tabular-nums ${color}`}>{score}%</span>
  )
}

// ─── Action cell ──────────────────────────────────────────────────────────────

function ActionCell({ status }: { status: OrderStatus }) {
  if (status === "Pending Approval") {
    return (
      <Link
        href="/orders/review"
        className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
      >
        Review
      </Link>
    )
  }
  if (status === "Documents Generated") {
    return (
      <Link
        href="/documents"
        className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
      >
        View Docs
      </Link>
    )
  }
  if (status === "Completed") {
    return (
      <Link
        href="/orders/review"
        className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
      >
        View
      </Link>
    )
  }
  return (
    <button className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
      View
    </button>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalizeStatus(raw?: string): StatusKey {
  const valid: StatusKey[] = [
    "all",
    "pending-approval",
    "awaiting-payment",
    "documents-generated",
    "completed",
  ]
  if (raw && valid.includes(raw as StatusKey)) return raw as StatusKey
  return "all"
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function OrdersPage({ initialStatus }: { initialStatus?: string }) {
  const [activeStatus, setActiveStatus] = useState<StatusKey>(
    normalizeStatus(initialStatus)
  )

  const activeTab = STATUS_TABS.find((t) => t.key === activeStatus)!
  const filtered =
    activeTab.status === null
      ? ORDERS
      : ORDERS.filter((o) => o.status === activeTab.status)

  const countFor = (status: OrderStatus | null) =>
    status === null
      ? ORDERS.length
      : ORDERS.filter((o) => o.status === status).length

  const isApprovalView = activeStatus === "pending-approval"

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader activePage="orders" />

      <main className="max-w-screen-xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
          <Link href="/dashboard" className="hover:text-slate-700 transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">Orders</span>
        </nav>

        {/* Page heading */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900">Orders Management</h2>
          <p className="mt-1 text-sm text-slate-500">
            Track and manage patient orders across the operational workflow.
          </p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {KPIS.map((k, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-100 shadow-sm px-4 py-3.5"
            >
              <p className="text-xs text-slate-500 truncate">{k.label}</p>
              <p
                className={`mt-0.5 text-2xl font-semibold tracking-tight ${
                  k.isAlert ? "text-red-600" : "text-slate-900"
                }`}
              >
                {k.value}
              </p>
              <p
                className={`text-xs mt-0.5 ${
                  k.isAlert ? "text-red-400" : "text-slate-400"
                }`}
              >
                {k.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-6 items-start">

          {/* Table card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Card header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {activeTab.label}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {filtered.length} order{filtered.length !== 1 ? "s" : ""}
                </p>
              </div>
              <Link
                href="/orders/new"
                className="text-xs font-medium text-white px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 transition-colors flex items-center gap-1.5"
              >
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
              </Link>
            </div>

            {/* Status tabs */}
            <div className="flex items-center gap-0 border-b border-gray-100 overflow-x-auto">
              {STATUS_TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveStatus(tab.key)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${
                    activeStatus === tab.key
                      ? "border-slate-900 text-slate-900"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`text-xs rounded-full px-1.5 py-0.5 tabular-nums ${
                      activeStatus === tab.key
                        ? "bg-slate-900 text-white"
                        : "bg-gray-100 text-slate-500"
                    }`}
                  >
                    {countFor(tab.status)}
                  </span>
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/60">
                    <th className="text-left text-xs font-semibold text-slate-400 px-5 pl-6 py-3">Order ID</th>
                    <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">Patient</th>
                    <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">Product</th>
                    <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">Submitted</th>
                    {isApprovalView ? (
                      <>
                        <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">Confidence</th>
                        <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">Risk Level</th>
                        <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">Status</th>
                      </>
                    ) : (
                      <>
                        <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">Status</th>
                        <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">Stage</th>
                      </>
                    )}
                    <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">Reviewer</th>
                    <th className="text-left text-xs font-semibold text-slate-400 px-5 pr-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={isApprovalView ? 8 : 8}
                        className="px-6 py-8 text-center text-xs text-slate-300"
                      >
                        No orders in this category.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-gray-50 last:border-0 hover:bg-gray-50/40 transition-colors"
                      >
                        <td className="px-5 pl-6 py-3">
                          <span className="font-mono text-xs text-slate-400">
                            {order.id}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <p className="text-sm font-medium text-slate-800">
                            {order.patient}
                          </p>
                        </td>
                        <td className="px-5 py-3 max-w-[160px]">
                          <p
                            className="text-xs text-slate-500 truncate"
                            title={order.product}
                          >
                            {order.product}
                          </p>
                        </td>
                        <td className="px-5 py-3">
                          <span className="text-xs text-slate-400">
                            {order.submitted}
                          </span>
                        </td>
                        {isApprovalView ? (
                          <>
                            <td className="px-5 py-3">
                              {order.confidence !== undefined ? (
                                <ConfidenceScore score={order.confidence} />
                              ) : (
                                <span className="text-xs text-slate-300">—</span>
                              )}
                            </td>
                            <td className="px-5 py-3">
                              {order.riskLevel ? (
                                <RiskBadge level={order.riskLevel} />
                              ) : (
                                <span className="text-xs text-slate-300">—</span>
                              )}
                            </td>
                            <td className="px-5 py-3">
                              {order.approvalStatus ? (
                                <ApprovalStatusBadge status={order.approvalStatus} />
                              ) : (
                                <span className="text-xs text-slate-300">—</span>
                              )}
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-5 py-3">
                              <OrderStatusBadge status={order.status} />
                            </td>
                            <td className="px-5 py-3">
                              <span className="text-xs text-slate-500">
                                {order.stage}
                              </span>
                            </td>
                          </>
                        )}
                        <td className="px-5 py-3">
                          <span className="text-sm text-slate-500">
                            {order.reviewer}
                          </span>
                        </td>
                        <td className="px-5 pr-6 py-3">
                          <ActionCell status={order.status} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/40 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Showing {filtered.length} of {ORDERS.length} orders
              </span>
              <button className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
                Export →
              </button>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="sticky top-20 flex flex-col gap-5">
            {/* Payment Queue Summary */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-slate-900">
                  Payment Queue Summary
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Current payment status
                </p>
              </div>
              <div className="px-5 py-4 space-y-3">
                {[
                  { label: "Awaiting Payment", value: "5" },
                  { label: "Avg Payment Delay", value: "2.3 days" },
                  { label: "High Priority Accounts", value: "1", isAlert: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{item.label}</span>
                    <span
                      className={`text-sm font-semibold tabular-nums ${
                        item.isAlert ? "text-red-600" : "text-slate-900"
                      }`}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
                <button
                  onClick={() => setActiveStatus("awaiting-payment")}
                  className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  View payment queue →
                </button>
              </div>
            </div>

            {/* Quick access */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-slate-900">
                  Quick Access
                </h3>
              </div>
              <div className="px-5 py-4 space-y-2.5">
                <button
                  onClick={() => setActiveStatus("pending-approval")}
                  className="w-full flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <span className="h-4 w-4 rounded bg-amber-100 flex items-center justify-center shrink-0">
                    <svg
                      className="h-2.5 w-2.5 text-amber-600"
                      viewBox="0 0 10 10"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <circle cx="5" cy="5" r="4" />
                    </svg>
                  </span>
                  Pending Approvals
                  <span className="ml-auto text-slate-400 text-xs">12</span>
                </button>
                <button
                  onClick={() => setActiveStatus("awaiting-payment")}
                  className="w-full flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <span className="h-4 w-4 rounded bg-orange-100 flex items-center justify-center shrink-0">
                    <svg
                      className="h-2.5 w-2.5 text-orange-600"
                      viewBox="0 0 10 10"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <circle cx="5" cy="5" r="4" />
                    </svg>
                  </span>
                  Awaiting Payment
                  <span className="ml-auto text-slate-400 text-xs">5</span>
                </button>
                <Link
                  href="/documents"
                  className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <span className="h-4 w-4 rounded bg-blue-100 flex items-center justify-center shrink-0">
                    <svg
                      className="h-2.5 w-2.5 text-blue-600"
                      viewBox="0 0 10 10"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <circle cx="5" cy="5" r="4" />
                    </svg>
                  </span>
                  Documents Center
                  <span className="ml-auto text-slate-400 text-xs">8</span>
                </Link>
                <Link
                  href="/orders/new"
                  className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <span className="h-4 w-4 rounded bg-emerald-100 flex items-center justify-center shrink-0">
                    <svg
                      className="h-2.5 w-2.5 text-emerald-600"
                      viewBox="0 0 10 10"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 2v6M2 5h6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  Create New Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

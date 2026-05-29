"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AppHeader from "@/app/components/AppHeader"

// ─── Mock data ────────────────────────────────────────────────────────────────

const ORDER = {
  id: "ORD-2024-0892",
  submittedAt: "2 hours ago",
  submittedBy: "Sarah Johnson",
}

const PATIENT = {
  name: "Maria Rodriguez",
  initials: "MR",
  dob: "March 15, 1978",
  phone: "(555) 247-8832",
  email: "m.rodriguez@email.com",
  insurance: "BlueCross BlueShield",
  memberId: "BCB-2024-447821",
  planType: "PPO",
  address: "4821 Maple Drive, Austin, TX 78701",
}

const PRODUCTS = [
  {
    name: "Compression Sleeve – Grade 2",
    vendor: "Juzo USA",
    qty: 2,
    unitCost: 89.5,
    unitBillable: 225.0,
  },
  {
    name: "Lymphedema Kit – Full Arm",
    vendor: "Solaris Medical",
    qty: 1,
    unitCost: 145.0,
    unitBillable: 380.0,
  },
]

type RiskSeverity = "high" | "medium" | "pass"

type Risk = {
  id: number
  severity: RiskSeverity
  label: string
  description: string
  action?: string
}

const RISKS: Risk[] = [
  {
    id: 1,
    severity: "high",
    label: "Therapist measurements missing",
    description:
      "Custom compression products require certified therapist measurements before this order can proceed to fulfillment.",
    action: "Upload measurements",
  },
  {
    id: 2,
    severity: "medium",
    label: "Prior authorization may be required",
    description:
      "BlueCross BlueShield PPO typically requires prior authorization for lymphedema kits. Verify coverage before approving.",
    action: "Verify with insurance",
  },
  {
    id: 3,
    severity: "pass",
    label: "Vendor selected and available",
    description:
      "Juzo USA and Solaris Medical have active contracts and confirmed inventory for fulfillment.",
  },
  {
    id: 4,
    severity: "pass",
    label: "Margin above target threshold",
    description:
      "61% estimated margin exceeds the 30% minimum threshold for this product category.",
  },
]

const APPROVAL_IMPACT = [
  "Generate Encounter Form",
  "Generate Invoice",
  "Generate Proof of Delivery",
  "Move Order to Fulfillment Queue",
  "Notify Operations Team",
]

type Decision = "pending" | "approved" | "changes" | "rejected"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

const totalCost = PRODUCTS.reduce((s, p) => s + p.unitCost * p.qty, 0)
const totalBillable = PRODUCTS.reduce((s, p) => s + p.unitBillable * p.qty, 0)
const margin = Math.round(((totalBillable - totalCost) / totalBillable) * 100)

// ─── Shared primitives ────────────────────────────────────────────────────────

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {children}
    </div>
  )
}

function SectionHead({
  title,
  description,
  aside,
}: {
  title: string
  description?: string
  aside?: React.ReactNode
}) {
  return (
    <div className="px-6 py-4 border-b border-gray-100 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {description && (
          <p className="text-xs text-slate-400 mt-0.5">{description}</p>
        )}
      </div>
      {aside}
    </div>
  )
}

function InfoField({
  label,
  value,
  className = "",
}: {
  label: string
  value: string
  className?: string
}) {
  return (
    <div className={className}>
      <p className="text-xs text-slate-400 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-slate-800">{value}</p>
    </div>
  )
}

// ─── Section 1: Patient Summary ───────────────────────────────────────────────

function PatientSummary() {
  return (
    <SectionCard>
      <SectionHead
        title="Patient Summary"
        description="Verified patient and insurance information for this order."
      />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-600 shrink-0 select-none">
            {PATIENT.initials}
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900">{PATIENT.name}</p>
            <p className="text-xs text-slate-400 mt-0.5">
              {PATIENT.insurance} · {PATIENT.planType}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <InfoField label="Date of Birth" value={PATIENT.dob} />
          <InfoField label="Phone" value={PATIENT.phone} />
          <InfoField label="Member ID" value={PATIENT.memberId} />
          <InfoField label="Plan Type" value={PATIENT.planType} />
          <InfoField
            label="Shipping Address"
            value={PATIENT.address}
            className="col-span-2"
          />
        </div>
      </div>
    </SectionCard>
  )
}

// ─── Section 2: Order Details ─────────────────────────────────────────────────

function OrderDetails() {
  return (
    <SectionCard>
      <SectionHead
        title="Order Details"
        description="Products selected for this order."
        aside={
          <span className="text-xs text-slate-400 shrink-0 mt-0.5">
            {PRODUCTS.length} products
          </span>
        }
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">
                Product
              </th>
              <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3">
                Vendor
              </th>
              <th className="text-center text-xs font-semibold text-slate-400 px-4 py-3">
                Qty
              </th>
              <th className="text-right text-xs font-semibold text-slate-400 px-4 py-3">
                Unit Cost
              </th>
              <th className="text-right text-xs font-semibold text-slate-400 px-4 py-3 pr-6">
                Billable
              </th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p, i) => (
              <tr
                key={i}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/40 transition-colors"
              >
                <td className="px-6 py-3">
                  <p className="text-sm font-medium text-slate-800">{p.name}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-slate-500">{p.vendor}</p>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="text-sm text-slate-700">{p.qty}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm text-slate-400 tabular-nums">
                    {fmt(p.unitCost)}
                  </span>
                </td>
                <td className="px-4 py-3 pr-6 text-right">
                  <span className="text-sm font-semibold text-slate-800 tabular-nums">
                    {fmt(p.unitBillable * p.qty)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-gray-100 bg-gray-50/50">
              <td colSpan={3} className="px-6 py-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Totals
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <span className="text-sm font-medium text-slate-500 tabular-nums">
                  {fmt(totalCost)}
                </span>
              </td>
              <td className="px-4 py-3 pr-6 text-right">
                <span className="text-sm font-bold text-slate-900 tabular-nums">
                  {fmt(totalBillable)}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </SectionCard>
  )
}

// ─── Section 3: Pricing Breakdown ─────────────────────────────────────────────

function PricingBreakdown() {
  return (
    <SectionCard>
      <SectionHead
        title="Pricing Breakdown"
        description="Financial summary for manager review."
      />
      <div className="p-6">
        <div className="space-y-3 mb-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Product Cost</span>
            <span className="text-sm font-medium text-slate-700 tabular-nums">
              {fmt(totalCost)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Fee Schedule Adjustment</span>
            <span className="text-sm text-slate-400">—</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Billable Amount</span>
            <span className="text-sm font-semibold text-slate-900 tabular-nums">
              {fmt(totalBillable)}
            </span>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-5 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Estimated Margin</span>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-emerald-600 tabular-nums">
              {margin}%
            </span>
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
              Healthy Margin
            </span>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

// ─── Section 4: Operational Risk Review ──────────────────────────────────────

const riskConfig: Record<
  RiskSeverity,
  { iconBg: string; iconColor: string; badge: string; badgeLabel: string }
> = {
  high: {
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    badge: "bg-red-100 text-red-700",
    badgeLabel: "High Risk",
  },
  medium: {
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    badge: "bg-amber-100 text-amber-700",
    badgeLabel: "Review",
  },
  pass: {
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    badge: "bg-emerald-100 text-emerald-700",
    badgeLabel: "Clear",
  },
}

function RiskItem({ risk }: { risk: Risk }) {
  const cfg = riskConfig[risk.severity]
  return (
    <div className="flex gap-4 px-6 py-4 border-b border-gray-50 last:border-0">
      <div
        className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${cfg.iconBg}`}
      >
        {risk.severity === "pass" ? (
          <svg
            className={`h-4 w-4 ${cfg.iconColor}`}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="8"
              cy="8"
              r="7"
              fill="currentColor"
              fillOpacity="0.15"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M5 8l2 2 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            className={`h-4 w-4 ${cfg.iconColor}`}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 2.5L14 13H2L8 2.5Z"
              fill="currentColor"
              fillOpacity="0.15"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M8 6.5v3M8 11.5h.01"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-semibold text-slate-800">{risk.label}</p>
          <span
            className={`text-xs font-semibold px-1.5 py-0.5 rounded shrink-0 ${cfg.badge}`}
          >
            {cfg.badgeLabel}
          </span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">{risk.description}</p>
        {risk.action && (
          <button className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
            {risk.action} →
          </button>
        )}
      </div>
    </div>
  )
}

function OperationalRisks() {
  const riskCount = RISKS.filter((r) => r.severity !== "pass").length
  return (
    <SectionCard>
      <SectionHead
        title="Operational Risk Review"
        description="Business rules surfaced from operational workflow configuration."
        aside={
          riskCount > 0 ? (
            <span className="text-xs font-semibold bg-amber-100 text-amber-700 rounded-full px-2 py-0.5 shrink-0 mt-0.5">
              {riskCount} risk{riskCount > 1 ? "s" : ""}
            </span>
          ) : undefined
        }
      />
      <div>
        {RISKS.map((risk) => (
          <RiskItem key={risk.id} risk={risk} />
        ))}
      </div>
    </SectionCard>
  )
}

// ─── Section 5: Approval Impact ───────────────────────────────────────────────

function ApprovalImpact() {
  return (
    <SectionCard>
      <SectionHead
        title="What happens after approval?"
        description="Automated actions triggered immediately upon approval decision."
      />
      <div className="p-6 space-y-3">
        {APPROVAL_IMPACT.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-5 w-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              <svg
                className="h-3 w-3 text-emerald-500"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2.5 6l2.5 2.5L9.5 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-sm text-slate-700">{item}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

// ─── Section 6: Manager Notes ─────────────────────────────────────────────────

function ManagerNotes({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <SectionCard>
      <SectionHead
        title="Approval Notes"
        description="Internal comments attached to the approval decision and visible to the fulfillment team."
      />
      <div className="p-6">
        <textarea
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:border-slate-400 placeholder:text-slate-300 transition-colors resize-none"
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Add comments, requests for changes, or operational guidance…"
        />
        <p className="text-xs text-slate-400 mt-2">
          Not visible to patients or insurance providers.
        </p>
      </div>
    </SectionCard>
  )
}

// ─── Sidebar: Approval Panel ──────────────────────────────────────────────────

function DecisionRow({
  label,
  value,
  badge,
  badgeCls,
}: {
  label: string
  value: string
  badge: string
  badgeCls: string
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-slate-500">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-slate-900 tabular-nums">{value}</span>
        <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${badgeCls}`}>
          {badge}
        </span>
      </div>
    </div>
  )
}

function ApprovalPanel({
  decision,
  onDecide,
}: {
  decision: Decision
  onDecide: (d: Decision) => void
}) {
  const riskCount = RISKS.filter((r) => r.severity !== "pass").length
  const missingDocs = 1

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-slate-900">Approval Decision</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Review all sections before deciding
        </p>
      </div>

      {/* Order meta */}
      <div className="px-5 py-4 border-b border-gray-100 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">Order ID</span>
          <span className="text-xs font-mono font-semibold text-slate-700">
            {ORDER.id}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">Patient</span>
          <span className="text-xs font-medium text-slate-700">{PATIENT.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">Submitted by</span>
          <span className="text-xs text-slate-500">
            {ORDER.submittedBy} · {ORDER.submittedAt}
          </span>
        </div>
      </div>

      {/* Decision summary */}
      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Decision Summary
        </p>
        <div className="space-y-2.5">
          <DecisionRow
            label="Margin"
            value={`${margin}%`}
            badge="Healthy"
            badgeCls="bg-emerald-50 text-emerald-700"
          />
          <DecisionRow
            label="Operational Risks"
            value={String(riskCount)}
            badge="Review Required"
            badgeCls="bg-amber-50 text-amber-700"
          />
          <DecisionRow
            label="Missing Documents"
            value={String(missingDocs)}
            badge="Action Needed"
            badgeCls="bg-amber-50 text-amber-700"
          />
        </div>

        {/* Confidence badge */}
        <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-center">
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest">
            Approval Confidence
          </p>
          <p className="text-xl font-bold text-amber-800 mt-0.5">Medium</p>
          <p className="text-xs text-amber-600 mt-0.5">
            {riskCount} risks · {missingDocs} missing document
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 py-5">
        {decision === "pending" && (
          <div className="space-y-2.5">
            <button
              onClick={() => onDecide("approved")}
              className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 rounded-lg transition-colors"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8l3.5 3.5L13 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Approve Order
            </button>
            <button
              onClick={() => onDecide("changes")}
              className="w-full text-sm font-medium text-slate-700 border border-gray-200 hover:bg-gray-50 px-4 py-2.5 rounded-lg transition-colors"
            >
              Request Changes
            </button>
            <button
              onClick={() => onDecide("rejected")}
              className="w-full text-sm font-medium text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-lg transition-colors"
            >
              Reject Order
            </button>
          </div>
        )}

        {decision === "approved" && (
          <div>
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 mb-4">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                  <svg
                    className="h-3.5 w-3.5 text-white"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 7l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-emerald-800">
                  Order Approved
                </p>
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed">
                {ORDER.id} has been approved and moved to the fulfillment queue.
              </p>
            </div>
            <div className="space-y-2">
              {[
                "Encounter form queued",
                "Invoice generation initiated",
                "Operations team notified",
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-emerald-500 text-xs font-bold">✓</span>
                  <span className="text-xs text-slate-500">{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {decision === "changes" && (
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
            <p className="text-sm font-semibold text-amber-800 mb-1.5">
              Changes Requested
            </p>
            <p className="text-xs text-amber-700 leading-relaxed">
              The submitter has been notified to review and resubmit {ORDER.id}.
            </p>
          </div>
        )}

        {decision === "rejected" && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-sm font-semibold text-red-800 mb-1.5">
              Order Rejected
            </p>
            <p className="text-xs text-red-700 leading-relaxed">
              {ORDER.id} has been rejected and the submitter has been notified.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Sidebar: Next Stage Preview ──────────────────────────────────────────────

function NextStagePreview() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Next Stage
        </p>
      </div>
      <div className="px-5 py-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
            <svg
              className="h-4 w-4 text-slate-500"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="2"
                width="10"
                height="12"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M6 6h4M6 9h4M6 12h2"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Generate Documents
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Encounter form, invoice, and POD
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Once approved, documents are generated automatically and the order
          moves to the fulfillment team.
        </p>
      </div>
    </div>
  )
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function OrderReviewPage() {
  const router = useRouter()
  const [notes, setNotes] = useState("")
  const [decision, setDecision] = useState<Decision>("pending")

  useEffect(() => {
    if (decision === "approved") {
      const t = setTimeout(() => router.push("/documents?approved=1"), 1500)
      return () => clearTimeout(t)
    }
  }, [decision, router])

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
          <span>Orders</span>
          <span>/</span>
          <span className="text-slate-700 font-medium">Review</span>
        </nav>

        {/* Page heading */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-semibold text-slate-900">Order Review</h2>
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-amber-50 text-amber-700 mt-px">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Pending Approval
            </span>
          </div>
          <p className="text-sm text-slate-500 max-w-2xl mb-3">
            Review pricing, documentation, insurance requirements, and operational
            risks before approval.
          </p>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="font-mono font-semibold text-slate-600">{ORDER.id}</span>
            <span>·</span>
            <span>Submitted {ORDER.submittedAt}</span>
            <span>·</span>
            <span>
              by{" "}
              <span className="font-medium text-slate-600">{ORDER.submittedBy}</span>
            </span>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
          {/* Left: review sections */}
          <div className="space-y-6 min-w-0">
            <PatientSummary />
            <OrderDetails />
            <PricingBreakdown />
            <OperationalRisks />
            <ApprovalImpact />
            <ManagerNotes value={notes} onChange={setNotes} />
          </div>

          {/* Right: sticky panel */}
          <div className="sticky top-20 flex flex-col gap-5">
            <ApprovalPanel decision={decision} onDecide={setDecision} />
            <NextStagePreview />
          </div>
        </div>
      </main>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import AppHeader from "@/app/components/AppHeader"

// ─── Mock data ────────────────────────────────────────────────────────────────

type RequirementStatus = "Required" | "No" | "Review"
type CatalogStatus = "Active" | "Inactive"

type CatalogItem = {
  id: number
  product: string
  vendor: string
  cost: number
  billable: number
  measurements: RequirementStatus
  priorAuth: RequirementStatus
  status: CatalogStatus
}

const CATALOG: CatalogItem[] = [
  {
    id: 1,
    product: "Compression Sleeve – Grade 2",
    vendor: "Juzo USA",
    cost: 89.5,
    billable: 225.0,
    measurements: "Required",
    priorAuth: "No",
    status: "Active",
  },
  {
    id: 2,
    product: "Lymphedema Kit – Full Arm",
    vendor: "Solaris Medical",
    cost: 145.0,
    billable: 380.0,
    measurements: "Required",
    priorAuth: "Review",
    status: "Active",
  },
  {
    id: 3,
    product: "Breast Prosthesis – Custom Fit",
    vendor: "Amoena Care",
    cost: 210.0,
    billable: 495.0,
    measurements: "No",
    priorAuth: "Required",
    status: "Active",
  },
  {
    id: 4,
    product: "Compression Garment – Lower Limb",
    vendor: "Medi USA",
    cost: 120.0,
    billable: 315.0,
    measurements: "Required",
    priorAuth: "No",
    status: "Active",
  },
  {
    id: 5,
    product: "Compression Stockings – Class III",
    vendor: "Medi USA",
    cost: 78.0,
    billable: 195.0,
    measurements: "Required",
    priorAuth: "No",
    status: "Active",
  },
  {
    id: 6,
    product: "Lymphedema Sleeve & Gauntlet",
    vendor: "CircAid Medical",
    cost: 155.0,
    billable: 395.0,
    measurements: "Required",
    priorAuth: "Review",
    status: "Active",
  },
  {
    id: 7,
    product: "Post-Mastectomy Bra",
    vendor: "Amoena Care",
    cost: 85.0,
    billable: 210.0,
    measurements: "No",
    priorAuth: "Required",
    status: "Active",
  },
  {
    id: 8,
    product: "Arm Sleeve – Post-Op Grade 3",
    vendor: "Juzo USA",
    cost: 95.0,
    billable: 240.0,
    measurements: "Required",
    priorAuth: "No",
    status: "Active",
  },
]

const SUMMARY_METRICS = [
  { label: "Products", value: "128", subtext: "In active catalog" },
  { label: "Active Vendors", value: "14", subtext: "Under contract" },
  { label: "Require Measurements", value: "36", subtext: "Compression products" },
  { label: "Require Prior Auth", value: "22", subtext: "Insurance requirement" },
]

const OPERATIONAL_RULES = [
  {
    label: "Measurements required for compression products",
    description:
      "Certified therapist measurements must be uploaded before an order can be processed.",
  },
  {
    label: "Prior authorization required for breast prosthesis orders",
    description:
      "PA documentation must be verified with the insurance provider before fulfillment.",
  },
  {
    label: "Minimum margin threshold: 30%",
    description:
      "Orders below 30% margin are flagged automatically for manager review before approval.",
  },
  {
    label: "Preferred vendors selected automatically",
    description:
      "Vendor selection is driven by margin performance, fulfillment speed, and contract terms.",
  },
  {
    label: "Vendor contracts reviewed quarterly",
    description:
      "Pricing and contract terms are audited and updated each quarter.",
  },
]

const PRICING_STEPS = [
  {
    label: "Vendor Cost",
    detail: "Base cost sourced from active vendor contract.",
  },
  {
    label: "Fee Schedule Adjustment",
    detail: "Adjusted to the insurance plan's fee schedule rate.",
  },
  {
    label: "Insurance Rules Applied",
    detail: "Plan-specific rules, co-pays, and coverage limits applied.",
  },
  {
    label: "Margin Calculation",
    detail: "Margin computed as (Billable − Cost) ÷ Billable.",
  },
  {
    label: "Final Billable Amount",
    detail: "Confirmed amount passed to invoice generation.",
  },
]

const FUTURE_AI = [
  "Suggest optimal vendor based on historical margin",
  "Predict prior authorization requirements by product",
  "Detect unusual pricing deviations automatically",
  "Recommend fulfillment routing by region",
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
}

function margin(cost: number, billable: number) {
  return Math.round(((billable - cost) / billable) * 100)
}

// ─── Shared primitives ────────────────────────────────────────────────────────

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

// ─── Requirement badge ────────────────────────────────────────────────────────

const reqStyles: Record<RequirementStatus, string> = {
  Required: "bg-amber-50 text-amber-700",
  No: "bg-gray-100 text-gray-500",
  Review: "bg-blue-50 text-blue-700",
}

function RequirementBadge({ value }: { value: RequirementStatus }) {
  return (
    <span
      className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${reqStyles[value]}`}
    >
      {value}
    </span>
  )
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function ActiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-700">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      Active
    </span>
  )
}

// ─── Summary metrics ──────────────────────────────────────────────────────────

function SummaryMetrics() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      {SUMMARY_METRICS.map((m, i) => (
        <div
          key={i}
          className="bg-white rounded-lg border border-gray-100 shadow-sm px-4 py-3.5"
        >
          <p className="text-xs text-slate-500 truncate">{m.label}</p>
          <p className="mt-0.5 text-2xl font-semibold tracking-tight text-slate-900">
            {m.value}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">{m.subtext}</p>
        </div>
      ))}
    </div>
  )
}

// ─── Catalog table ────────────────────────────────────────────────────────────

function CatalogTable() {
  const [query, setQuery] = useState("")

  const filtered = query.trim()
    ? CATALOG.filter(
        (item) =>
          item.product.toLowerCase().includes(query.toLowerCase()) ||
          item.vendor.toLowerCase().includes(query.toLowerCase())
      )
    : CATALOG

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header with search */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Catalog Inventory
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {filtered.length} of {CATALOG.length} products
          </p>
        </div>
        <div className="relative shrink-0">
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products or vendors…"
            className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-slate-400 placeholder:text-slate-300 transition-colors w-52"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              {[
                "Product",
                "Vendor",
                "Cost",
                "Billable",
                "Margin",
                "Measurements",
                "Prior Auth",
                "Status",
              ].map((h, i) => (
                <th
                  key={i}
                  className={`text-xs font-semibold text-slate-400 px-5 py-3 ${
                    i === 0 ? "text-left pl-6" : i <= 4 ? "text-right" : "text-center"
                  } last:pr-6`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-8 text-center text-xs text-slate-300"
                >
                  No products match &ldquo;{query}&rdquo;
                </td>
              </tr>
            ) : (
              filtered.map((item) => {
                const m = margin(item.cost, item.billable)
                return (
                  <tr
                    key={item.id}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50/40 transition-colors"
                  >
                    <td className="px-5 pl-6 py-3">
                      <p className="text-sm font-medium text-slate-800">
                        {item.product}
                      </p>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <p className="text-sm text-slate-500">{item.vendor}</p>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className="text-sm text-slate-500 tabular-nums">
                        {fmt(item.cost)}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className="text-sm font-semibold text-slate-800 tabular-nums">
                        {fmt(item.billable)}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span
                        className={`text-sm font-semibold tabular-nums ${
                          m >= 60
                            ? "text-emerald-600"
                            : m >= 30
                            ? "text-slate-700"
                            : "text-red-600"
                        }`}
                      >
                        {m}%
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <RequirementBadge value={item.measurements} />
                    </td>
                    <td className="px-5 py-3 text-center">
                      <RequirementBadge value={item.priorAuth} />
                    </td>
                    <td className="px-5 pr-6 py-3 text-center">
                      <ActiveBadge />
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/40 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Showing {filtered.length} products
        </span>
        <button className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
          Export catalog →
        </button>
      </div>
    </div>
  )
}

// ─── Sidebar: Operational Rules ───────────────────────────────────────────────

function OperationalRules() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-slate-900">Operational Rules</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Business rules that drive workflow behavior
        </p>
      </div>
      <div className="divide-y divide-gray-50">
        {OPERATIONAL_RULES.map((rule, i) => (
          <div key={i} className="px-5 py-3.5 flex gap-3">
            <div className="h-5 w-5 rounded bg-slate-100 flex items-center justify-center shrink-0 mt-px">
              <svg
                className="h-3 w-3 text-slate-500"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 6h8M6 2l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800 leading-snug">
                {rule.label}
              </p>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                {rule.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Sidebar: Pricing Logic ───────────────────────────────────────────────────

function PricingLogic() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-slate-900">Pricing Logic</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          How billable amounts are calculated
        </p>
      </div>
      <div className="px-5 py-4">
        {PRICING_STEPS.map((step, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center shrink-0">
              <div className="h-6 w-6 rounded-full bg-slate-900 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white leading-none">
                  {i + 1}
                </span>
              </div>
              {i < PRICING_STEPS.length - 1 && (
                <div className="w-px flex-1 bg-gray-200 my-1 min-h-[12px]" />
              )}
            </div>
            <div className="pb-3.5 last:pb-0 min-w-0">
              <p className="text-xs font-semibold text-slate-800 leading-snug">
                {step.label}
              </p>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                {step.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
        <p className="text-xs text-slate-400 leading-relaxed">
          Calculations are managed in the catalog. No hidden spreadsheet formulas.
        </p>
      </div>
    </div>
  )
}

// ─── Sidebar: Future AI Opportunities ────────────────────────────────────────

function FutureAI() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Future AI Opportunities
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Identified workflow enhancements
          </p>
        </div>
        <span className="text-xs font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded shrink-0 mt-0.5">
          Roadmap
        </span>
      </div>
      <div className="px-5 py-4 space-y-3">
        {FUTURE_AI.map((item, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className="h-5 w-5 rounded-full border border-gray-200 bg-white flex items-center justify-center shrink-0 mt-px">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
            </div>
            <p className="text-xs text-slate-400 leading-snug">{item}</p>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
        <p className="text-xs text-slate-400 leading-relaxed">
          These enhancements are identified but not part of the current
          operational workflow.
        </p>
      </div>
    </div>
  )
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader activePage="catalog" />

      <main className="max-w-screen-xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-slate-700 transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">Catalog</span>
        </nav>

        {/* Page heading */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900">
            Product &amp; Vendor Catalog
          </h2>
          <p className="mt-1 text-sm text-slate-500 max-w-2xl">
            Centralized product, pricing, vendor, and operational rule management.
          </p>
        </div>

        {/* Summary metrics — full width */}
        <SummaryMetrics />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">
          {/* Left: catalog table */}
          <div className="min-w-0">
            <CatalogTable />
          </div>

          {/* Right: sidebar cards */}
          <div className="flex flex-col gap-5">
            <OperationalRules />
            <PricingLogic />
            <FutureAI />
          </div>
        </div>
      </main>
    </div>
  )
}

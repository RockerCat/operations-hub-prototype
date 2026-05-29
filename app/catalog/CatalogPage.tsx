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

type ImpactDir = "up" | "down"

const AI_OPPORTUNITIES: {
  id: number
  title: string
  currentProcess: string
  aiOpportunity: string
  impact: string
  impactDir: ImpactDir
}[] = [
  {
    id: 1,
    title: "Vendor Recommendation Engine",
    currentProcess:
      "Operations staff manually compare vendors based on pricing, margin, and fulfillment performance for each order.",
    aiOpportunity:
      "Recommend the optimal vendor using historical profitability, fulfillment speed, inventory availability, and regional performance data.",
    impact: "Reduce vendor selection time by 60%",
    impactDir: "down",
  },
  {
    id: 2,
    title: "Prior Authorization Prediction",
    currentProcess:
      "Teams manually determine whether insurance prior authorization may be required before order submission.",
    aiOpportunity:
      "Predict authorization requirements before order submission using historical approval patterns and insurance plan data.",
    impact: "Reduce processing delays and rework",
    impactDir: "down",
  },
  {
    id: 3,
    title: "Pricing Anomaly Detection",
    currentProcess:
      "Managers manually identify unusual margins or pricing inconsistencies during the order approval review.",
    aiOpportunity:
      "Automatically detect abnormal pricing behavior, low-margin orders, or potential billing errors before they reach the approval queue.",
    impact: "Reduce approval escalations",
    impactDir: "down",
  },
  {
    id: 4,
    title: "Fulfillment Routing Optimization",
    currentProcess:
      "Fulfillment teams manually select fulfillment paths and vendor assignments for each approved order.",
    aiOpportunity:
      "Recommend optimal fulfillment routing based on geography, inventory levels, vendor performance history, and delivery SLAs.",
    impact: "Improve delivery speed and operational scalability",
    impactDir: "up",
  },
]

const IMPACT_METRICS: { dir: ImpactDir; value: string | null; label: string }[] = [
  { dir: "down", value: "30%", label: "Order Review Time" },
  { dir: "down", value: "20%", label: "Processing Delays" },
  { dir: "down", value: "15%", label: "Fulfillment Turnaround Time" },
  { dir: "up", value: null, label: "Margin Consistency" },
  { dir: "up", value: null, label: "Operational Scalability" },
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

// ─── AI Opportunity Card ──────────────────────────────────────────────────────

function AIOpportunityCard({
  opp,
}: {
  opp: (typeof AI_OPPORTUNITIES)[number]
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-start justify-between gap-3 mb-4">
          <h4 className="text-sm font-semibold text-slate-900 leading-snug">
            {opp.title}
          </h4>
          <span className="text-xs font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded shrink-0 mt-px">
            Future
          </span>
        </div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
          Current Process
        </p>
        <p className="text-xs text-slate-500 leading-relaxed">
          {opp.currentProcess}
        </p>
      </div>

      {/* AI Opportunity — visually distinguished */}
      <div className="mx-5 mb-4 rounded-lg bg-slate-50 px-4 py-3">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          AI Opportunity
        </p>
        <p className="text-xs text-slate-700 leading-relaxed">
          {opp.aiOpportunity}
        </p>
      </div>

      {/* Expected Impact */}
      <div className="px-5 pb-5 mt-auto pt-3 border-t border-gray-100">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
          Expected Impact
        </p>
        <p
          className={`text-xs font-semibold ${
            opp.impactDir === "down" ? "text-emerald-600" : "text-blue-600"
          }`}
        >
          {opp.impactDir === "down" ? "↓" : "↑"} {opp.impact}
        </p>
      </div>
    </div>
  )
}

// ─── Executive Summary ────────────────────────────────────────────────────────

function ExecutiveSummary() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-slate-900">
          Estimated Business Impact
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Projected outcomes based on comparable operational workflow
          improvements.
        </p>
      </div>
      <div className="px-6 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-2.5 mb-5">
          {IMPACT_METRICS.map((m, i) => (
            <div key={i} className="flex items-center gap-3">
              <span
                className={`text-base font-bold w-12 shrink-0 tabular-nums ${
                  m.dir === "down" ? "text-emerald-600" : "text-blue-600"
                }`}
              >
                {m.dir === "down" ? "↓" : "↑"}
                {m.value ? ` ${m.value}` : ""}
              </span>
              <span className="text-xs font-medium text-slate-600">
                {m.label}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            These opportunities are not part of the current MVP and represent
            future AI-enabled workflow enhancements identified through process
            analysis.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── AI Roadmap Section ───────────────────────────────────────────────────────

function AIRoadmapSection() {
  return (
    <section className="mt-10 pb-10">
      {/* Section header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
            AI Opportunities Roadmap
          </p>
          <p className="text-sm text-slate-500 max-w-2xl">
            Potential workflow enhancements identified during process analysis.
          </p>
        </div>
        <span className="text-xs font-semibold bg-slate-100 text-slate-500 px-2.5 py-1 rounded-lg shrink-0">
          Roadmap
        </span>
      </div>

      {/* 2 × 2 opportunity cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        {AI_OPPORTUNITIES.map((opp) => (
          <AIOpportunityCard key={opp.id} opp={opp} />
        ))}
      </div>

      {/* Executive Summary */}
      <ExecutiveSummary />
    </section>
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
          </div>
        </div>

        {/* AI Opportunities Roadmap — full-width below the grid */}
        <AIRoadmapSection />
      </main>
    </div>
  )
}

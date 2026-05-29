import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Operations Hub — PM Case Study",
  description:
    "A Product Management case study on replacing spreadsheet-driven medical supply operations with a structured workflow.",
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PAIN_POINTS = [
  "Manual order review with no audit trail or approval history",
  "Spreadsheet-driven pricing creates inconsistent margin decisions",
  "Document preparation is slow, manual, and error-prone",
  "No centralized view of order status across the workflow",
  "Operational knowledge lives in individuals, not systems",
]

const SOLUTIONS = [
  {
    title: "Centralized Operations Dashboard",
    description:
      "Single operational view for approvals, work queue, payments, fulfillment status, and proactive risk alerts.",
    icon: "dashboard",
    href: "/dashboard",
    impact: "↓ Faster operational visibility",
  },
  {
    title: "Structured Order Workflow",
    description:
      "Guided order creation and approval process with built-in validation, documentation checks, and operational intelligence.",
    icon: "workflow",
    href: "/orders/new",
    impact: "↓ Reduced approval delays",
  },
  {
    title: "Automated Document Generation",
    description:
      "Encounter forms, invoices, and proof of delivery generated automatically when an order is approved.",
    icon: "documents",
    href: "/documents",
    impact: "↓ Reduced administrative effort",
  },
  {
    title: "Centralized Product & Vendor Catalog",
    description:
      "Products, pricing rules, vendor relationships, and operational requirements managed in one place.",
    icon: "catalog",
    href: "/catalog",
    impact: "↓ Improved pricing consistency",
  },
]

const MVP_MUST = [
  "Operations Dashboard",
  "Order Creation",
  "Approval Workflow",
  "Documents Center",
  "Product & Vendor Catalog",
]

const MVP_SHOULD = [
  "Workflow Automation",
  "Approval Confidence Indicators",
  "Business Rule Engine",
]

const MVP_FUTURE = [
  "Vendor Recommendation Engine",
  "Prior Authorization Prediction",
  "Pricing Anomaly Detection",
  "Fulfillment Optimization",
]

const WORKFLOW_STEPS = [
  {
    step: 1,
    title: "Dashboard",
    description: "Real-time operational view of approvals, work queue, and risk alerts.",
    href: "/dashboard",
  },
  {
    step: 2,
    title: "Create Order",
    description: "Guided patient order creation with workflow validation.",
    href: "/orders/new",
  },
  {
    step: 3,
    title: "Review & Approval",
    description: "Manager review with operational risk indicators and confidence score.",
    href: "/orders/review",
  },
  {
    step: 4,
    title: "Documents Generated",
    description: "Automatic document generation triggered by the approval decision.",
    href: "/documents",
  },
  {
    step: 5,
    title: "Catalog & Rules",
    description: "Centralized product catalog with pricing logic and business rules.",
    href: "/catalog",
  },
  {
    step: 6,
    title: "AI Opportunities",
    description: "Future AI enhancements identified during process analysis.",
    href: "/catalog",
  },
]

const AI_OPPORTUNITIES = [
  {
    title: "Vendor Recommendation Engine",
    description:
      "Recommend optimal vendors using historical profitability, fulfillment speed, and regional performance.",
  },
  {
    title: "Prior Authorization Prediction",
    description:
      "Predict authorization requirements before order submission using historical approval patterns.",
  },
  {
    title: "Pricing Anomaly Detection",
    description:
      "Automatically detect abnormal pricing behavior, low-margin orders, or billing errors.",
  },
  {
    title: "Fulfillment Routing Optimization",
    description:
      "Recommend optimal fulfillment routing based on geography, inventory, and vendor performance.",
  },
]

const CATEGORY_STYLES: Record<string, string> = {
  Workflow: "bg-blue-50 text-blue-700",
  Automation: "bg-emerald-50 text-emerald-700",
  "MVP Strategy": "bg-amber-50 text-amber-700",
  "Data Management": "bg-purple-50 text-purple-700",
}

const KEY_DECISIONS = [
  {
    title: "Why Approval Before Fulfillment?",
    category: "Workflow",
    rationale:
      "Approval was intentionally positioned before fulfillment to ensure pricing validation, insurance requirements, and operational risk reviews are completed before downstream work begins. This reduces rework, fulfillment delays, and financial exposure.",
  },
  {
    title: "Why Automated Document Generation?",
    category: "Automation",
    rationale:
      "Document generation occurs automatically after approval to eliminate repetitive administrative work. This ensures every approved order follows a consistent documentation process without manual intervention.",
  },
  {
    title: "Why A Centralized Product Catalog?",
    category: "Data Management",
    rationale:
      "Products, pricing rules, vendor relationships, and operational requirements were consolidated into a single source of truth. This removes spreadsheet dependencies and ensures consistent operational decision-making across teams.",
  },
  {
    title: "Why AI Was Excluded From The MVP?",
    category: "MVP Strategy",
    rationale:
      "The MVP focuses on workflow standardization, operational visibility, and process consistency first. AI opportunities were intentionally identified but deferred until sufficient operational data exists to support reliable machine learning models.",
  },
]

const ROLE_ITEMS = [
  "Product Discovery",
  "Workflow Analysis",
  "Business Process Mapping",
  "MVP Definition",
  "Prioritization (MoSCoW)",
  "UX Collaboration",
  "Operational Workflow Design",
  "AI Opportunity Identification",
]

const BUSINESS_OUTCOMES = [
  { metric: "Order Approval Time", current: "1–2 Days", target: "Same Day" },
  { metric: "Document Preparation", current: "30+ Minutes Per Order", target: "Automated" },
  { metric: "Operational Visibility", current: "Fragmented Across Teams", target: "Centralized Dashboard" },
  { metric: "Pricing Consistency", current: "Manual Review", target: "Rule-Based Validation" },
  { metric: "Workflow Scalability", current: "People-Dependent", target: "System-Driven" },
  { metric: "Approval Confidence", current: "Experience-Based", target: "Data-Supported" },
]

const PROTOTYPE_INCLUDES = [
  "Operations Dashboard",
  "Order Creation Workflow",
  "Approval & Risk Review",
  "Automated Documents Center",
  "Product & Vendor Catalog",
  "AI Opportunities Roadmap",
]

const FOCUS_AREAS = [
  "Product Strategy",
  "Workflow Design",
  "MVP Prioritization",
  "Operational Efficiency",
  "Business Process Modernization",
  "AI Opportunity Identification",
]

// ─── Inline icon SVGs ─────────────────────────────────────────────────────────

function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  if (name === "dashboard") {
    return (
      <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.9" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.5" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.5" />
        <rect x="11" y="11" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.25" />
      </svg>
    )
  }
  if (name === "workflow") {
    return (
      <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="4" cy="10" r="2.5" fill="currentColor" />
        <circle cx="10" cy="10" r="2.5" fill="currentColor" opacity="0.6" />
        <circle cx="16" cy="10" r="2.5" fill="currentColor" opacity="0.3" />
        <path d="M6.5 10h1M11 10h1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
  if (name === "documents") {
    return (
      <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="4" y="2" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
  if (name === "catalog") {
    return (
      <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="16" height="3" rx="1" fill="currentColor" opacity="0.9" />
        <rect x="2" y="8.5" width="16" height="3" rx="1" fill="currentColor" opacity="0.55" />
        <rect x="2" y="13" width="16" height="3" rx="1" fill="currentColor" opacity="0.25" />
      </svg>
    )
  }
  return null
}

// ─── Landing Header ───────────────────────────────────────────────────────────

function LandingHeader() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-lg bg-slate-900 flex items-center justify-center shrink-0">
            <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor" opacity="0.6" />
              <rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.6" />
              <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.3" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 leading-none">Operations Hub</p>
            <p className="text-xs text-slate-400 mt-0.5 leading-none">PM Case Study</p>
          </div>
        </div>
        <Link
          href="/dashboard"
          className="text-xs font-medium text-white px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 transition-colors flex items-center gap-1.5"
        >
          Launch Prototype
          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const CONTEXT_CARDS = [
  { label: "Problem Solved", value: "Spreadsheet-driven operations" },
  { label: "Solution", value: "Workflow modernization platform" },
  { label: "MVP Scope", value: "Must Have + Should Have features" },
  { label: "Future Vision", value: "AI-enabled operational intelligence" },
]

function HeroSection() {
  return (
    <section className="bg-white border-b border-gray-100 py-12">
      <div className="max-w-screen-xl mx-auto px-6">

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-start">

          {/* Left — title, description, CTAs */}
          <div>
            <span className="inline-block text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg mb-6">
              Product Management Case Study
            </span>
            <h1 className="text-3xl font-semibold text-slate-900 mb-2 tracking-tight">
              Operations Hub
            </h1>
            <p className="text-lg font-medium text-slate-600 mb-5">
              Medical Supply Operations Workflow Modernization
            </p>
            <p className="text-sm text-slate-500 leading-relaxed mb-8 max-w-lg">
              A Product Management case study focused on replacing a
              spreadsheet-driven workflow used to manage patient orders, pricing
              approvals, document generation, and fulfillment operations.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href="/dashboard"
                className="text-sm font-semibold text-white px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-700 transition-colors flex items-center gap-2"
              >
                Launch Prototype
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 7h8M8 4l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <a
                href="#mvp-scope"
                className="text-sm font-medium text-slate-700 px-5 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                View MVP Scope
              </a>
            </div>
          </div>

          {/* Right — decorative illustration */}
          <div className="flex items-center justify-center py-4">
            <Image
              src="/illustration.png"
              alt=""
              width={1536}
              height={1024}
              className="w-full max-w-[90%] h-auto object-contain opacity-[0.88]"
              priority
            />
          </div>
        </div>

        {/* Context cards — replaces stat row */}
        <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CONTEXT_CARDS.map((card, i) => (
            <div key={i} className="min-w-0">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                {card.label}
              </p>
              <p className="text-sm font-semibold text-slate-800 leading-snug">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Business Problem ─────────────────────────────────────────────────────────

function ProblemSection() {
  return (
    <section className="bg-gray-50 py-16 border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              The Problem
            </p>
            <h2 className="text-xl font-semibold text-slate-900 mb-5">
              Spreadsheet-Driven Operations
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Many medical supply providers still rely on spreadsheets, email
              chains, and manual reviews to process patient orders. Each step
              in the workflow depends on individual knowledge rather than
              structured processes.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              This creates operational bottlenecks, approval delays,
              inconsistent pricing decisions, and limited scalability as the
              business grows.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              Pain Points
            </p>
            <div className="space-y-3">
              {PAIN_POINTS.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-px">
                    <svg className="h-3 w-3 text-red-500" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M6 3v4M6 9h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-600 leading-snug">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── My Role ─────────────────────────────────────────────────────────────────

function RoleSection() {
  return (
    <section className="bg-white py-16 border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              My Role
            </p>
            <h2 className="text-xl font-semibold text-slate-900 mb-5">
              Product Lead
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              As Product Lead, I was responsible for defining the product
              vision, analyzing operational workflows, identifying business pain
              points, prioritizing requirements, and designing the MVP roadmap.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed border-l-2 border-gray-200 pl-3">
              This case study focuses on product strategy, workflow
              modernization, operational efficiency, and future-state
              opportunity analysis.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              Responsibilities
            </p>
            <div className="flex flex-wrap gap-2">
              {ROLE_ITEMS.map((item, i) => (
                <span
                  key={i}
                  className="inline-block text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Solution Overview ────────────────────────────────────────────────────────

function SolutionSection() {
  return (
    <section className="bg-white py-16 border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto px-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Proposed Solution
        </p>
        <h2 className="text-xl font-semibold text-slate-900 mb-8">
          Four Operational Modules
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SOLUTIONS.map((sol) => (
            <Link
              key={sol.title}
              href={sol.href}
              className="group bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-gray-200 transition-all duration-150"
            >
              <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center mb-4 text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                <Icon name={sol.icon} />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">
                {sol.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {sol.description}
              </p>
              <p className="mt-3 text-xs text-slate-400">
                <span className="font-medium text-slate-500">Expected Outcome:</span>{" "}
                {sol.impact}
              </p>
              <p className="mt-2 text-xs font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                View in prototype →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── MVP Scope ────────────────────────────────────────────────────────────────

function MVPSection() {
  return (
    <section id="mvp-scope" className="bg-gray-50 py-16 border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto px-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          MVP Scope
        </p>
        <h2 className="text-xl font-semibold text-slate-900 mb-8">
          Prioritization Framework
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Must Have */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-emerald-100 bg-emerald-50 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <p className="text-xs font-semibold text-emerald-700">Must Have</p>
            </div>
            <div className="p-5 space-y-2.5">
              {MVP_MUST.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <svg className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-px" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeWidth="1" />
                    <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-xs text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Should Have */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-blue-100 bg-blue-50 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <p className="text-xs font-semibold text-blue-700">Should Have</p>
            </div>
            <div className="p-5 space-y-2.5">
              {MVP_SHOULD.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <svg className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-px" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeWidth="1" />
                    <circle cx="7" cy="7" r="2" fill="currentColor" />
                  </svg>
                  <p className="text-xs text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Future */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gray-300" />
              <p className="text-xs font-semibold text-slate-500">Future</p>
              <span className="ml-auto text-xs font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                AI
              </span>
            </div>
            <div className="p-5 space-y-2.5">
              {MVP_FUTURE.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <svg className="h-3.5 w-3.5 text-slate-300 shrink-0 mt-px" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                  </svg>
                  <p className="text-xs text-slate-400">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Prototype Walkthrough ────────────────────────────────────────────────────

function WorkflowSection() {
  return (
    <section className="bg-white py-16 border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto px-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Prototype Walkthrough
        </p>
        <h2 className="text-xl font-semibold text-slate-900 mb-8">
          Workflow Demonstration
        </h2>

        {/* Horizontal flow — scrollable on mobile */}
        <div className="flex items-start gap-0 overflow-x-auto pb-4">
          {WORKFLOW_STEPS.map((step, i) => (
            <div key={step.step} className="flex items-start shrink-0">
              <Link href={step.href} className="group w-[160px] min-w-[140px]">
                <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center mb-3 group-hover:bg-blue-600 transition-colors">
                  <span className="text-xs font-bold text-white">{step.step}</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug mb-1">
                  {step.title}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </Link>
              {i < WORKFLOW_STEPS.length - 1 && (
                <div className="flex items-center h-4 mt-2 mx-2 shrink-0">
                  <svg className="h-4 w-4 text-slate-300" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── AI Opportunities ─────────────────────────────────────────────────────────

function AISection() {
  return (
    <section className="bg-gray-50 py-16 border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto px-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Future AI Opportunities
        </p>
        <div className="flex items-start justify-between gap-6 mb-8 flex-wrap">
          <div className="max-w-xl">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Identified AI Enhancements
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              The MVP focuses on workflow modernization and operational
              visibility. AI capabilities were intentionally identified as future
              enhancements after the core workflow foundation was established.
            </p>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors shrink-0 mt-1"
          >
            View full AI roadmap in Catalog →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {AI_OPPORTUNITIES.map((opp, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                  Future
                </span>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1.5">
                {opp.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {opp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Key Product Decisions ────────────────────────────────────────────────────

function KeyDecisionsSection() {
  return (
    <section className="bg-gray-50 py-16 border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto px-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Product Decisions
        </p>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Product Decisions
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed mb-8 max-w-2xl">
          Key product strategy decisions that shaped the MVP scope.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {KEY_DECISIONS.map((decision, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
            >
              <span
                className={`inline-block text-xs font-semibold px-2 py-0.5 rounded mb-3 ${
                  CATEGORY_STYLES[decision.category] ?? "bg-slate-100 text-slate-600"
                }`}
              >
                {decision.category}
              </span>
              <h3 className="text-sm font-semibold text-slate-900 mb-2 leading-snug">
                {decision.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {decision.rationale}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Business Outcomes ────────────────────────────────────────────────────────

function BusinessOutcomesSection() {
  return (
    <section className="bg-gray-50 py-16 border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto px-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Expected Business Outcomes
        </p>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Operational Impact
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed mb-8 max-w-2xl">
          Projected operational improvements based on workflow modernization and
          automation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {BUSINESS_OUTCOMES.map((outcome, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
            >
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                {outcome.metric}
              </p>
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-400 mb-0.5">Current</p>
                  <p className="text-sm font-medium text-slate-600 leading-snug">
                    {outcome.current}
                  </p>
                </div>
                <svg
                  className="h-4 w-4 text-slate-300 shrink-0 mt-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-400 mb-0.5">Target</p>
                  <p className="text-sm font-semibold text-emerald-700 leading-snug">
                    {outcome.target}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-400 leading-relaxed max-w-2xl border-l-2 border-gray-200 pl-3">
          Metrics represent expected operational improvements based on process
          redesign and workflow automation opportunities identified during
          product analysis.
        </p>
      </div>
    </section>
  )
}

// ─── Focus Areas ──────────────────────────────────────────────────────────────

function FocusAreasSection() {
  return (
    <section className="bg-white py-16 border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto px-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          About This Case Study
        </p>
        <h2 className="text-xl font-semibold text-slate-900 mb-8">
          Product Management Focus Areas
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {FOCUS_AREAS.map((area, i) => (
            <span
              key={i}
              className="inline-block text-xs font-semibold text-slate-700 bg-slate-100 px-3.5 py-2 rounded-lg"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTASection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
            Prototype
          </p>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            Launch Full Workflow Prototype
          </h2>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed max-w-lg mx-auto">
            Explore the complete operational journey from order creation through
            approval, document generation, catalog management, and future AI
            opportunities.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-white px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-700 transition-colors flex items-center gap-2"
            >
              Launch Prototype
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 7h8M8 4l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="/catalog"
              className="text-sm font-medium text-slate-700 px-6 py-2.5 rounded-lg border border-gray-200 hover:bg-white transition-colors"
            >
              View Catalog →
            </Link>
          </div>
        </div>

        {/* Checklist */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center mb-5">
            Included in this prototype
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
            {PROTOTYPE_INCLUDES.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
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
                <p className="text-xs font-medium text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LandingHeader />
      <HeroSection />
      <ProblemSection />
      <RoleSection />
      <SolutionSection />
      <KeyDecisionsSection />
      <MVPSection />
      <WorkflowSection />
      <AISection />
      <BusinessOutcomesSection />
      <FocusAreasSection />
      <FinalCTASection />
    </div>
  )
}

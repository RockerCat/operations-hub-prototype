import Link from "next/link"
import AppHeader from "@/app/components/AppHeader"

// ─── Mock data ────────────────────────────────────────────────────────────────

type DocStatus = "Ready" | "Sent" | "Pending Signature"

type GeneratedDoc = {
  id: string
  type: string
  orderId: string
  patient: string
  status: DocStatus
  generated: string
  primaryAction: string
  secondaryAction: string
}

const DOCUMENTS: GeneratedDoc[] = [
  {
    id: "DOC-892-001",
    type: "Encounter Form",
    orderId: "ORD-2024-0892",
    patient: "Maria Rodriguez",
    status: "Ready",
    generated: "5 minutes ago",
    primaryAction: "Preview",
    secondaryAction: "Download",
  },
  {
    id: "DOC-892-002",
    type: "Patient Invoice",
    orderId: "ORD-2024-0892",
    patient: "Maria Rodriguez",
    status: "Sent",
    generated: "4 minutes ago",
    primaryAction: "Preview",
    secondaryAction: "View Status",
  },
  {
    id: "DOC-892-003",
    type: "Proof of Delivery",
    orderId: "ORD-2024-0892",
    patient: "Maria Rodriguez",
    status: "Pending Signature",
    generated: "Waiting for patient",
    primaryAction: "Preview",
    secondaryAction: "Track",
  },
  {
    id: "DOC-889-001",
    type: "Encounter Form",
    orderId: "ORD-2024-0889",
    patient: "Robert Stein",
    status: "Sent",
    generated: "2 hours ago",
    primaryAction: "Preview",
    secondaryAction: "Download",
  },
  {
    id: "DOC-889-002",
    type: "Patient Invoice",
    orderId: "ORD-2024-0889",
    patient: "Robert Stein",
    status: "Sent",
    generated: "2 hours ago",
    primaryAction: "Preview",
    secondaryAction: "View Status",
  },
  {
    id: "DOC-885-001",
    type: "Proof of Delivery",
    orderId: "ORD-2024-0885",
    patient: "Thomas Baker",
    status: "Ready",
    generated: "Yesterday",
    primaryAction: "Preview",
    secondaryAction: "Download",
  },
]

const TEMPLATES = [
  {
    name: "Encounter Form",
    description:
      "Patient demographics, diagnosis codes, insurance details, and product selections pre-populated from the approved order record.",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    name: "Patient Invoice",
    description:
      "Itemized billing statement with products, quantities, unit costs, and billable amounts sourced directly from the order.",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    name: "Proof of Delivery",
    description:
      "Delivery confirmation document with patient signature field, fulfillment reference, and shipment tracking details.",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
]

const SUMMARY = [
  { label: "Documents Generated Today", value: "47", subtext: "+8 this hour" },
  { label: "Pending Signatures", value: "3", subtext: "Awaiting patient" },
  { label: "Invoices Sent", value: "42", subtext: "Last 24 hours" },
  { label: "Failed Deliveries", value: "0", subtext: "No issues today" },
]

const WORKFLOW = [
  { label: "Order Approved", done: true },
  { label: "Documents Generated", done: true },
  { label: "Invoice Sent", done: true },
  { label: "Vendor Fulfillment", done: false },
  { label: "Proof of Delivery Signature", done: false },
]

const AUTOMATED = [
  "Invoice sent automatically",
  "Documents stored in patient folder",
  "Operations team notified",
  "Fulfillment package created",
]

const FUTURE = [
  "Vendor portal submission",
  "Insurance verification automation",
  "Prior authorization tracking",
  "POD signature reminders",
]

// ─── Status badge ─────────────────────────────────────────────────────────────

const statusStyles: Record<DocStatus, { wrapper: string; dot: string }> = {
  Ready: { wrapper: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  Sent: { wrapper: "bg-blue-50 text-blue-700", dot: "bg-blue-500" },
  "Pending Signature": {
    wrapper: "bg-amber-50 text-amber-700",
    dot: "bg-amber-400",
  },
}

function DocStatusBadge({ status }: { status: DocStatus }) {
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

// ─── Document type icon ───────────────────────────────────────────────────────

const docTypeConfig: Record<
  string,
  { iconBg: string; iconColor: string }
> = {
  "Encounter Form": { iconBg: "bg-blue-50", iconColor: "text-blue-500" },
  "Patient Invoice": { iconBg: "bg-emerald-50", iconColor: "text-emerald-500" },
  "Proof of Delivery": { iconBg: "bg-purple-50", iconColor: "text-purple-500" },
}

function DocTypeIcon({ type }: { type: string }) {
  const cfg = docTypeConfig[type] ?? {
    iconBg: "bg-slate-50",
    iconColor: "text-slate-400",
  }
  return (
    <div
      className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${cfg.iconBg}`}
    >
      {type === "Encounter Form" && (
        <svg
          className={`h-3.5 w-3.5 ${cfg.iconColor}`}
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <rect x="3" y="2" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M6 6h4M6 9h4M6 12h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="8" cy="2" r="1.5" fill="currentColor" opacity="0.5" />
        </svg>
      )}
      {type === "Patient Invoice" && (
        <svg
          className={`h-3.5 w-3.5 ${cfg.iconColor}`}
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <rect x="3" y="1.5" width="10" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M6 5.5h4M6 8.5h4M6 11.5h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M3 12.5l1.5 2L6 13l1.5 1.5L9 13l1.5 1.5L12 12.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      )}
      {type === "Proof of Delivery" && (
        <svg
          className={`h-3.5 w-3.5 ${cfg.iconColor}`}
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M5 8.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  )
}

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

// ─── Section 1: Recently Generated Documents ──────────────────────────────────

function RecentDocuments() {
  return (
    <SectionCard>
      <SectionHead
        title="Recently Generated Documents"
        description="Documents automatically created when orders were approved."
        aside={
          <span className="text-xs text-slate-400 shrink-0 mt-0.5">
            {DOCUMENTS.length} documents
          </span>
        }
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">
                Document Type
              </th>
              <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3">
                Order ID
              </th>
              <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3">
                Patient
              </th>
              <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3">
                Status
              </th>
              <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3">
                Generated
              </th>
              <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3 pr-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {DOCUMENTS.map((doc) => (
              <tr
                key={doc.id}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/40 transition-colors"
              >
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2.5">
                    <DocTypeIcon type={doc.type} />
                    <span className="text-sm font-medium text-slate-800">
                      {doc.type}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs text-slate-400">
                    {doc.orderId}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-slate-700">{doc.patient}</span>
                </td>
                <td className="px-4 py-3">
                  <DocStatusBadge status={doc.status} />
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-slate-400">{doc.generated}</span>
                </td>
                <td className="px-4 py-3 pr-6">
                  <div className="flex items-center gap-3">
                    <button className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors">
                      {doc.primaryAction}
                    </button>
                    <button className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
                      {doc.secondaryAction}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/40 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Showing {DOCUMENTS.length} most recent documents
        </span>
        <button className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
          View all documents →
        </button>
      </div>
    </SectionCard>
  )
}

// ─── Section 2: Document Templates ───────────────────────────────────────────

function DocumentTemplates() {
  return (
    <SectionCard>
      <SectionHead
        title="Document Templates"
        description="Patient information, insurance details, product selections, pricing, and fulfillment data are reused automatically."
      />
      <div className="divide-y divide-gray-50">
        {TEMPLATES.map((tpl, i) => (
          <div key={i} className="px-6 py-4 flex items-start gap-4">
            <div
              className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${tpl.iconBg}`}
            >
              <svg
                className={`h-4 w-4 ${tpl.iconColor}`}
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <rect x="2.5" y="1.5" width="11" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M5.5 5.5h5M5.5 8.5h5M5.5 11.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-semibold text-slate-900">{tpl.name}</p>
                <span className="text-xs font-medium bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                  Auto-generated
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {tpl.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/40">
        <p className="text-xs text-slate-400">
          Templates are populated automatically. No manual data entry required.
        </p>
      </div>
    </SectionCard>
  )
}

// ─── Section 3: Document Generation Summary ───────────────────────────────────

function GenerationSummary() {
  return (
    <SectionCard>
      <SectionHead
        title="Document Generation Summary"
        description="Today's operational document activity."
      />
      <div className="grid grid-cols-2 gap-px bg-gray-100">
        {SUMMARY.map((s, i) => (
          <div key={i} className="bg-white p-4">
            <p className="text-xs text-slate-500">{s.label}</p>
            <p className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-900">
              {s.value}
            </p>
            <p className="mt-0.5 text-xs text-slate-400">{s.subtext}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

// ─── Sidebar: Order Progress ──────────────────────────────────────────────────

function OrderProgress() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-slate-900">Order Progress</h3>
        <p className="text-xs text-slate-400 mt-0.5">ORD-2024-0892 · Maria Rodriguez</p>
      </div>
      <div className="px-5 py-4">
        {WORKFLOW.map((step, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center shrink-0">
              <div
                className={`h-2.5 w-2.5 rounded-full mt-0.5 ${
                  step.done ? "bg-emerald-500" : "bg-gray-200"
                }`}
              />
              {i < WORKFLOW.length - 1 && (
                <div
                  className={`w-px flex-1 my-1 min-h-[16px] ${
                    step.done && WORKFLOW[i + 1].done
                      ? "bg-emerald-300"
                      : step.done
                      ? "bg-gray-200"
                      : "bg-gray-200"
                  }`}
                />
              )}
            </div>
            <p
              className={`text-xs pb-3 last:pb-0 leading-snug ${
                step.done
                  ? "font-semibold text-slate-800"
                  : "text-slate-400"
              }`}
            >
              {step.done && (
                <span className="text-emerald-500 mr-1">✓</span>
              )}
              {step.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Sidebar: Automated Actions ───────────────────────────────────────────────

function AutomatedActions() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-slate-900">Automated Actions</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Triggered automatically on approval
        </p>
      </div>
      <div className="px-5 py-4 space-y-3">
        {AUTOMATED.map((action, i) => (
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
            <p className="text-xs text-slate-700">{action}</p>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
        <p className="text-xs text-slate-400 leading-relaxed">
          Actions are triggered automatically once an order is approved. No
          manual steps required.
        </p>
      </div>
    </div>
  )
}

// ─── Sidebar: Future Automation Opportunities ─────────────────────────────────

function FutureOpportunities() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Future Automation Opportunities
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
        {FUTURE.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className="h-5 w-5 rounded-full border border-gray-200 bg-white flex items-center justify-center shrink-0">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
            </div>
            <p className="text-xs text-slate-400">{item}</p>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
        <p className="text-xs text-slate-400 leading-relaxed">
          These enhancements are identified but not yet part of the current
          workflow.
        </p>
      </div>
    </div>
  )
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function DocumentsPage({ approved }: { approved?: boolean }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader activePage="documents" />

      <main className="max-w-screen-xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-slate-700 transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">Documents</span>
        </nav>

        {/* Success banner after approval */}
        {approved && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4 flex items-start gap-3 mb-6">
            <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-px">
              <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 14 14" fill="none">
                <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-800">
                Order approved successfully
              </p>
              <p className="text-xs text-emerald-600 mt-0.5">
                Documents generated automatically. ORD-2024-0892 has been moved to the fulfillment queue.
              </p>
            </div>
          </div>
        )}

        {/* Page heading */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900">
            Documents Center
          </h2>
          <p className="mt-1 text-sm text-slate-500 max-w-2xl">
            Automatically generated operational documents for approved orders.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">
          {/* Left: document management */}
          <div className="space-y-6 min-w-0">
            <RecentDocuments />
            <DocumentTemplates />
            <GenerationSummary />
          </div>

          {/* Right: workflow status (sticky) */}
          <div className="sticky top-20 flex flex-col gap-5">
            <OrderProgress />
            <AutomatedActions />
            <FutureOpportunities />
          </div>
        </div>
      </main>
    </div>
  )
}

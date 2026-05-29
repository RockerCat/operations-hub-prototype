"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AppHeader from "@/app/components/AppHeader"

// ─── Catalog & option lists ───────────────────────────────────────────────────

type CatalogItem = {
  id: number
  name: string
  vendor: string
  unitCost: number
  unitBillable: number
}

const CATALOG: CatalogItem[] = [
  {
    id: 0,
    name: "Compression Sleeve – Grade 2",
    vendor: "Juzo USA",
    unitCost: 89.5,
    unitBillable: 225.0,
  },
  {
    id: 1,
    name: "Lymphedema Kit – Full Arm",
    vendor: "Solaris Medical",
    unitCost: 145.0,
    unitBillable: 380.0,
  },
  {
    id: 2,
    name: "Breast Prosthesis – Custom Fit",
    vendor: "Amoena Care",
    unitCost: 285.0,
    unitBillable: 690.0,
  },
  {
    id: 3,
    name: "Compression Garment – Lower Limb",
    vendor: "Medi USA",
    unitCost: 67.0,
    unitBillable: 175.0,
  },
]

const INSURANCE_PROVIDERS = [
  "BlueCross BlueShield",
  "Aetna",
  "Cigna",
  "United Healthcare",
  "Humana",
  "Medicare",
  "Medicaid",
]

const PLAN_TYPES = ["PPO", "HMO", "EPO", "Medicare Advantage", "Fee-for-Service"]

const NEXT_STEPS = [
  "Submit for Approval",
  "Generate Documents",
  "Send Invoice",
  "Vendor Fulfillment",
  "Proof of Delivery Signature",
]

// ─── Types ────────────────────────────────────────────────────────────────────

type ProductRow = { key: number; catalogId: number; qty: number }

type FormState = {
  patientName: string
  dob: string
  phone: string
  email: string
  address: string
  insuranceProvider: string
  memberId: string
  planType: string
  prescriptionReceived: boolean
  measurementsUploaded: boolean
  priorAuthRequired: boolean
  notes: string
}

// ─── Style tokens ─────────────────────────────────────────────────────────────

const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:border-slate-400 placeholder:text-slate-300 transition-colors"

const labelCls = "block text-xs font-medium text-slate-600 mb-1.5"

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" })
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
}: {
  title: string
  description: string
}) {
  return (
    <div className="px-6 py-4 border-b border-gray-100">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="text-xs text-slate-400 mt-0.5">{description}</p>
    </div>
  )
}

function Field({
  label,
  className = "",
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  )
}

function Checkbox({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`h-4 w-4 rounded border flex-shrink-0 flex items-center justify-center cursor-pointer transition-colors mt-0.5 ${
        checked
          ? "bg-slate-900 border-slate-900"
          : "bg-white border-gray-300 hover:border-slate-400"
      }`}
    >
      {checked && (
        <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 10 10" fill="none">
          <path
            d="M2 5l2.5 2.5L8 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  )
}

// ─── Workflow Progress ────────────────────────────────────────────────────────

type StepStatus = "complete" | "warning" | "pending"

function WorkflowProgress({
  form,
  products,
}: {
  form: FormState
  products: ProductRow[]
}) {
  const patientDone = !!(form.patientName && form.dob && form.phone)
  const insuranceDone = !!(form.insuranceProvider && form.memberId)
  const productsDone = products.length > 0
  const docsDone = form.prescriptionReceived && form.measurementsUploaded

  const steps: { label: string; status: StepStatus; note: string }[] = [
    {
      label: "Patient Information",
      status: patientDone ? "complete" : "pending",
      note: patientDone ? "Complete" : "Fill patient details",
    },
    {
      label: "Insurance Verification",
      status: insuranceDone ? "complete" : "pending",
      note: insuranceDone ? "Verified" : "Add insurance details",
    },
    {
      label: "Product Selection",
      status: productsDone ? "complete" : "pending",
      note: productsDone
        ? `${products.length} product${products.length !== 1 ? "s" : ""} added`
        : "No products yet",
    },
    {
      label: "Documentation",
      status: docsDone ? "complete" : "warning",
      note: docsDone ? "Complete" : "Measurements missing",
    },
    {
      label: "Approval",
      status: "pending",
      note: "Awaiting submission",
    },
  ]

  const warnCount = steps.filter((s) => s.status === "warning").length

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-slate-900">Order Workflow</p>
        {warnCount > 0 ? (
          <span className="text-xs font-medium text-amber-600">
            {warnCount} step{warnCount > 1 ? "s" : ""} require{warnCount === 1 ? "s" : ""} attention
          </span>
        ) : (
          <span className="text-xs text-slate-400">
            Complete all steps before submitting
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {steps.map((step, i) => (
          <div key={i} className="flex-1 min-w-0">
            <div
              className={`h-1 rounded-full mb-2.5 ${
                step.status === "complete"
                  ? "bg-emerald-400"
                  : step.status === "warning"
                  ? "bg-amber-400"
                  : "bg-gray-200"
              }`}
            />
            <div className="flex items-start gap-1">
              <span
                className={`text-xs font-bold shrink-0 leading-none mt-px ${
                  step.status === "complete"
                    ? "text-emerald-500"
                    : step.status === "warning"
                    ? "text-amber-500"
                    : "text-slate-300"
                }`}
              >
                {step.status === "complete"
                  ? "✓"
                  : step.status === "warning"
                  ? "⚠"
                  : String(i + 1)}
              </span>
              <div className="min-w-0">
                <p
                  className={`text-xs font-medium leading-snug truncate ${
                    step.status === "complete"
                      ? "text-slate-700"
                      : step.status === "warning"
                      ? "text-amber-700"
                      : "text-slate-400"
                  }`}
                >
                  {step.label}
                </p>
                <p
                  className={`text-xs mt-0.5 leading-snug truncate ${
                    step.status === "complete"
                      ? "text-emerald-600"
                      : step.status === "warning"
                      ? "text-amber-500"
                      : "text-slate-300"
                  }`}
                >
                  {step.note}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Section 1: Patient Information ──────────────────────────────────────────

function PatientSection({
  form,
  onChange,
}: {
  form: FormState
  onChange: (k: keyof FormState, v: string | boolean) => void
}) {
  return (
    <SectionCard>
      <SectionHead
        title="Patient Information"
        description="Primary patient details and shipping destination."
      />
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Patient Name" className="sm:col-span-2">
          <input
            className={inputCls}
            value={form.patientName}
            onChange={(e) => onChange("patientName", e.target.value)}
            placeholder="Full legal name"
          />
        </Field>
        <Field label="Date of Birth">
          <input
            type="date"
            className={inputCls}
            value={form.dob}
            onChange={(e) => onChange("dob", e.target.value)}
          />
        </Field>
        <Field label="Phone Number">
          <input
            className={inputCls}
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="(555) 000-0000"
          />
        </Field>
        <Field label="Email Address">
          <input
            type="email"
            className={inputCls}
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="patient@email.com"
          />
        </Field>
        <Field label="Shipping Address" className="sm:col-span-2">
          <input
            className={inputCls}
            value={form.address}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="Street address, City, State, ZIP"
          />
        </Field>
      </div>
    </SectionCard>
  )
}

// ─── Section 2: Insurance Information ────────────────────────────────────────

function InsuranceSection({
  form,
  onChange,
}: {
  form: FormState
  onChange: (k: keyof FormState, v: string | boolean) => void
}) {
  return (
    <SectionCard>
      <SectionHead
        title="Insurance Information"
        description="Coverage details required for billing and prior authorization checks."
      />
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Insurance Provider" className="sm:col-span-2">
          <select
            className={inputCls}
            value={form.insuranceProvider}
            onChange={(e) => onChange("insuranceProvider", e.target.value)}
          >
            {INSURANCE_PROVIDERS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </Field>
        <Field label="Member ID">
          <input
            className={inputCls}
            value={form.memberId}
            onChange={(e) => onChange("memberId", e.target.value)}
            placeholder="e.g. BCB-2024-447821"
          />
        </Field>
        <Field label="Plan Type">
          <select
            className={inputCls}
            value={form.planType}
            onChange={(e) => onChange("planType", e.target.value)}
          >
            {PLAN_TYPES.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </Field>
      </div>
    </SectionCard>
  )
}

// ─── Vendor Insight card (used inside ProductsSection) ───────────────────────

function VendorInsight() {
  const points = [
    "Best overall margin for this order",
    "Fastest average fulfillment time",
    "Estimated delivery: 2–3 business days",
  ]
  return (
    <div className="px-6 py-4 border-t border-gray-100 bg-slate-50/60">
      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center shrink-0">
          <svg
            className="h-4 w-4 text-slate-500"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 13V6l6-3 6 3v7"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <rect x="5" y="9" width="2.5" height="4" rx="0.5" fill="currentColor" opacity="0.35" />
            <rect x="8.5" y="9" width="2.5" height="4" rx="0.5" fill="currentColor" opacity="0.35" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Recommended Vendor
            </p>
            <span className="text-xs text-slate-400 shrink-0">Business rules</span>
          </div>
          <p className="text-sm font-semibold text-slate-900">Solaris Medical</p>
          <div className="mt-2 space-y-1.5">
            {points.map((point, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <svg
                  className="h-3 w-3 text-emerald-500 shrink-0"
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
                <p className="text-xs text-slate-600">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Section 3: Product Selection ────────────────────────────────────────────

function ProductsSection({
  products,
  onAdd,
  onRemove,
  onQtyChange,
}: {
  products: ProductRow[]
  onAdd: () => void
  onRemove: (key: number) => void
  onQtyChange: (key: number, qty: number) => void
}) {
  const canAdd = products.length < CATALOG.length

  return (
    <SectionCard>
      <SectionHead
        title="Product Selection"
        description="Add products for this order. Pricing is sourced from the active vendor catalog."
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[580px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">
                Product
              </th>
              <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3">
                Vendor
              </th>
              <th className="text-center text-xs font-semibold text-slate-400 px-4 py-3 w-20">
                Qty
              </th>
              <th className="text-right text-xs font-semibold text-slate-400 px-4 py-3">
                Unit Cost
              </th>
              <th className="text-right text-xs font-semibold text-slate-400 px-4 py-3">
                Billable
              </th>
              <th className="px-4 py-3 w-8" />
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-6 text-center text-xs text-slate-300">
                  No products added yet. Click &quot;Add Product&quot; below.
                </td>
              </tr>
            )}
            {products.map((row) => {
              const cat = CATALOG[row.catalogId]
              return (
                <tr
                  key={row.key}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50/40 transition-colors"
                >
                  <td className="px-6 py-3">
                    <p className="text-sm font-medium text-slate-800">{cat.name}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-500">{cat.vendor}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={row.qty}
                      onChange={(e) =>
                        onQtyChange(row.key, Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-16 border border-gray-200 rounded-md px-2 py-1 text-sm text-center text-slate-800 bg-white focus:outline-none focus:border-slate-400 transition-colors"
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm text-slate-400 tabular-nums">
                      {fmt(cat.unitCost)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm font-semibold text-slate-800 tabular-nums">
                      {fmt(cat.unitBillable * row.qty)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onRemove(row.key)}
                      className="text-slate-300 hover:text-red-400 transition-colors text-lg leading-none w-5 h-5 flex items-center justify-center"
                      aria-label="Remove product"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3.5 border-t border-gray-100 bg-gray-50/40 flex items-center justify-between">
        {canAdd ? (
          <button
            onClick={onAdd}
            className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg
              className="h-3.5 w-3.5"
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
            Add Product
          </button>
        ) : (
          <span className="text-xs text-slate-400">
            All catalog products have been added.
          </span>
        )}
        {products.length > 0 && (
          <span className="text-xs text-slate-400">
            {products.length} product{products.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>
      <VendorInsight />
    </SectionCard>
  )
}

// ─── Section 4: Measurements & Requirements ───────────────────────────────────

function RequirementsSection({
  form,
  onChange,
}: {
  form: FormState
  onChange: (k: keyof FormState, v: string | boolean) => void
}) {
  return (
    <SectionCard>
      <SectionHead
        title="Measurements & Requirements"
        description="Clinical documentation required before this order can be processed."
      />
      <div className="p-6 space-y-6">
        {/* Prescription */}
        <div
          className="flex items-start gap-3 cursor-pointer group"
          onClick={() => onChange("prescriptionReceived", !form.prescriptionReceived)}
        >
          <Checkbox
            checked={form.prescriptionReceived}
            onChange={(v) => onChange("prescriptionReceived", v)}
          />
          <div>
            <p className="text-sm font-medium text-slate-800 group-hover:text-slate-900 transition-colors leading-snug">
              Prescription Received
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Signed physician prescription has been received and filed.
            </p>
          </div>
        </div>

        {/* Measurements with upload area */}
        <div>
          <div
            className="flex items-start gap-3 cursor-pointer group"
            onClick={() => onChange("measurementsUploaded", !form.measurementsUploaded)}
          >
            <Checkbox
              checked={form.measurementsUploaded}
              onChange={(v) => onChange("measurementsUploaded", v)}
            />
            <div>
              <p className="text-sm font-medium text-slate-800 group-hover:text-slate-900 transition-colors leading-snug">
                Therapist Measurements Uploaded
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Certified therapist measurements required for custom compression
                products.
              </p>
            </div>
          </div>

          {!form.measurementsUploaded && (
            <div className="ml-7 mt-3">
              <div className="border-2 border-dashed border-gray-200 rounded-lg px-5 py-4 flex items-center justify-between hover:border-gray-300 hover:bg-gray-50/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <svg
                    className="h-4 w-4 text-slate-400"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 10.5V3.5M5.5 6L8 3.5 10.5 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 13.5h10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div>
                    <p className="text-xs font-medium text-slate-600">
                      Upload measurement file
                    </p>
                    <p className="text-xs text-slate-400">PDF, JPG, or PNG accepted</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                  Browse
                </span>
              </div>
              <p className="mt-2 text-xs text-amber-600 flex items-center gap-1.5">
                <svg
                  className="h-3.5 w-3.5 shrink-0"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M8 2L14.5 13H1.5L8 2Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    fill="currentColor"
                    fillOpacity="0.15"
                  />
                  <path
                    d="M8 6.5v3M8 11.5h.01"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
                Missing measurements will block order processing.
              </p>
            </div>
          )}
        </div>

        {/* Prior auth */}
        <div
          className="flex items-start gap-3 cursor-pointer group"
          onClick={() => onChange("priorAuthRequired", !form.priorAuthRequired)}
        >
          <Checkbox
            checked={form.priorAuthRequired}
            onChange={(v) => onChange("priorAuthRequired", v)}
          />
          <div>
            <p className="text-sm font-medium text-slate-800 group-hover:text-slate-900 transition-colors leading-snug">
              Prior Authorization Required
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Mark if this order requires prior authorization from the insurance
              provider before fulfillment.
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

// ─── Section 5: Internal Notes ────────────────────────────────────────────────

function NotesSection({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <SectionCard>
      <SectionHead
        title="Internal Notes"
        description="Operational comments visible only to the fulfillment team."
      />
      <div className="p-6">
        <textarea
          className={`${inputCls} resize-none`}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Add relevant notes — exceptions, special instructions, or follow-up items…"
        />
        <p className="text-xs text-slate-400 mt-2">
          Not visible to patients or insurance providers.
        </p>
      </div>
    </SectionCard>
  )
}

// ─── Sidebar: Order Summary ───────────────────────────────────────────────────

function OrderSummary({
  patientName,
  products,
}: {
  patientName: string
  products: ProductRow[]
}) {
  const totalCost = products.reduce(
    (s, p) => s + CATALOG[p.catalogId].unitCost * p.qty,
    0
  )
  const totalBillable = products.reduce(
    (s, p) => s + CATALOG[p.catalogId].unitBillable * p.qty,
    0
  )
  const margin =
    totalBillable > 0
      ? ((totalBillable - totalCost) / totalBillable) * 100
      : 0
  const isHealthy = margin >= 30

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-slate-900">Order Summary</h3>
        <p className="text-xs text-slate-400 mt-0.5">Updates as you fill the form</p>
      </div>

      {/* Patient */}
      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
          Patient
        </p>
        {patientName ? (
          <p className="text-sm font-semibold text-slate-900">{patientName}</p>
        ) : (
          <p className="text-sm text-slate-300 italic">Not entered</p>
        )}
      </div>

      {/* Products */}
      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Selected Products
        </p>
        {products.length === 0 ? (
          <p className="text-sm text-slate-300 italic">None added yet</p>
        ) : (
          <div className="space-y-2.5">
            {products.map((row) => {
              const cat = CATALOG[row.catalogId]
              return (
                <div
                  key={row.key}
                  className="flex items-start justify-between gap-2"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-700 leading-snug">
                      {cat.name}
                    </p>
                    <p className="text-xs text-slate-400">{cat.vendor}</p>
                  </div>
                  <span className="text-xs text-slate-500 shrink-0 tabular-nums">
                    ×{row.qty}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Financials */}
      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Pricing Summary
        </p>
        {products.length === 0 ? (
          <p className="text-sm text-slate-300 italic">Add products to see pricing</p>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Product Cost</span>
              <span className="text-xs font-medium text-slate-600 tabular-nums">
                {fmt(totalCost)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Billable Amount</span>
              <span className="text-xs font-semibold text-slate-900 tabular-nums">
                {fmt(totalBillable)}
              </span>
            </div>
            <div className="pt-2 mt-1 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Estimated Margin</span>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold tabular-nums ${
                    isHealthy ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {margin.toFixed(0)}%
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    isHealthy
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {isHealthy ? "Healthy" : "Low Margin"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Next Steps */}
      <div className="px-5 py-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3.5">
          Next Steps
        </p>
        <div>
          {NEXT_STEPS.map((step, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`h-2 w-2 rounded-full mt-0.5 ${
                    i === 0 ? "bg-slate-800" : "bg-gray-200"
                  }`}
                />
                {i < NEXT_STEPS.length - 1 && (
                  <div className="w-px flex-1 bg-gray-200 my-1 min-h-[14px]" />
                )}
              </div>
              <p
                className={`text-xs pb-2.5 last:pb-0 leading-snug ${
                  i === 0 ? "font-semibold text-slate-800" : "text-slate-400"
                }`}
              >
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Sidebar: Operational Checks ─────────────────────────────────────────────

type CheckState = "pass" | "warn" | "pending"

function CheckRow({ state, label }: { state: CheckState; label: string }) {
  return (
    <div className="flex items-start gap-2.5">
      {state === "pass" && (
        <svg
          className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="8" cy="8" r="7" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1" />
          <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {state === "warn" && (
        <svg
          className="h-4 w-4 text-amber-500 shrink-0 mt-0.5"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path d="M8 2.5L14 13H2L8 2.5Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" />
          <path d="M8 6.5v3M8 11.5h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )}
      {state === "pending" && (
        <svg
          className="h-4 w-4 text-slate-300 shrink-0 mt-0.5"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      )}
      <p
        className={`text-xs leading-snug ${
          state === "pass"
            ? "text-slate-700"
            : state === "warn"
            ? "text-amber-700"
            : "text-slate-400"
        }`}
      >
        {label}
      </p>
    </div>
  )
}

function OperationalChecks({
  form,
  products,
}: {
  form: FormState
  products: ProductRow[]
}) {
  const hasProducts = products.length > 0

  const allPriced =
    hasProducts && products.every((p) => CATALOG[p.catalogId].unitBillable > 0)

  const allVendors =
    hasProducts && products.every((p) => CATALOG[p.catalogId].vendor !== "")

  const totalBillable = products.reduce(
    (s, p) => s + CATALOG[p.catalogId].unitBillable * p.qty,
    0
  )
  const totalCost = products.reduce(
    (s, p) => s + CATALOG[p.catalogId].unitCost * p.qty,
    0
  )
  const margin =
    totalBillable > 0
      ? ((totalBillable - totalCost) / totalBillable) * 100
      : 0
  const marginOk = hasProducts && margin >= 30

  const checks: { state: CheckState; label: string }[] = [
    {
      state: allPriced ? "pass" : hasProducts ? "warn" : "pending",
      label: "Pricing calculated",
    },
    {
      state: allVendors ? "pass" : hasProducts ? "warn" : "pending",
      label: "Vendor selected",
    },
    {
      state: form.measurementsUploaded ? "pass" : "warn",
      label: form.measurementsUploaded
        ? "Measurements uploaded"
        : "Therapist measurements missing",
    },
    {
      state: !hasProducts ? "pending" : marginOk ? "pass" : "warn",
      label: "Margin above target threshold",
    },
  ]

  const warnCount = checks.filter((c) => c.state === "warn").length
  const passCount = checks.filter((c) => c.state === "pass").length

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">
            Operational Checks
          </h3>
          {warnCount > 0 ? (
            <span className="text-xs font-semibold bg-amber-100 text-amber-700 rounded-full px-2 py-0.5">
              {warnCount} warning{warnCount > 1 ? "s" : ""}
            </span>
          ) : passCount === checks.length ? (
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 rounded-full px-2 py-0.5">
              All clear
            </span>
          ) : null}
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Automated workflow validation
        </p>
      </div>
      <div className="px-5 py-4 space-y-3.5">
        {checks.map((c, i) => (
          <CheckRow key={i} state={c.state} label={c.label} />
        ))}
      </div>
      <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
        <p className="text-xs text-slate-400 leading-relaxed">
          Checks update as you complete the form. Warnings do not block
          submission.
        </p>
      </div>
    </div>
  )
}

// ─── Root: NewOrderForm ───────────────────────────────────────────────────────

export default function NewOrderForm() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState<FormState>({
    patientName: "Maria Rodriguez",
    dob: "1978-03-15",
    phone: "(555) 247-8832",
    email: "m.rodriguez@email.com",
    address: "4821 Maple Drive, Austin, TX 78701",
    insuranceProvider: "BlueCross BlueShield",
    memberId: "BCB-2024-447821",
    planType: "PPO",
    prescriptionReceived: true,
    measurementsUploaded: false,
    priorAuthRequired: false,
    notes: "",
  })

  const [products, setProducts] = useState<ProductRow[]>([
    { key: 0, catalogId: 0, qty: 2 },
    { key: 1, catalogId: 1, qty: 1 },
  ])

  const nextKey = useRef(2)

  const onChange = (k: keyof FormState, v: string | boolean) =>
    setForm((prev) => ({ ...prev, [k]: v }))

  const addProduct = () => {
    const usedIds = new Set(products.map((p) => p.catalogId))
    const nextId = CATALOG.findIndex((c) => !usedIds.has(c.id))
    if (nextId === -1) return
    nextKey.current += 1
    setProducts((prev) => [
      ...prev,
      { key: nextKey.current, catalogId: nextId, qty: 1 },
    ])
  }

  const removeProduct = (key: number) =>
    setProducts((prev) => prev.filter((p) => p.key !== key))

  const updateQty = (key: number, qty: number) =>
    setProducts((prev) => prev.map((p) => (p.key === key ? { ...p, qty } : p)))

  const handleSubmit = () => {
    setSubmitting(true)
    setTimeout(() => router.push("/orders/review"), 800)
  }

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
          <span className="text-slate-700 font-medium">New Order</span>
        </nav>

        {/* Page heading */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900">
            Create New Order
          </h2>
          <p className="mt-1 text-sm text-slate-500 max-w-2xl">
            Capture patient information, insurance details, product selections,
            and pricing in a structured workflow.
          </p>
        </div>

        {/* Workflow progress */}
        <WorkflowProgress form={form} products={products} />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* ── Left: form sections ── */}
          <div className="space-y-6 min-w-0">
            <PatientSection form={form} onChange={onChange} />
            <InsuranceSection form={form} onChange={onChange} />
            <ProductsSection
              products={products}
              onAdd={addProduct}
              onRemove={removeProduct}
              onQtyChange={updateQty}
            />
            <RequirementsSection form={form} onChange={onChange} />
            <NotesSection
              value={form.notes}
              onChange={(v) => onChange("notes", v)}
            />

            {/* Form actions */}
            <div className="flex items-center justify-between pt-2 pb-10">
              <Link
                href="/dashboard"
                className="text-xs text-slate-400 hover:text-slate-700 transition-colors"
              >
                Discard changes
              </Link>
              <div className="flex items-center gap-3">
                <button className="text-sm font-medium text-slate-700 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  Save Draft
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className={`text-sm font-medium text-white px-5 py-2 rounded-lg bg-slate-900 transition-colors flex items-center gap-2 ${
                    submitting ? "opacity-75 cursor-not-allowed" : "hover:bg-slate-700"
                  }`}
                >
                  {submitting ? "Submitting…" : "Submit for Approval"}
                  {!submitting && (
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
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ── Right: sticky sidebar ── */}
          <div className="sticky top-20 flex flex-col gap-5">
            <OrderSummary patientName={form.patientName} products={products} />
            <OperationalChecks form={form} products={products} />
          </div>
        </div>
      </main>
    </div>
  )
}

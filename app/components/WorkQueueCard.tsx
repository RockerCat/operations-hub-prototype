import Link from "next/link"
import type { QueueColor } from "@/app/lib/mockData"

interface WorkQueueCardProps {
  label: string
  count: number
  color: QueueColor
  href?: string
}

const colorStyles: Record<
  QueueColor,
  { bar: string; count: string; link: string; bg: string }
> = {
  amber: {
    bar: "bg-amber-400",
    count: "text-slate-900",
    link: "text-amber-600",
    bg: "hover:bg-amber-50/40",
  },
  blue: {
    bar: "bg-blue-500",
    count: "text-slate-900",
    link: "text-blue-600",
    bg: "hover:bg-blue-50/40",
  },
  orange: {
    bar: "bg-orange-400",
    count: "text-slate-900",
    link: "text-orange-600",
    bg: "hover:bg-orange-50/40",
  },
  purple: {
    bar: "bg-purple-500",
    count: "text-slate-900",
    link: "text-purple-600",
    bg: "hover:bg-purple-50/40",
  },
  green: {
    bar: "bg-emerald-500",
    count: "text-slate-900",
    link: "text-emerald-600",
    bg: "hover:bg-emerald-50/40",
  },
}

export default function WorkQueueCard({ label, count, color, href }: WorkQueueCardProps) {
  const styles = colorStyles[color]
  const cls = `relative block bg-white rounded-xl border border-gray-100 shadow-sm p-5 cursor-pointer transition-all duration-150 hover:shadow-md ${styles.bg}`

  const inner = (
    <>
      <div className={`absolute inset-x-0 top-0 h-0.5 rounded-t-xl ${styles.bar}`} />
      <p className="mt-1 text-xs font-medium text-slate-400 leading-snug">{label}</p>
      <p className={`mt-3 text-4xl font-semibold tracking-tight ${styles.count}`}>
        {count}
      </p>
      <p className="text-xs text-slate-400 mt-0.5">Orders</p>
      <div className="mt-5 flex items-center justify-between">
        <span className={`text-xs font-medium ${styles.link}`}>View queue</span>
        <svg
          className={`h-3.5 w-3.5 ${styles.link}`}
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
      </div>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    )
  }
  return <div className={cls}>{inner}</div>
}

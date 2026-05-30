import Link from "next/link"

export type ActivePage = "dashboard" | "orders" | "catalog" | "documents"

const NAV: { label: string; href: string; id: ActivePage }[] = [
  { label: "Dashboard", href: "/dashboard", id: "dashboard" },
  { label: "Orders", href: "/orders/new", id: "orders" },
  { label: "Catalog", href: "/catalog", id: "catalog" },
  { label: "Documents", href: "/documents", id: "documents" },
]

export default function AppHeader({ activePage }: { activePage: ActivePage }) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
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
              <p className="text-sm font-semibold text-slate-900 leading-none">
                Operations Hub
              </p>
              <p className="text-xs text-slate-400 mt-0.5 leading-none">
                Medical Supply Operations Platform
              </p>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                  activePage === item.id
                    ? "bg-gray-100 text-slate-700 font-medium"
                    : "text-slate-500 hover:text-slate-900 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              disabled
              title="Export functionality not included in MVP."
              className="text-xs font-medium text-slate-400 px-3 py-1.5 rounded-lg border border-gray-200 opacity-60 cursor-not-allowed"
            >
              Export Orders
            </button>
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
        </div>
      </div>
    </header>
  )
}

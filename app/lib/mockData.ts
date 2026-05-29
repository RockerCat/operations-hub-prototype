export type OrderStatus =
  | "Draft"
  | "Pending Approval"
  | "Approved"
  | "Awaiting Payment"
  | "Completed"

export type AlertSeverity = "high" | "medium" | "low"
export type AlertCategory = "Documentation" | "Authorization" | "Financial" | "Fulfillment"
export type AttentionSeverity = "high" | "medium"

export type QueueColor = "amber" | "blue" | "orange" | "purple" | "green"

export interface Order {
  id: string
  patient: string
  product: string
  vendor: string
  status: OrderStatus
  margin: string
  lastUpdated: string
}

export interface Alert {
  id: number
  severity: AlertSeverity
  category: AlertCategory
  title: string
  description: string
  time: string
}

export interface AttentionOrder {
  id: string
  patient: string
  product: string
  blocker: string
  action: string
  severity: AttentionSeverity
  orderId: string
}

export interface SummaryStat {
  label: string
  value: string
  subtext: string
  isAlert?: boolean
}

export interface WorkQueueItem {
  id: string
  label: string
  count: number
  color: QueueColor
  href?: string
}

export interface Metric {
  label: string
  value: string
  subtext: string
  isAlert?: boolean
}

export const workQueue: WorkQueueItem[] = [
  { id: "pending-approval", label: "Pending Approval", count: 12, color: "amber", href: "/orders/review" },
  { id: "ready-documents", label: "Ready for Documents", count: 8, color: "blue", href: "/documents" },
  { id: "awaiting-payment", label: "Awaiting Payment", count: 5, color: "orange", href: "/orders/review" },
  { id: "pod-pending", label: "POD Signature Pending", count: 3, color: "purple", href: "/documents" },
  { id: "completed-today", label: "Completed Today", count: 42, color: "green", href: "/" },
]

export const orders: Order[] = [
  {
    id: "ORD-2024-0892",
    patient: "Maria Rodriguez",
    product: "Lymphedema Kit – Full Arm",
    vendor: "Solaris Medical",
    status: "Pending Approval",
    margin: "34%",
    lastUpdated: "2h ago",
  },
  {
    id: "ORD-2024-0891",
    patient: "James Whitfield",
    product: "Compression Sleeve – Grade 2",
    vendor: "Juzo USA",
    status: "Approved",
    margin: "41%",
    lastUpdated: "3h ago",
  },
  {
    id: "ORD-2024-0890",
    patient: "Linda Chen",
    product: "Breast Prosthesis – Custom Fit",
    vendor: "Amoena Care",
    status: "Awaiting Payment",
    margin: "28%",
    lastUpdated: "4h ago",
  },
  {
    id: "ORD-2024-0889",
    patient: "Robert Stein",
    product: "Compression Garments – Lower Limb",
    vendor: "Medi USA",
    status: "Completed",
    margin: "45%",
    lastUpdated: "5h ago",
  },
  {
    id: "ORD-2024-0888",
    patient: "Patricia Moore",
    product: "Compression Sleeves – Bilateral",
    vendor: "CircAid Medical",
    status: "Draft",
    margin: "—",
    lastUpdated: "6h ago",
  },
  {
    id: "ORD-2024-0887",
    patient: "David Nguyen",
    product: "Lymphedema Kit – Lower Extremity",
    vendor: "Solaris Medical",
    status: "Pending Approval",
    margin: "31%",
    lastUpdated: "7h ago",
  },
  {
    id: "ORD-2024-0886",
    patient: "Susan Patel",
    product: "Compression Arm Sleeve – Post-Op",
    vendor: "Jobst Medical",
    status: "Approved",
    margin: "38%",
    lastUpdated: "Yesterday",
  },
  {
    id: "ORD-2024-0885",
    patient: "Thomas Baker",
    product: "Breast Prosthesis – Silicone",
    vendor: "Amoena Care",
    status: "Completed",
    margin: "52%",
    lastUpdated: "Yesterday",
  },
  {
    id: "ORD-2024-0884",
    patient: "Angela Fischer",
    product: "Compression Stockings – Class III",
    vendor: "Medi USA",
    status: "Draft",
    margin: "—",
    lastUpdated: "Yesterday",
  },
  {
    id: "ORD-2024-0883",
    patient: "Kevin Okafor",
    product: "Lymphedema Sleeve & Gauntlet",
    vendor: "CircAid Medical",
    status: "Completed",
    margin: "47%",
    lastUpdated: "2d ago",
  },
]

export const alerts: Alert[] = [
  {
    id: 1,
    severity: "high",
    category: "Documentation",
    title: "Missing therapist measurements",
    description: "Required for Maria Rodriguez (ORD-2024-0892) before this order can be processed.",
    time: "2h ago",
  },
  {
    id: 2,
    severity: "high",
    category: "Financial",
    title: "Low margin detected",
    description: "ORD-2024-0890 is at 28% — below the 30% minimum margin threshold.",
    time: "4h ago",
  },
  {
    id: 3,
    severity: "medium",
    category: "Authorization",
    title: "Prior authorization likely required",
    description: "Breast prosthesis for Linda Chen may require PA — verify coverage before fulfillment.",
    time: "4h ago",
  },
  {
    id: 4,
    severity: "medium",
    category: "Fulfillment",
    title: "Proof of delivery not signed",
    description: "ORD-2024-0883 has been awaiting POD signature for over 48 hours.",
    time: "1d ago",
  },
  {
    id: 5,
    severity: "low",
    category: "Authorization",
    title: "Insurance verification pending",
    description: "3 orders are awaiting coverage confirmation before dispatch.",
    time: "1d ago",
  },
]

export const attentionOrders: AttentionOrder[] = [
  {
    id: "att-1",
    patient: "Maria Rodriguez",
    product: "Lymphedema Kit",
    blocker: "Missing therapist measurements",
    action: "Review Order",
    severity: "high",
    orderId: "ORD-2024-0892",
  },
  {
    id: "att-2",
    patient: "Linda Chen",
    product: "Breast Prosthesis",
    blocker: "Prior authorization required",
    action: "Verify Coverage",
    severity: "medium",
    orderId: "ORD-2024-0890",
  },
  {
    id: "att-3",
    patient: "James Whitfield",
    product: "Compression Sleeves",
    blocker: "Manager approval pending",
    action: "Approve Order",
    severity: "medium",
    orderId: "ORD-2024-0891",
  },
]

export const summaryStats: SummaryStat[] = [
  { label: "Orders Processed Today", value: "47", subtext: "+12% vs yesterday" },
  { label: "Pending Reviews", value: "12", subtext: "Approval queue" },
  { label: "Awaiting Payment", value: "5", subtext: "Across 5 orders" },
  { label: "Operational Risks", value: "3", subtext: "Require attention", isAlert: true },
]

export const metrics: Metric[] = [
  { label: "Orders Today", value: "47", subtext: "+12% vs yesterday" },
  { label: "Avg Processing Time", value: "2.4h", subtext: "Past 30 days" },
  { label: "Approval Queue", value: "12", subtext: "Pending review" },
  { label: "Error Risk Flags", value: "3", subtext: "Require attention", isAlert: true },
]

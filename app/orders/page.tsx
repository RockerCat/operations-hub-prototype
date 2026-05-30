import type { Metadata } from "next"
import OrdersPage from "./OrdersPage"

export const metadata: Metadata = {
  title: "Orders Management — Operations Hub",
  description:
    "Track and manage patient orders across the operational workflow.",
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  return <OrdersPage initialStatus={status} />
}

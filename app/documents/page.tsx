import type { Metadata } from "next"
import DocumentsPage from "./DocumentsPage"

export const metadata: Metadata = {
  title: "Documents Center — Operations Hub",
  description:
    "Automatically generated operational documents for approved orders.",
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ approved?: string }>
}) {
  const params = await searchParams
  return <DocumentsPage approved={params.approved === "1"} />
}

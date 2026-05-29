import type { Metadata } from "next"
import CatalogPage from "./CatalogPage"

export const metadata: Metadata = {
  title: "Product & Vendor Catalog — Operations Hub",
  description:
    "Centralized product, pricing, vendor, and operational rule management.",
}

export default function Page() {
  return <CatalogPage />
}

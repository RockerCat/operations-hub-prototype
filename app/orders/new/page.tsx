import type { Metadata } from "next"
import NewOrderForm from "./NewOrderForm"

export const metadata: Metadata = {
  title: "Create New Order — Operations Hub",
  description:
    "Capture patient information, insurance details, product selections, and pricing in a structured workflow.",
}

export default function NewOrderPage() {
  return <NewOrderForm />
}

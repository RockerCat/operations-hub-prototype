import type { Metadata } from "next"
import OrderReviewPage from "./OrderReviewPage"

export const metadata: Metadata = {
  title: "Order Review — Operations Hub",
  description:
    "Review pricing, documentation, insurance requirements, and operational risks before approval.",
}

export default function ReviewPage() {
  return <OrderReviewPage />
}

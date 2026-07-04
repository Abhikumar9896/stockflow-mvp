import { getEffectiveThreshold, isLowStock } from "./threshold"

export function getStatusLabel(
  quantityOnHand: number,
  lowStockThreshold: number | null,
  defaultThreshold: number | null
): { label: string; className: string } {
  const effective = getEffectiveThreshold(lowStockThreshold, defaultThreshold)
  if (isLowStock(quantityOnHand, effective)) {
    return { label: "Low Stock", className: "bg-red-100 text-red-700" }
  }
  return { label: "In Stock", className: "bg-green-100 text-green-700" }
}

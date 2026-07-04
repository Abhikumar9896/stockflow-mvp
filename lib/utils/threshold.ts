export function getEffectiveThreshold(
  productLowStockThreshold: number | null,
  defaultLowStockThreshold: number | null
): number | null {
  return productLowStockThreshold ?? defaultLowStockThreshold ?? null
}

export function isLowStock(
  quantityOnHand: number,
  effectiveThreshold: number | null
): boolean {
  return effectiveThreshold != null && quantityOnHand <= effectiveThreshold
}

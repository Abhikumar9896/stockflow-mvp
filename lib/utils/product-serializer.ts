import type { Product } from "@/types/product"
import { toNumber } from "./number"

export function serializeProduct(p: Record<string, unknown>): Product {
  return {
    id: p.id as string,
    organizationId: p.organizationId as string,
    name: p.name as string,
    sku: p.sku as string,
    description: (p.description as string) ?? null,
    quantityOnHand: p.quantityOnHand as number,
    costPrice: toNumber(p.costPrice),
    sellingPrice: toNumber(p.sellingPrice),
    lowStockThreshold: toNumber(p.lowStockThreshold),
    createdAt: p.createdAt as Date,
    updatedAt: p.updatedAt as Date,
  }
}

import { db } from "@/lib/db"
import { getSettings } from "./settings.service"
import { getEffectiveThreshold, isLowStock } from "@/lib/utils/threshold"
import type { Product } from "@/types/product"

function toNumber(val: unknown): number | null {
  if (val == null) return null
  if (typeof val === "number") return val
  if (typeof (val as { toNumber?: () => number }).toNumber === "function")
    return (val as { toNumber: () => number }).toNumber()
  return Number(val)
}

function serializeProduct(p: Record<string, unknown>): Product {
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

export interface DashboardSummary {
  totalProducts: number
  totalQuantity: number
  lowStockCount: number
}

export async function getDashboardSummary(
  organizationId: string
): Promise<DashboardSummary> {
  const [totalProducts, agg] = await Promise.all([
    db.product.count({ where: { organizationId } }),
    db.product.aggregate({
      where: { organizationId },
      _sum: { quantityOnHand: true },
    }),
  ])

  return {
    totalProducts,
    totalQuantity: agg._sum?.quantityOnHand ?? 0,
    lowStockCount: 0,
  }
}

export async function getLowStockProducts(
  organizationId: string
): Promise<Product[]> {
  const [settings, rows] = await Promise.all([
    getSettings(organizationId),
    db.product.findMany({
      where: { organizationId },
      orderBy: { quantityOnHand: "asc" },
    }),
  ])

  const defaultThreshold = settings?.defaultLowStockThreshold ?? null

  return rows
    .map(serializeProduct)
    .filter((p) => {
      const effective = getEffectiveThreshold(
        p.lowStockThreshold,
        defaultThreshold
      )
      return isLowStock(p.quantityOnHand, effective)
    })
}

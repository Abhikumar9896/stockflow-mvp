import { db } from "@/lib/db"
import type { ProductInput } from "@/schemas/product"
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

export async function getProducts(organizationId: string): Promise<Product[]> {
  const rows = await db.product.findMany({
    where: { organizationId },
    orderBy: { createdAt: "desc" },
  })
  return rows.map(serializeProduct)
}

export async function getProduct(id: string, organizationId: string) {
  const row = await db.product.findFirst({
    where: { id, organizationId },
  })
  return row ? serializeProduct(row) : null
}

export async function createProduct(
  organizationId: string,
  data: ProductInput
) {
  const row = await db.product.create({
    data: {
      organizationId,
      name: data.name,
      sku: data.sku,
      description: data.description ?? null,
      quantityOnHand: data.quantityOnHand,
      costPrice: data.costPrice ?? null,
      sellingPrice: data.sellingPrice ?? null,
      lowStockThreshold: data.lowStockThreshold ?? null,
    },
  })
  return serializeProduct(row)
}

export async function updateProduct(
  id: string,
  data: Partial<ProductInput>
) {
  const row = await db.product.update({
    where: { id },
    data: {
      name: data.name,
      sku: data.sku,
      description: data.description,
      quantityOnHand: data.quantityOnHand,
      costPrice: data.costPrice,
      sellingPrice: data.sellingPrice,
      lowStockThreshold: data.lowStockThreshold,
    },
  })
  return serializeProduct(row)
}

export async function deleteProduct(id: string) {
  await db.product.delete({
    where: { id },
  })
}

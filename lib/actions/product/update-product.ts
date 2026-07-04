"use server"

import { requireOrganization } from "@/lib/auth/helpers"
import { updateProduct, getProduct } from "@/lib/services/product.service"
import { productSchema, type ProductInput } from "@/schemas/product"
import { revalidatePath } from "next/cache"

export async function updateProductAction(id: string, data: ProductInput) {
  const organizationId = await requireOrganization()

  const existing = await getProduct(id, organizationId)
  if (!existing) return { error: "Product not found" }

  const parsed = productSchema.parse(data)

  try {
    await updateProduct(id, parsed)
  } catch (e) {
    if (
      e instanceof Error &&
      "code" in e &&
      (e as { code: string }).code === "P2002"
    ) {
      return { error: "A product with this SKU already exists" }
    }
    return { error: "Failed to update product. Please try again." }
  }

  revalidatePath("/products")
  return { success: true }
}

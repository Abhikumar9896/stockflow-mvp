"use server"

import { requireOrganization } from "@/lib/auth/helpers"
import { deleteProduct, getProduct } from "@/lib/services/product.service"
import { revalidatePath } from "next/cache"

export async function deleteProductAction(id: string) {
  const organizationId = await requireOrganization()

  const existing = await getProduct(id, organizationId)
  if (!existing) return { error: "Product not found" }

  try {
    await deleteProduct(id)
  } catch {
    return { error: "Unable to delete product." }
  }

  revalidatePath("/products")
  return { success: true }
}

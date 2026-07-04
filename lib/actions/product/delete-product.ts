"use server"

import { requireOrganization } from "@/lib/auth/helpers"
import { deleteProduct, getProduct } from "@/lib/services/product.service"
import { revalidatePath } from "next/cache"

export async function deleteProductAction(id: string) {
  const organizationId = await requireOrganization()

  const existing = await getProduct(id, organizationId)
  if (!existing) throw new Error("Product not found")

  await deleteProduct(id)
  revalidatePath("/products")
}

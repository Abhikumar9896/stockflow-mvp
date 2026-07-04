"use server"

import { requireOrganization } from "@/lib/auth/helpers"
import { createProduct } from "@/lib/services/product.service"
import { productSchema } from "@/schemas/product"
import { revalidatePath } from "next/cache"

export async function createProductAction(formData: FormData) {
  const organizationId = await requireOrganization()

  const data = productSchema.parse({
    name: formData.get("name"),
    sku: formData.get("sku"),
    description: formData.get("description"),
    quantityOnHand: formData.get("quantityOnHand"),
    costPrice: formData.get("costPrice"),
    sellingPrice: formData.get("sellingPrice"),
    lowStockThreshold: formData.get("lowStockThreshold"),
  })

  await createProduct(organizationId, data)
  revalidatePath("/products")
}

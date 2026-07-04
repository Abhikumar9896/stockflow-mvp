"use server"

import { requireOrganization } from "@/lib/auth/helpers"
import { getProducts } from "@/lib/services/product.service"

export async function getProductsAction() {
  const organizationId = await requireOrganization()
  return getProducts(organizationId)
}

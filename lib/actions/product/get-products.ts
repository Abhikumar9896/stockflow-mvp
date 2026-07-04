"use server"

import { requireOrganization } from "@/lib/auth/helpers"
import { getProducts, getProduct } from "@/lib/services/product.service"

export async function getProductsAction() {
  const organizationId = await requireOrganization()
  return getProducts(organizationId)
}

export async function getProductAction(id: string) {
  const organizationId = await requireOrganization()
  return getProduct(id, organizationId)
}

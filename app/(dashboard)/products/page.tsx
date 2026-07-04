import { getProductsAction } from "@/lib/actions/product/get-products"
import { requireOrganization } from "@/lib/auth/helpers"
import { getSettings } from "@/lib/services/settings.service"
import { ProductListClient } from "@/components/products/product-list-client"

export default async function ProductsPage() {
  const organizationId = await requireOrganization()
  const [products, settings] = await Promise.all([
    getProductsAction(),
    getSettings(organizationId),
  ])

  return (
    <ProductListClient
      products={products}
      defaultLowStockThreshold={settings?.defaultLowStockThreshold ?? null}
    />
  )
}

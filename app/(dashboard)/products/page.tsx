import { getProductsAction } from "@/lib/actions/product/get-products"
import { ProductListClient } from "@/components/products/product-list-client"

export default async function ProductsPage() {
  const products = await getProductsAction()

  return <ProductListClient products={products} />
}

import { getProductsAction } from "@/lib/actions/product/get-products"
import { EmptyState } from "@/components/products/empty-state"
import { ProductTable } from "@/components/products/product-table"
import { Plus } from "lucide-react"

export default async function ProductsPage() {
  const products = await getProductsAction()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground text-sm">
            Manage your inventory
          </p>
        </div>
        <a
          href="/products/new"
          className="inline-flex items-center gap-1 h-8 px-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/80"
        >
          <Plus className="size-4" />
          Add Product
        </a>
      </div>

      {products.length === 0 ? (
        <EmptyState />
      ) : (
        <ProductTable products={products} />
      )}
    </div>
  )
}

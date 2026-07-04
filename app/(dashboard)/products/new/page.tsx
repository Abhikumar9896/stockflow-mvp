import { ProductForm } from "@/components/products/product-form"
import { createProductAction } from "@/lib/actions/product/create-product"

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <ProductForm mode="create" onSubmit={createProductAction} />
    </div>
  )
}

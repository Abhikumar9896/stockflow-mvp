import { ProductForm } from "@/components/products/product-form"
import { createProductAction } from "@/lib/actions/product/create-product"
import { PageHeader } from "@/components/shared/page-header"

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Product"
        subtitle="Add a new inventory item."
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: "Create", href: "/products/new" },
        ]}
      />
      <ProductForm mode="create" onSubmit={createProductAction} />
    </div>
  )
}

import { getProductAction } from "@/lib/actions/product/get-products"
import { notFound } from "next/navigation"
import { ProductForm } from "@/components/products/product-form"
import { updateProductAction } from "@/lib/actions/product/update-product"
import { PageHeader } from "@/components/shared/page-header"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params
  const product = await getProductAction(id)
  if (!product) notFound()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Product"
        subtitle="Update inventory item details."
      />
      <ProductForm
        mode="edit"
        defaultValues={{
          name: product.name,
          sku: product.sku,
          description: product.description ?? "",
          quantityOnHand: product.quantityOnHand,
          costPrice: product.costPrice ?? undefined,
          sellingPrice: product.sellingPrice ?? undefined,
          lowStockThreshold: product.lowStockThreshold ?? undefined,
        }}
        onSubmit={(data) => updateProductAction(id, data)}
      />
    </div>
  )
}

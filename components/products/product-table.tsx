"use client"

import type { Product } from "@/types/product"
import { ProductRow } from "./product-row"

export function ProductTable({
  products,
  defaultLowStockThreshold,
}: {
  products: Product[]
  defaultLowStockThreshold: number | null
}) {
  return (
    <div className="rounded-lg border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr className="text-left">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">SKU</th>
            <th className="px-4 py-3 font-medium text-right">Quantity</th>
            <th className="px-4 py-3 font-medium">Selling Price</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium w-24">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              defaultLowStockThreshold={defaultLowStockThreshold}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

"use client"

import type { Product } from "@/types/product"
import { DeleteDialog } from "./delete-dialog"
import { useState } from "react"
import { getEffectiveThreshold, isLowStock } from "@/lib/utils/threshold"

function getStatus(
  product: Product,
  defaultThreshold: number | null
): { label: string; className: string } {
  const effective = getEffectiveThreshold(
    product.lowStockThreshold,
    defaultThreshold
  )
  if (isLowStock(product.quantityOnHand, effective)) {
    return { label: "Low Stock", className: "bg-red-100 text-red-700" }
  }
  return { label: "In Stock", className: "bg-green-100 text-green-700" }
}

export function ProductRow({
  product,
  defaultLowStockThreshold,
}: {
  product: Product
  defaultLowStockThreshold: number | null
}) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const status = getStatus(product, defaultLowStockThreshold)

  return (
    <>
      <tr className="hover:bg-muted/30">
        <td className="px-4 py-3">{product.name}</td>
        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
          {product.sku}
        </td>
        <td className="px-4 py-3 text-right">{product.quantityOnHand}</td>
        <td className="px-4 py-3">
          {product.sellingPrice != null
            ? `\u20B9${Number(product.sellingPrice).toFixed(2)}`
            : "--"}
        </td>
        <td className="px-4 py-3">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${status.className}`}
          >
            {status.label}
          </span>
        </td>
        <td className="px-4 py-3">
          <div className="flex gap-2">
            <a
              href={`/products/${product.id}/edit`}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Edit
            </a>
            <button
              type="button"
              onClick={() => setDeleteOpen(true)}
              className="text-sm text-muted-foreground hover:text-red-600"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
      <DeleteDialog
        productId={product.id}
        productName={product.name}
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      />
    </>
  )
}

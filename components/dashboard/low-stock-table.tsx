import type { Product } from "@/types/product"
import { CheckCheck } from "lucide-react"
import { getStatusLabel } from "@/lib/utils/status"

export function LowStockTable({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <CheckCheck className="size-8 text-emerald-500 mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">
          No low stock products.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border overflow-x-auto">
      <table className="w-full text-sm min-w-[500px]">
        <thead className="bg-muted/50">
          <tr className="text-left">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">SKU</th>
            <th className="px-4 py-3 font-medium text-right">Qty</th>
            <th className="px-4 py-3 font-medium text-right">Threshold</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {products.map((product) => {
            const status = getStatusLabel(product.quantityOnHand, product.lowStockThreshold, null)
            return (
              <tr key={product.id} className="hover:bg-muted/30">
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                  {product.sku}
                </td>
                <td className="px-4 py-3 text-right font-medium text-red-600">
                  {product.quantityOnHand}
                </td>
                <td className="px-4 py-3 text-right">
                  {product.lowStockThreshold ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${status.className}`}
                  >
                    {status.label}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

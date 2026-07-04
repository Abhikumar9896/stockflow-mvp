import type { Product } from "@/types/product"
import { CheckCheck } from "lucide-react"

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
    <div className="rounded-lg border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr className="text-left">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">SKU</th>
            <th className="px-4 py-3 font-medium text-right">Qty</th>
            <th className="px-4 py-3 font-medium text-right">Threshold</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {products.map((product) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

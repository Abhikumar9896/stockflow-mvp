import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { deleteProductAction } from "@/lib/actions/product/delete-product"

export function ProductTable({ products }: { products: Product[] }) {
  return (
    <div className="rounded-lg border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr className="text-left">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">SKU</th>
            <th className="px-4 py-3 font-medium">Quantity</th>
            <th className="px-4 py-3 font-medium">Selling Price</th>
            <th className="px-4 py-3 font-medium w-24">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-muted/30">
              <td className="px-4 py-3">{product.name}</td>
              <td className="px-4 py-3 text-muted-foreground">{product.sku}</td>
              <td className="px-4 py-3">{product.quantityOnHand}</td>
              <td className="px-4 py-3">
                {product.sellingPrice
                  ? `$${Number(product.sellingPrice).toFixed(2)}`
                  : "-"}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  <a
                    href={`/products/${product.id}/edit`}
                    className="inline-flex items-center justify-center size-7 rounded-md hover:bg-muted"
                  >
                    <Pencil className="size-3.5" />
                  </a>
                  <form action={deleteProductAction.bind(null, product.id)}>
                    <Button variant="ghost" size="icon-xs" type="submit">
                      <Trash2 className="size-3.5" />
                    </Button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

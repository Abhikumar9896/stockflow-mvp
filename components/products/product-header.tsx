import { Plus } from "lucide-react"
import { ProductSearch } from "./product-search"

type ProductHeaderProps = {
  search: string
  onSearchChange: (value: string) => void
}

export function ProductHeader({ search, onSearchChange }: ProductHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground text-sm">
            Manage inventory products.
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
      <ProductSearch value={search} onChange={onSearchChange} />
    </div>
  )
}

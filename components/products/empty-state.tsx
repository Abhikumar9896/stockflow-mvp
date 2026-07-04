import { Package } from "lucide-react"

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Package className="size-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold">No products found</h3>
      <p className="text-sm text-muted-foreground mt-1 mb-6">
        Create your first product to get started
      </p>
      <a
        href="/products/new"
        className="inline-flex items-center gap-1 h-8 px-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/80"
      >
        Add Product
      </a>
    </div>
  )
}

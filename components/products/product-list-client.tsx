"use client"

import { useState } from "react"
import type { Product } from "@/types/product"
import { ProductHeader } from "./product-header"
import { ProductTable } from "./product-table"
import { EmptyState } from "./empty-state"
import { SearchX } from "lucide-react"

export function ProductListClient({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("")

  const filtered = products.filter((p) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-6">
      <ProductHeader search={search} onSearchChange={setSearch} />

      {products.length === 0 ? (
        <EmptyState />
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <SearchX className="size-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No products match your search.</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your search terms.
          </p>
        </div>
      ) : (
        <ProductTable products={filtered} />
      )}
    </div>
  )
}

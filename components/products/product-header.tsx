import { ProductSearch } from "./product-search"
import { PageHeader } from "@/components/shared/page-header"
import Link from "next/link"
import { Plus } from "lucide-react"

type ProductHeaderProps = {
  search: string
  onSearchChange: (value: string) => void
}

export function ProductHeader({ search, onSearchChange }: ProductHeaderProps) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        subtitle="Manage your inventory."
        action={
          <Link href="/products/new" className="btn-primary rounded-full h-8 px-4 text-xs">
            <Plus className="size-3.5 mr-1" />
            Add Product
          </Link>
        }
      />
      <ProductSearch value={search} onChange={onSearchChange} />
    </div>
  )
}

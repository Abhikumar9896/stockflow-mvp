import { ProductSearch } from "./product-search"
import { PageHeader } from "@/components/shared/page-header"

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
      />
      <ProductSearch value={search} onChange={onSearchChange} />
    </div>
  )
}

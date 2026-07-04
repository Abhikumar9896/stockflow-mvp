import { Package } from "lucide-react"

export function AppLogo() {
  return (
    <div className="flex items-center gap-2 justify-center">
      <Package className="size-6" />
      <span className="text-lg font-semibold">StockFlow</span>
    </div>
  )
}

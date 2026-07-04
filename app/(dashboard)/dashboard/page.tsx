import { requireOrganization } from "@/lib/auth/helpers"
import { getProductsAction } from "@/lib/actions/product/get-products"
import { getDashboardSummary, getLowStockProducts } from "@/lib/services/dashboard.service"
import { Package, PackageOpen, AlertTriangle, Plus } from "lucide-react"
import { LowStockTable } from "@/components/dashboard/low-stock-table"

export default async function DashboardPage() {
  const organizationId = await requireOrganization()

  const [summary, lowStockProducts, products] = await Promise.all([
    getDashboardSummary(organizationId),
    getLowStockProducts(organizationId),
    getProductsAction(),
  ])

  const hasProducts = products.length > 0

  if (!hasProducts) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground text-sm">
              Inventory Overview
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-16 text-center border rounded-lg">
          <Package className="size-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No inventory yet.</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-6">
            Create your first product to get started.
          </p>
          <a
            href="/products/new"
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/80"
          >
            <Plus className="size-4" />
            Add Product
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Inventory Overview
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

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border p-5 space-y-3">
          <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Package className="size-5 text-blue-700" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Products</p>
            <p className="text-3xl font-bold">{summary.totalProducts}</p>
          </div>
        </div>
        <div className="rounded-lg border p-5 space-y-3">
          <div className="size-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <PackageOpen className="size-5 text-emerald-700" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Quantity</p>
            <p className="text-3xl font-bold">
              {summary.totalQuantity.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="rounded-lg border p-5 space-y-3">
          <div className="size-10 rounded-lg bg-red-100 flex items-center justify-center">
            <AlertTriangle className="size-5 text-red-700" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Low Stock</p>
            <p className="text-3xl font-bold">{lowStockProducts.length}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">Low Stock Products</h2>
        <LowStockTable products={lowStockProducts} />
      </div>
    </div>
  )
}

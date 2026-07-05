import { requireOrganization } from "@/lib/auth/helpers"
import { getProductsAction } from "@/lib/actions/product/get-products"
import { getDashboardSummary, getLowStockProducts } from "@/lib/services/dashboard.service"
import { Package, PackageOpen, AlertTriangle, Plus } from "lucide-react"
import { LowStockTable } from "@/components/dashboard/low-stock-table"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"


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
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="Dashboard"
          subtitle="Inventory Overview"
        />
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
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Dashboard"
        subtitle="Inventory Overview"
        action={
          <a
            href="/products/new"
            className="inline-flex items-center gap-1 h-8 px-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/80"
          >
            <Plus className="size-4" />
            Add Product
          </a>
        }
      />

      <div className="grid grid-cols-3 gap-4">
        <StatCard
          icon={<Package className="size-5 text-blue-700" />}
          label="Total Products"
          value={summary.totalProducts}
        />
        <StatCard
          icon={<PackageOpen className="size-5 text-emerald-700" />}
          label="Total Quantity"
          value={summary.totalQuantity.toLocaleString()}
        />
        <StatCard
          icon={<AlertTriangle className="size-5 text-red-700" />}
          label="Low Stock"
          value={lowStockProducts.length}
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-1">Low Stock Products</h2>
        <p className="text-sm text-muted-foreground mb-3">
          Products requiring attention.
        </p>
        <LowStockTable products={lowStockProducts} />
      </div>
    </div>
  )
}

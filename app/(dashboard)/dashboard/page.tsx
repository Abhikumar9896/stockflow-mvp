import { requireOrganization } from "@/lib/auth/helpers"
import { getProductsAction } from "@/lib/actions/product/get-products"
import { getDashboardSummary, getLowStockProducts } from "@/lib/services/dashboard.service"
import { Package, PackageOpen, AlertTriangle, Plus } from "lucide-react"
import { LowStockTable } from "@/components/dashboard/low-stock-table"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import Link from "next/link"


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
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/20">
          <div className="flex items-center justify-center size-16 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm mb-6">
            <Package className="size-8 text-zinc-500 dark:text-zinc-400" />
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-foreground">No inventory yet</h3>
          <p className="text-sm text-muted-foreground mt-2 mb-8 max-w-sm mx-auto">
            You don&apos;t have any products in your inventory. Add your first product to start managing your stock.
          </p>
          <Link
            href="/products/new"
            className="inline-flex items-center gap-2 h-10 px-6 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="size-4" />
            Add Product
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Dashboard"
        subtitle="Inventory Overview"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

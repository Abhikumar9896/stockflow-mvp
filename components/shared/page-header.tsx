import type { ReactNode } from "react"
import { Home, ChevronRight } from "lucide-react"
import Link from "next/link"

type PageHeaderProps = {
  title: string
  subtitle?: string
  action?: ReactNode
  breadcrumbs?: { label: string; href: string }[]
}

export function PageHeader({ title, subtitle, action, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border bg-card px-6 py-2 shadow-sm gap-4">
      <div>
        <h1 className="text-lg font-bold tracking-tight text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <div className="flex items-center text-sm font-medium text-muted-foreground">
          <Link href="/dashboard" className="flex items-center hover:text-foreground transition-colors">
            <Home className="size-4 mr-1.5" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          
          {breadcrumbs?.map((crumb) => (
            <div key={crumb.href} className="flex items-center">
              <ChevronRight className="size-4 mx-1.5 text-muted-foreground/50" />
              <Link href={crumb.href} className="hover:text-foreground transition-colors">
                {crumb.label}
              </Link>
            </div>
          ))}

          {!breadcrumbs && (
            <div className="flex items-center text-foreground">
              <ChevronRight className="size-4 mx-1.5 text-muted-foreground/50" />
              <span>{title}</span>
            </div>
          )}
        </div>

        {action && (
          <>
            <div className="h-6 w-px bg-border mx-2 hidden sm:block" />
            <div>{action}</div>
          </>
        )}
      </div>
    </div>
  )
}

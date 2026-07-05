import type { ReactNode } from "react"

type StatCardProps = {
  icon: ReactNode
  label: string
  value: string | number
  className?: string
}

export function StatCard({ icon, label, value, className }: StatCardProps) {
  return (
    <div className={`rounded-xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30 hover:-translate-y-1 ${className ?? ""}`}>
      <div className="flex items-center gap-5">
        <div className="flex items-center justify-center size-14 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 shadow-sm">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold tracking-tight text-foreground mt-1">{value}</p>
        </div>
      </div>
    </div>
  )
}

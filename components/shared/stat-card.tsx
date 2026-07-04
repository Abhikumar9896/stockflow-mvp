import type { ReactNode } from "react"

type StatCardProps = {
  icon: ReactNode
  label: string
  value: string | number
  className?: string
}

export function StatCard({ icon, label, value, className }: StatCardProps) {
  return (
    <div className={`rounded-lg border p-5 space-y-3 ${className ?? ""}`}>
      <div className="size-10 rounded-lg bg-muted flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  )
}

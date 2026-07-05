import { Package } from "lucide-react"

export default function DashboardLoading() {
  return (
    <div className="flex h-[85vh] w-full flex-col items-center justify-center gap-6">
      <div className="relative flex h-16 w-16 items-center justify-center">
        {/* Spinning dashed ring */}
        <span className="absolute inset-0 animate-[spin_3s_linear_infinite] rounded-full border-[3px] border-dashed border-primary/30 border-t-primary" />
        
        {/* Center pulsing icon */}
        <Package className="relative z-10 size-6 animate-pulse text-primary drop-shadow-sm" strokeWidth={2} />
      </div>
    </div>
  )
}


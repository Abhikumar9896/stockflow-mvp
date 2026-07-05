import { Package } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left pane - Visual/Brand */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 bg-zinc-950 text-zinc-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950" />
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[40%] -right-[20%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[120px]" />
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-xl bg-zinc-800/50 border border-zinc-700 shadow-sm backdrop-blur-md">
            <Package className="size-6 text-zinc-100" />
          </div>
          <span className="text-2xl font-bold tracking-tight">StockFlow</span>
        </div>

        <div className="relative z-10 max-w-md mt-auto mb-12">
          <blockquote className="space-y-6">
            <p className="text-3xl font-medium leading-tight">
              &ldquo;Master your inventory. Streamline your operations. Scale your business with confidence.&rdquo;
            </p>
            <footer className="text-zinc-400 font-medium flex items-center gap-3">
              <div className="h-[1px] w-8 bg-zinc-700" />
              The ultimate stock management platform
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Right pane - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-[400px]">
          {children}
        </div>
      </div>
    </div>
  )
}

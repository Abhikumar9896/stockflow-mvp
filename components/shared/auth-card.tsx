import { Card } from "@/components/ui/card"

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm p-6 space-y-6">
        {children}
      </Card>
    </div>
  )
}

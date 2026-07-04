import { LoginForm } from "@/components/forms/login-form"
import { Package } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Package className="size-6" />
          <span className="text-lg font-semibold">StockFlow</span>
        </div>
        <h1 className="text-xl font-bold">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to manage your inventory
        </p>
      </div>
      <LoginForm />
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium underline hover:text-foreground">
          Create one
        </Link>
      </p>
    </div>
  )
}

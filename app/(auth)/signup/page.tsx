import { SignUpForm } from "@/components/forms/signup-form"
import { Package } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="w-full space-y-8 page-fade">
      <div className="space-y-2">
        {/* Mobile only logo */}
        <div className="flex lg:hidden items-center gap-2 mb-6">
          <div className="flex items-center justify-center size-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100">
            <Package className="size-5" />
          </div>
          <span className="text-xl font-bold">StockFlow</span>
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
        <p className="text-muted-foreground">
          Set up your organization to get started
        </p>
      </div>
      
      <div className="mt-8">
        <SignUpForm />
      </div>
      
      <p className="text-center text-sm text-muted-foreground mt-8">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-foreground hover:underline underline-offset-4 transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  )
}

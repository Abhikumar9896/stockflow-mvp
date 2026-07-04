import { SignUpForm } from "@/components/forms/signup-form"
import { Package } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Package className="size-6" />
          <span className="text-lg font-semibold">StockFlow</span>
        </div>
        <h1 className="text-xl font-bold">Create your account</h1>
        <p className="text-sm text-muted-foreground">
          Set up your organization
        </p>
      </div>
      <SignUpForm />
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium underline hover:text-foreground">
          Sign in
        </Link>
      </p>
    </div>
  )
}

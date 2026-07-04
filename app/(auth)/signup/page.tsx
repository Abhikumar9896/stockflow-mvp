import { SignUpForm } from "@/components/forms/signup-form"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <>
      <div className="text-center space-y-1">
        <h1 className="text-xl font-bold">Create your account</h1>
        <p className="text-sm text-muted-foreground">
          Set up your organization
        </p>
      </div>
      <SignUpForm />
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="underline hover:text-foreground">
          Sign in
        </Link>
      </p>
    </>
  )
}

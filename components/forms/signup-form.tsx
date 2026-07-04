"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema, type SignUpInput } from "@/schemas/signup"
import { signupAction } from "@/lib/actions/auth/signup"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export function SignUpForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema) as any,
  })

  async function onSubmit(data: SignUpInput) {
    try {
      const res = await signupAction({
        organizationName: data.organizationName,
        name: data.name,
        email: data.email,
        password: data.password,
      })

      if (res.user) {
        toast.success("Account created successfully")
        router.push("/dashboard")
      }
    } catch {
      toast.error("Something went wrong")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Organization</label>
        <input
          {...register("organizationName")}
          placeholder="Your company name"
          className="w-full h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
        />
        {errors.organizationName && (
          <p className="text-xs text-red-500">{errors.organizationName.message}</p>
        )}
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Your Name</label>
        <input
          {...register("name")}
          placeholder="John Doe"
          className="w-full h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          className="w-full h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Password</label>
        <input
          {...register("password")}
          type="password"
          placeholder="Min. 8 characters"
          className="w-full h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
        />
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Confirm Password</label>
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Repeat your password"
          className="w-full h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
        />
        {errors.confirmPassword && (
          <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/80 disabled:opacity-50 inline-flex items-center justify-center gap-1.5"
      >
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        {isSubmitting ? "Creating account..." : "Create Account"}
      </button>
    </form>
  )
}

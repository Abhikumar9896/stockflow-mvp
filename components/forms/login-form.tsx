"use client"

import { useForm } from "react-hook-form"
import { loginSchema, type LoginInput } from "@/schemas/login"
import { createResolver } from "@/lib/utils/form"
import { loginAction } from "@/lib/actions/auth/login"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: createResolver(loginSchema),
  })

  async function onSubmit(data: LoginInput) {
    try {
      const res = await loginAction(data)
      if (res.user) {
        toast.success("Signed in successfully")
        router.push("/dashboard")
      }
    } catch (e) {
      console.error("login error:", e)
      const msg = e instanceof Error ? e.message : "Invalid credentials"
      toast.error(msg)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          placeholder="Enter your password"
          className="w-full h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
        />
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/80 disabled:opacity-50 inline-flex items-center justify-center gap-1.5"
      >
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        {isSubmitting ? "Signing in..." : "Sign In"}
      </button>
    </form>
  )
}

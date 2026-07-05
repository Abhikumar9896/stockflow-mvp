"use client"

import { useForm } from "react-hook-form"
import { loginSchema, type LoginInput } from "@/schemas/login"
import { createResolver } from "@/lib/utils/form"
import { loginAction } from "@/lib/actions/auth/login"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [phase, setPhase] = useState<"idle" | "signing" | "redirect">("idle")
  const [isPending, startTransition] = useTransition()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: createResolver(loginSchema),
  })

  async function onSubmit(data: LoginInput) {
    setPhase("signing")
    try {
      const res = await loginAction(data)
      if (res.user) {
        setPhase("redirect")
        toast.success("Signed in successfully")
        startTransition(() => {
          router.push("/dashboard")
        })
      } else {
        setPhase("idle")
      }
    } catch (e) {
      setPhase("idle")
      const msg = e instanceof Error ? e.message : "Invalid credentials"
      toast.error(msg)
    }
  }

  const loading = phase !== "idle"

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Email <span className="text-red-500">*</span></label>
        <input
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          className="input-base"
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Password <span className="text-red-500">*</span></label>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="input-base pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={loading || isPending}
        className="btn-primary w-full h-10 relative overflow-hidden"
      >
        {loading && (
          <div className="absolute inset-0 bg-primary/80 flex items-center justify-center gap-2">
            <Loader2 className="size-4 animate-spin" />
            <span>{phase === "redirect" ? "Redirecting..." : "Signing in..."}</span>
          </div>
        )}
        <span className={loading ? "invisible" : ""}>Sign In</span>
      </button>
    </form>
  )
}

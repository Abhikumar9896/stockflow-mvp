"use client"

import { useForm } from "react-hook-form"
import { signUpSchema, type SignUpInput } from "@/schemas/signup"
import { createResolver } from "@/lib/utils/form"
import { signupAction } from "@/lib/actions/auth/signup"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export function SignUpForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [phase, setPhase] = useState<"idle" | "signing" | "redirect">("idle")
  const [isPending, startTransition] = useTransition()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: createResolver(signUpSchema),
  })

  async function onSubmit(data: SignUpInput) {
    setPhase("signing")
    try {
      const res = await signupAction({
        organizationName: data.organizationName,
        name: data.name,
        email: data.email,
        password: data.password,
      })

      if (res.user) {
        setPhase("redirect")
        toast.success("Account created successfully")
        startTransition(() => {
          router.push("/dashboard")
        })
      } else {
        setPhase("idle")
      }
    } catch (e) {
      setPhase("idle")
      const msg = e instanceof Error ? e.message : "Something went wrong"
      toast.error(msg)
    }
  }

  const loading = phase !== "idle"

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Organization <span className="text-red-500">*</span></label>
        <input
          {...register("organizationName")}
          placeholder="Your company name"
          className="input-base"
        />
        {errors.organizationName && (
          <p className="text-xs text-red-500">{errors.organizationName.message}</p>
        )}
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Your Name <span className="text-red-500">*</span></label>
        <input
          {...register("name")}
          placeholder="John Doe"
          className="input-base"
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>
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
            placeholder="Min. 8 characters"
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
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Confirm Password <span className="text-red-500">*</span></label>
        <div className="relative">
          <input
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Repeat your password"
            className="input-base pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
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
            <span>{phase === "redirect" ? "Redirecting..." : "Creating account..."}</span>
          </div>
        )}
        <span className={loading ? "invisible" : ""}>Create Account</span>
      </button>
    </form>
  )
}

"use client"

import { useForm } from "react-hook-form"
import { signUpSchema, type SignUpInput } from "@/schemas/signup"
import { createResolver } from "@/lib/utils/form"
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
    resolver: createResolver(signUpSchema),
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
    } catch (e) {
      console.error("signup error:", e)
      const msg = e instanceof Error ? e.message : "Something went wrong"
      toast.error(msg)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Organization</label>
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
        <label className="text-sm font-medium">Your Name</label>
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
        <label className="text-sm font-medium">Email</label>
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
        <label className="text-sm font-medium">Password</label>
        <input
          {...register("password")}
          type="password"
          placeholder="Min. 8 characters"
          className="input-base"
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
          className="input-base"
        />
        {errors.confirmPassword && (
          <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full h-10"
      >
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        {isSubmitting ? "Creating account..." : "Create Account"}
      </button>
    </form>
  )
}

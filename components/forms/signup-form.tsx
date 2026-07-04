"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema, type SignUpInput } from "@/schemas/signup"
import { Button } from "@/components/ui/button"
import { signupAction } from "@/lib/actions/auth/signup"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function SignUpForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
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
      <div>
        <input
          {...register("organizationName")}
          placeholder="Organization name"
          className="w-full border p-2 rounded"
        />
        {errors.organizationName && (
          <p className="text-red-500 text-sm">{errors.organizationName.message}</p>
        )}
      </div>
      <div>
        <input
          {...register("name")}
          placeholder="Your name"
          className="w-full border p-2 rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div>
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <div>
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm password"
          className="w-full border p-2 rounded"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  )
}

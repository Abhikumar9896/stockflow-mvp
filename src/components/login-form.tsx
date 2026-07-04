"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginInput } from "@/lib/schemas"
import { Button } from "@/components/ui/button"
import { signIn } from "@/lib/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginInput) {
    const res = await signIn(data.email, data.password)
    if (res.user) {
      toast.success("Signed in successfully")
      router.push("/")
    } else {
      toast.error("Invalid credentials")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div>
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  )
}

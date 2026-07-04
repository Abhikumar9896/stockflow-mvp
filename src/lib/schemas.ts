import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password kam se kam 8 characters"),
})

export const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
})

export type LoginInput = z.infer<typeof loginSchema>
export type SignUpInput = z.infer<typeof signUpSchema>

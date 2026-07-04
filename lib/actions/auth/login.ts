"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function loginAction(data: { email: string; password: string }) {
  return auth.api.signInEmail({
    body: { email: data.email, password: data.password },
    headers: await headers(),
  })
}

"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function logoutAction() {
  return auth.api.signOut({
    headers: await headers(),
  })
}

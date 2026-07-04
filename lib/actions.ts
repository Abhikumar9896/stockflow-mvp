"use server"

import { auth } from "./auth"
import { headers } from "next/headers"

export async function signIn(email: string, password: string) {
  return auth.api.signInEmail({
    body: { email, password },
    headers: await headers(),
  })
}

export async function signUp(name: string, email: string, password: string) {
  return auth.api.signUpEmail({
    body: { name, email, password },
    headers: await headers(),
  })
}

export async function signOut() {
  return auth.api.signOut({
    headers: await headers(),
  })
}

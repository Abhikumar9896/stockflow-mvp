import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function getCurrentSession() {
  return auth.api.getSession({
    headers: await headers(),
  })
}

export async function getCurrentUser() {
  const session = await getCurrentSession()
  return session?.user ?? null
}

export async function getCurrentOrganization() {
  const user = await getCurrentUser()
  if (!user?.organizationId) return null
  return db.organization.findUnique({
    where: { id: user.organizationId },
  })
}

export async function requireOrganization() {
  const user = await getCurrentUser()
  if (!user?.organizationId) redirect("/login")
  return user.organizationId
}

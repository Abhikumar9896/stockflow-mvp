"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { headers } from "next/headers"

export async function signupAction(data: {
  organizationName: string
  name: string
  email: string
  password: string
}) {
  const org = await db.organization.create({
    data: { name: data.organizationName },
  })

  const res = await auth.api.signUpEmail({
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
    headers: await headers(),
  })

  if (res.user) {
    await db.user.update({
      where: { id: res.user.id },
      data: { organizationId: org.id },
    })
  }

  return res
}

import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

// Middleware - har request pe check karta hai ki user logged in hai ya nahi
// Dashboard routes ko protect karta hai
export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // agar session nahi hai to sign-in page pe bhej do
  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  return NextResponse.next()
}

export const config = {
  runtime: "nodejs",
  matcher: ["/dashboard/:path*"],
}

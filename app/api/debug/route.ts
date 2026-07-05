import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const orgs = await db.organization.findMany({ take: 1 })
    return NextResponse.json({ ok: true, orgs: orgs.length })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}

import { NextResponse } from "next/server"

import { auth } from "@/lib/auth"
import { getServerSession, isAdmin } from "@/lib/authorization"

export async function GET(request: Request) {
  const session = await getServerSession(request.headers)

  if (!session) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  if (!isAdmin(session.user.role)) {
    return NextResponse.json({ error: "Admin role required" }, { status: 403 })
  }

  const url = new URL(request.url)
  const searchValue = url.searchParams.get("search")?.trim() || undefined
  const requestedLimit = Number(url.searchParams.get("limit") ?? 100)
  const requestedOffset = Number(url.searchParams.get("offset") ?? 0)
  const limit = Number.isFinite(requestedLimit)
    ? Math.min(Math.max(Math.trunc(requestedLimit), 1), 100)
    : 100
  const offset = Number.isFinite(requestedOffset)
    ? Math.max(Math.trunc(requestedOffset), 0)
    : 0

  const users = await auth.api.listUsers({
    headers: request.headers,
    query: {
      searchValue,
      searchField: "name",
      searchOperator: "contains",
      limit,
      offset,
      sortBy: "createdAt",
      sortDirection: "desc",
    },
  })

  return NextResponse.json(users)
}

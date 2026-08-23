import { NextResponse } from "next/server"
import { z } from "zod"

import { auth } from "@/lib/auth"
import { getServerSession, isAdmin } from "@/lib/authorization"

const createUserSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8).max(128),
  role: z.enum(["admin", "user"]).default("user"),
})

export async function POST(request: Request) {
  const session = await getServerSession(request.headers)

  if (!session) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  if (!isAdmin(session.user.role)) {
    return NextResponse.json({ error: "Admin role required" }, { status: 403 })
  }

  const body: unknown = await request.json().catch(() => null)
  const parsed = createUserSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid user data", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  const newUser = await auth.api.createUser({
    headers: request.headers,
    body: parsed.data,
  })

  return NextResponse.json(newUser, { status: 201 })
}

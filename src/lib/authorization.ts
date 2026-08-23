import "server-only"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

export type AppRole = "admin" | "user"

export function hasRole(role: string | null | undefined, expectedRole: AppRole) {
  return role?.split(",").includes(expectedRole) ?? false
}

export function isAdmin(role: string | null | undefined) {
  return hasRole(role, "admin")
}

export async function getServerSession(requestHeaders?: Headers) {
  return auth.api.getSession({
    headers: requestHeaders ?? (await headers()),
  })
}

export async function requireAdminPage() {
  const session = await getServerSession()

  if (!session) redirect("/signin")
  if (!isAdmin(session.user.role)) redirect("/dashboard")

  return session
}

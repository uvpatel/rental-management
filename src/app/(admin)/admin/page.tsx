import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { requireAdminPage } from "@/lib/authorization"

export default async function AdminPage() {
  const session = await requireAdminPage()

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-6">
      <div>
        <p className="text-sm text-muted-foreground">
          Signed in as {session.user.email}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Admin dashboard</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User management</CardTitle>
          <CardDescription>
            View users and manage access according to their assigned role.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button render={<Link href="/admin/listuser" />}>View users</Button>
        </CardContent>
      </Card>
    </main>
  )
}

// import React from 'react'

// export default function SettingPage() {
//   return (
//     <div>SettingPage

//       {/* Settings

// ┌────────────────────┐
// │ Company            │
// │ Business details   │
// └────────────────────┘

// ┌────────────────────┐
// │ Team & Roles       │
// │ Manage members     │
// └────────────────────┘

// ┌────────────────────┐
// │ Rental Settings    │
// │ Rental policies    │
// └────────────────────┘

// ┌────────────────────┐
// │ Taxes              │
// │ Tax configuration  │
// └────────────────────┘ */}
//     </div>
//   )
// }


"use client"

import { useRouter } from "next/navigation"
import {
  Building2,
  Users,
  CalendarRange,
  ReceiptText,
  ChevronRight,
  Settings2,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const settings = [
  {
    title: "Company",
    description:
      "Manage your company information, business details, contact information, and branding.",
    icon: Building2,
    href: "/settings/company",
  },
  {
    title: "Team & Roles",
    description:
      "Manage team members, roles, permissions, and access to the rental system.",
    icon: Users,
    href: "/settings/team",
  },
  {
    title: "Rental Settings",
    description:
      "Configure rental policies, reservation rules, durations, deposits, and availability.",
    icon: CalendarRange,
    href: "/settings/rental",
  },
  {
    title: "Taxes",
    description:
      "Configure tax rates, GST settings, tax rules, and default tax behavior.",
    icon: ReceiptText,
    href: "/settings/taxes",
  },
]

export default function SettingPage() {
  const router = useRouter()

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Settings2 className="size-5 text-muted-foreground" />

            <h1 className="text-2xl font-semibold tracking-tight">
              Settings
            </h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your business, team, rental policies, and tax configuration.
          </p>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {settings.map((setting) => {
          const Icon = setting.icon

          return (
            <Card
              key={setting.title}
              role="button"
              tabIndex={0}
              onClick={() => router.push(setting.href)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  router.push(setting.href)
                }
              }}
              className="group cursor-pointer transition-all hover:border-foreground/20 hover:shadow-sm"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-10 items-center justify-center rounded-lg border bg-muted/40">
                    <Icon className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                  </div>

                  <ChevronRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                </div>
              </CardHeader>

              <CardContent>
                <CardTitle className="mb-2 text-base">
                  {setting.title}
                </CardTitle>

                <CardDescription className="leading-relaxed">
                  {setting.description}
                </CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
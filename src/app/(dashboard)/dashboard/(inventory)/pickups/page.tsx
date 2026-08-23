// import React from 'react'

// export default function PickupPage() {
//   return (
//     <div>PickupPage

//       {/* Pickups

// Pickup      Customer      Scheduled       Status
// PCK-001     ABC Ltd       Aug 25 10:00    Ready


// filter

// Today
// Upcoming
// Completed
// Status

// */}



//     </div>
//   )
// }


"use client"

import { useMemo, useState } from "react"
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MoreHorizontal,
  PackageCheck,
  Search,
  Truck,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type PickupStatus =
  | "scheduled"
  | "ready"
  | "in-progress"
  | "completed"
  | "cancelled"

type PickupPeriod = "today" | "upcoming" | "completed"

interface Pickup {
  id: string
  customer: string
  address: string
  scheduledAt: string
  status: PickupStatus
  period: PickupPeriod
  items: number
}

const pickups: Pickup[] = [
  {
    id: "PCK-001",
    customer: "ABC Ltd",
    address: "Ahmedabad, Gujarat",
    scheduledAt: "Aug 25, 10:00 AM",
    status: "ready",
    period: "today",
    items: 4,
  },
  {
    id: "PCK-002",
    customer: "Patel Enterprises",
    address: "Anand, Gujarat",
    scheduledAt: "Aug 25, 12:30 PM",
    status: "scheduled",
    period: "today",
    items: 2,
  },
  {
    id: "PCK-003",
    customer: "Global Furniture",
    address: "Vadodara, Gujarat",
    scheduledAt: "Aug 26, 9:00 AM",
    status: "in-progress",
    period: "upcoming",
    items: 8,
  },
  {
    id: "PCK-004",
    customer: "Shree Corporation",
    address: "Nadiad, Gujarat",
    scheduledAt: "Aug 23, 4:00 PM",
    status: "completed",
    period: "completed",
    items: 3,
  },
]

const statusStyles: Record<PickupStatus, string> = {
  scheduled:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",
  ready:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
  "in-progress":
    "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900 dark:bg-purple-950 dark:text-purple-300",
  completed:
    "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300",
  cancelled:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
}

function formatStatus(status: PickupStatus) {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export default function PickupPage() {
  const [search, setSearch] = useState("")
  const [period, setPeriod] = useState<"all" | PickupPeriod>("all")
  const [status, setStatus] = useState<"all" | PickupStatus>("all")

  const filteredPickups = useMemo(() => {
    const query = search.trim().toLowerCase()

    return pickups.filter((pickup) => {
      const matchesSearch =
        pickup.id.toLowerCase().includes(query) ||
        pickup.customer.toLowerCase().includes(query) ||
        pickup.address.toLowerCase().includes(query)

      const matchesPeriod = period === "all" || pickup.period === period
      const matchesStatus = status === "all" || pickup.status === status

      return matchesSearch && matchesPeriod && matchesStatus
    })
  }, [search, period, status])

  const completedCount = pickups.filter(
    (pickup) => pickup.status === "completed"
  ).length

  const readyCount = pickups.filter(
    (pickup) => pickup.status === "ready"
  ).length

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pickups</h1>
          <p className="text-muted-foreground">
            Schedule, track and manage customer pickups.
          </p>
        </div>

        <Button>
          <Truck className="mr-2 size-4" />
          Create pickup
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          title="Total pickups"
          value={pickups.length}
          description="All pickup requests"
          icon={PackageCheck}
        />

        <SummaryCard
          title="Ready for pickup"
          value={readyCount}
          description="Awaiting collection"
          icon={Clock3}
        />

        <SummaryCard
          title="Completed"
          value={completedCount}
          description="Successfully collected"
          icon={CheckCircle2}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pickup schedule</CardTitle>
          <CardDescription>
            View and update scheduled pickup requests.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search pickup, customer or address..."
                className="pl-9"
              />
            </div>

            <Select
              value={period}
              onValueChange={(value) =>
                setPeriod(value as "all" | PickupPeriod)
              }
            >
              <SelectTrigger className="w-full lg:w-44">
                <CalendarDays className="mr-2 size-4" />
                <SelectValue placeholder="Date" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={status}
              onValueChange={(value) =>
                setStatus(value as "all" | PickupStatus)
              }
            >
              <SelectTrigger className="w-full lg:w-44">
                <SelectValue placeholder="Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="in-progress">In progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pickup</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Scheduled</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredPickups.length > 0 ? (
                  filteredPickups.map((pickup) => (
                    <TableRow key={pickup.id}>
                      <TableCell className="font-medium">
                        {pickup.id}
                      </TableCell>

                      <TableCell>
                        <div>
                          <p className="font-medium">{pickup.customer}</p>
                          <p className="text-muted-foreground text-sm">
                            {pickup.address}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>{pickup.scheduledAt}</TableCell>
                      <TableCell>{pickup.items}</TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className={statusStyles[pickup.status]}
                        >
                          {formatStatus(pickup.status)}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <PickupActions pickup={pickup} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center">
                      <PackageCheck className="text-muted-foreground mx-auto mb-2 size-8" />
                      <p className="font-medium">No pickups found</p>
                      <p className="text-muted-foreground text-sm">
                        Try changing your filters.
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string
  value: number
  description: string
  icon: React.ElementType
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-muted-foreground text-sm">{title}</p>
          <p className="mt-1 text-3xl font-bold">{value}</p>
          <p className="text-muted-foreground mt-1 text-xs">{description}</p>
        </div>

        <div className="bg-primary/10 rounded-lg p-3">
          <Icon className="text-primary size-5" />
        </div>
      </CardContent>
    </Card>
  )
}

function PickupActions({ pickup }: { pickup: Pickup }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger >
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Pickup actions</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{pickup.id}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View details</DropdownMenuItem>
        <DropdownMenuItem>Edit pickup</DropdownMenuItem>
        <DropdownMenuItem>Mark as ready</DropdownMenuItem>
        <DropdownMenuItem>Mark as completed</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">
          Cancel pickup
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
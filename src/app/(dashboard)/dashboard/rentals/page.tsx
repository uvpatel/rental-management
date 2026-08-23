// import React from 'react'

// export default function RentalsPage() {
//   return (
//     <div>RentalsPage

//         {/* Rental Orders

// Order    Customer    Period    Payment    Pickup    Return
// R-001    ABC Ltd     25-28     Partial    Ready     Pending */}
//     </div>
//   )
// }


"use client"

import { useMemo, useState } from "react"
import {
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Eye,
  MoreHorizontal,
  PackageCheck,
  Plus,
  RotateCcw,
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

type RentalStatus =
  | "confirmed"
  | "active"
  | "overdue"
  | "completed"
  | "cancelled"

type PaymentStatus = "unpaid" | "partial" | "paid" | "refunded"

type PickupStatus =
  | "pending"
  | "ready"
  | "picked-up"
  | "not-required"

type ReturnStatus =
  | "pending"
  | "due"
  | "returned"
  | "late"
  | "not-started"

interface Rental {
  id: string
  customer: string
  rentalStart: string
  rentalEnd: string
  items: number
  total: number
  paid: number
  rentalStatus: RentalStatus
  paymentStatus: PaymentStatus
  pickupStatus: PickupStatus
  returnStatus: ReturnStatus
}

const rentals: Rental[] = [
  {
    id: "R-001",
    customer: "ABC Ltd",
    rentalStart: "Aug 25, 2026",
    rentalEnd: "Aug 28, 2026",
    items: 4,
    total: 18500,
    paid: 9000,
    rentalStatus: "confirmed",
    paymentStatus: "partial",
    pickupStatus: "ready",
    returnStatus: "not-started",
  },
  {
    id: "R-002",
    customer: "Patel Enterprises",
    rentalStart: "Aug 22, 2026",
    rentalEnd: "Aug 27, 2026",
    items: 7,
    total: 32400,
    paid: 32400,
    rentalStatus: "active",
    paymentStatus: "paid",
    pickupStatus: "picked-up",
    returnStatus: "pending",
  },
  {
    id: "R-003",
    customer: "Global Events",
    rentalStart: "Aug 18, 2026",
    rentalEnd: "Aug 22, 2026",
    items: 12,
    total: 56750,
    paid: 40000,
    rentalStatus: "overdue",
    paymentStatus: "partial",
    pickupStatus: "picked-up",
    returnStatus: "late",
  },
  {
    id: "R-004",
    customer: "Shree Corporation",
    rentalStart: "Aug 12, 2026",
    rentalEnd: "Aug 15, 2026",
    items: 3,
    total: 9800,
    paid: 9800,
    rentalStatus: "completed",
    paymentStatus: "paid",
    pickupStatus: "picked-up",
    returnStatus: "returned",
  },
]

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

const rentalStatusStyles: Record<RentalStatus, string> = {
  confirmed: "border-blue-200 bg-blue-50 text-blue-700",
  active: "border-purple-200 bg-purple-50 text-purple-700",
  overdue: "border-red-200 bg-red-50 text-red-700",
  completed: "border-green-200 bg-green-50 text-green-700",
  cancelled: "border-slate-200 bg-slate-50 text-slate-700",
}

const paymentStatusStyles: Record<PaymentStatus, string> = {
  unpaid: "border-red-200 bg-red-50 text-red-700",
  partial: "border-amber-200 bg-amber-50 text-amber-700",
  paid: "border-green-200 bg-green-50 text-green-700",
  refunded: "border-slate-200 bg-slate-50 text-slate-700",
}

const fulfilmentStatusStyles: Record<
  PickupStatus | ReturnStatus,
  string
> = {
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  ready: "border-blue-200 bg-blue-50 text-blue-700",
  "picked-up": "border-purple-200 bg-purple-50 text-purple-700",
  "not-required": "border-slate-200 bg-slate-50 text-slate-700",
  due: "border-orange-200 bg-orange-50 text-orange-700",
  returned: "border-green-200 bg-green-50 text-green-700",
  late: "border-red-200 bg-red-50 text-red-700",
  "not-started": "border-slate-200 bg-slate-50 text-slate-700",
}

function formatStatus(status: string) {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export default function RentalsPage() {
  const [search, setSearch] = useState("")
  const [rentalStatus, setRentalStatus] = useState<
    "all" | RentalStatus
  >("all")
  const [paymentStatus, setPaymentStatus] = useState<
    "all" | PaymentStatus
  >("all")

  const filteredRentals = useMemo(() => {
    const query = search.trim().toLowerCase()

    return rentals.filter((rental) => {
      const matchesSearch =
        rental.id.toLowerCase().includes(query) ||
        rental.customer.toLowerCase().includes(query)

      const matchesRentalStatus =
        rentalStatus === "all" ||
        rental.rentalStatus === rentalStatus

      const matchesPaymentStatus =
        paymentStatus === "all" ||
        rental.paymentStatus === paymentStatus

      return (
        matchesSearch &&
        matchesRentalStatus &&
        matchesPaymentStatus
      )
    })
  }, [search, rentalStatus, paymentStatus])

  const activeRentals = rentals.filter(
    (rental) => rental.rentalStatus === "active"
  ).length

  const overdueRentals = rentals.filter(
    (rental) => rental.rentalStatus === "overdue"
  ).length

  const outstandingAmount = rentals.reduce(
    (total, rental) => total + (rental.total - rental.paid),
    0
  )

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Rental Orders
          </h1>
          <p className="text-muted-foreground">
            Manage rental periods, payments, pickups and returns.
          </p>
        </div>

        <Button>
          <Plus className="mr-2 size-4" />
          New rental
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total rentals"
          value={rentals.length.toString()}
          description="All rental orders"
          icon={PackageCheck}
        />

        <SummaryCard
          title="Active rentals"
          value={activeRentals.toString()}
          description="Currently with customers"
          icon={Truck}
        />

        <SummaryCard
          title="Overdue returns"
          value={overdueRentals.toString()}
          description="Require immediate attention"
          icon={Clock3}
          destructive={overdueRentals > 0}
        />

        <SummaryCard
          title="Outstanding"
          value={currencyFormatter.format(outstandingAmount)}
          description="Remaining payments"
          icon={CircleDollarSign}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All rental orders</CardTitle>
          <CardDescription>
            Track the complete lifecycle of every rental.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 xl:flex-row">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />

              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by order or customer..."
                className="pl-9"
              />
            </div>

            <Select
              value={rentalStatus}
              onValueChange={(value) =>
                setRentalStatus(value as "all" | RentalStatus)
              }
            >
              <SelectTrigger className="w-full xl:w-48">
                <SelectValue placeholder="Rental status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All rentals</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={paymentStatus}
              onValueChange={(value) =>
                setPaymentStatus(value as "all" | PaymentStatus)
              }
            >
              <SelectTrigger className="w-full xl:w-48">
                <SelectValue placeholder="Payment status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All payments</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Rental period</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Pickup</TableHead>
                  <TableHead>Return</TableHead>
                  <TableHead>Order status</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredRentals.length > 0 ? (
                  filteredRentals.map((rental) => (
                    <TableRow key={rental.id}>
                      <TableCell className="font-medium">
                        {rental.id}
                      </TableCell>

                      <TableCell>{rental.customer}</TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <CalendarDays className="text-muted-foreground size-4" />
                          <span>
                            {rental.rentalStart} – {rental.rentalEnd}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>{rental.items}</TableCell>

                      <TableCell className="font-medium">
                        {currencyFormatter.format(rental.total)}
                      </TableCell>

                      <TableCell>
                        <StatusBadge
                          status={rental.paymentStatus}
                          styles={paymentStatusStyles}
                        />

                        {rental.paymentStatus === "partial" && (
                          <p className="text-muted-foreground mt-1 text-xs">
                            {currencyFormatter.format(rental.paid)} paid
                          </p>
                        )}
                      </TableCell>

                      <TableCell>
                        <StatusBadge
                          status={rental.pickupStatus}
                          styles={fulfilmentStatusStyles}
                        />
                      </TableCell>

                      <TableCell>
                        <StatusBadge
                          status={rental.returnStatus}
                          styles={fulfilmentStatusStyles}
                        />
                      </TableCell>

                      <TableCell>
                        <StatusBadge
                          status={rental.rentalStatus}
                          styles={rentalStatusStyles}
                        />
                      </TableCell>

                      <TableCell>
                        <RentalActions rental={rental} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={10}
                      className="h-40 text-center"
                    >
                      <PackageCheck className="text-muted-foreground mx-auto mb-3 size-9" />
                      <p className="font-medium">
                        No rental orders found
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Change the filters or create a rental.
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
  destructive = false,
}: {
  title: string
  value: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  destructive?: boolean
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div className="min-w-0">
          <p className="text-muted-foreground text-sm">{title}</p>

          <p
            className={`mt-1 truncate text-2xl font-bold tabular-nums ${
              destructive ? "text-destructive" : ""
            }`}
          >
            {value}
          </p>

          <p className="text-muted-foreground mt-1 text-xs">
            {description}
          </p>
        </div>

        <div
          className={`ml-4 rounded-lg p-3 ${
            destructive
              ? "bg-destructive/10"
              : "bg-primary/10"
          }`}
        >
          <Icon
            className={`size-5 ${
              destructive ? "text-destructive" : "text-primary"
            }`}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function StatusBadge<T extends string>({
  status,
  styles,
}: {
  status: T
  styles: Record<T, string>
}) {
  return (
    <Badge
      variant="outline"
      className={styles[status]}
    >
      {formatStatus(status)}
    </Badge>
  )
}

function RentalActions({ rental }: { rental: Rental }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger >
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="size-4" />
          <span className="sr-only">
            Actions for {rental.id}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{rental.id}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Eye className="mr-2 size-4" />
          View order
        </DropdownMenuItem>

        {rental.pickupStatus === "pending" && (
          <DropdownMenuItem>
            <PackageCheck className="mr-2 size-4" />
            Mark pickup ready
          </DropdownMenuItem>
        )}

        {rental.pickupStatus === "ready" && (
          <DropdownMenuItem>
            <Truck className="mr-2 size-4" />
            Complete pickup
          </DropdownMenuItem>
        )}

        {rental.paymentStatus !== "paid" && (
          <DropdownMenuItem>
            <CircleDollarSign className="mr-2 size-4" />
            Record payment
          </DropdownMenuItem>
        )}

        {rental.pickupStatus === "picked-up" &&
          rental.returnStatus !== "returned" && (
            <DropdownMenuItem>
              <RotateCcw className="mr-2 size-4" />
              Process return
            </DropdownMenuItem>
          )}

        {rental.returnStatus === "returned" && (
          <DropdownMenuItem>
            <CheckCircle2 className="mr-2 size-4" />
            View return report
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
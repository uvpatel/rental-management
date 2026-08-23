// import SearchBar from '@/components/searchbar'
// import { SectionCards } from '@/components/section-cards'
// import { Badge } from '@/components/ui/badge'
// import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { TrendingUpIcon } from 'lucide-react'
// import React from 'react'

// /* 
// Quotations

//                          [+ New Quotation]

// Quotation   Customer    Rental Period   Total     Status
// Q-001       ABC Ltd     Aug 25-28       ₹...      Draft
// */

// export default function QuotationsPage() {
//   return (
//     <div className="flex flex-1 flex-col gap-2 m-4">
//     <SearchBar />
//         <div className="flex flex-1 flex-col">
//           <div className="@container/main flex flex-1 flex-col gap-2">
//             <div className="flex flex-col  gap-4 py-4 md:gap-6 md:py-6">
            
//              <Card className="@container/card">

//         <CardHeader>
//           <CardDescription>Low Availability Products</CardDescription>
//           <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
//             4.5%
//           </CardTitle>
//           <CardAction>
//             <Badge variant="outline">
//               <TrendingUpIcon
//               />
//               +4.5%
//             </Badge>
//           </CardAction>
//         </CardHeader>
//         <CardFooter className="flex-col items-start gap-1.5 text-sm">
//           <div className="line-clamp-1 flex gap-2 font-medium">
//             Steady performance increase{" "}
//             <TrendingUpIcon className="size-4" />
//           </div>
//           <div className="text-muted-foreground">Meets growth projections</div>
//         </CardFooter>
//       </Card>
//       <Card className="@container/card">
//         <CardHeader>
//           <CardDescription>Low Availability Products</CardDescription>
//           <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
//             4.5%
//           </CardTitle>
//           <CardAction>
//             <Badge variant="outline">
//               <TrendingUpIcon
//               />
//               +4.5%
//             </Badge>
//           </CardAction>
//         </CardHeader>
//         <CardFooter className="flex-col items-start gap-1.5 text-sm">
//           <div className="line-clamp-1 flex gap-2 font-medium">
//             Steady performance increase{" "}
//             <TrendingUpIcon className="size-4" />
//           </div>
//           <div className="text-muted-foreground">Meets growth projections</div>
//         </CardFooter>
//       </Card>
              
//             </div>
            
//             {/* Quotations

// Customer
// Rental Period
// Items
// Total
// Status
// Created
// Valid Until
// Actions
            
//             */}

//           </div>
//         </div>
        
 
//     </div>
//   )
// }


"use client"

import { useMemo, useState } from "react"
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  FilePenLine,
  FilePlus2,
  FileText,
  MoreHorizontal,
  Search,
  Send,
  Trash2,
  XCircle,
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

type QuotationStatus =
  | "draft"
  | "sent"
  | "accepted"
  | "rejected"
  | "expired"

interface Quotation {
  id: string
  customer: string
  rentalStart: string
  rentalEnd: string
  items: number
  total: number
  status: QuotationStatus
  createdAt: string
  validUntil: string
}

const quotations: Quotation[] = [
  {
    id: "Q-001",
    customer: "ABC Ltd",
    rentalStart: "Aug 25, 2026",
    rentalEnd: "Aug 28, 2026",
    items: 4,
    total: 18500,
    status: "draft",
    createdAt: "Aug 20, 2026",
    validUntil: "Aug 27, 2026",
  },
  {
    id: "Q-002",
    customer: "Patel Enterprises",
    rentalStart: "Aug 27, 2026",
    rentalEnd: "Sep 02, 2026",
    items: 7,
    total: 32400,
    status: "sent",
    createdAt: "Aug 19, 2026",
    validUntil: "Aug 26, 2026",
  },
  {
    id: "Q-003",
    customer: "Global Events",
    rentalStart: "Sep 01, 2026",
    rentalEnd: "Sep 05, 2026",
    items: 12,
    total: 56750,
    status: "accepted",
    createdAt: "Aug 17, 2026",
    validUntil: "Aug 24, 2026",
  },
  {
    id: "Q-004",
    customer: "Shree Corporation",
    rentalStart: "Aug 29, 2026",
    rentalEnd: "Aug 31, 2026",
    items: 3,
    total: 9800,
    status: "rejected",
    createdAt: "Aug 15, 2026",
    validUntil: "Aug 22, 2026",
  },
  {
    id: "Q-005",
    customer: "Creative Solutions",
    rentalStart: "Aug 20, 2026",
    rentalEnd: "Aug 22, 2026",
    items: 2,
    total: 7200,
    status: "expired",
    createdAt: "Aug 10, 2026",
    validUntil: "Aug 17, 2026",
  },
]

const statusStyles: Record<QuotationStatus, string> = {
  draft:
    "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300",
  sent:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",
  accepted:
    "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300",
  rejected:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
  expired:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
}

const statusIcons: Record<
  QuotationStatus,
  React.ComponentType<{ className?: string }>
> = {
  draft: FilePenLine,
  sent: Send,
  accepted: CheckCircle2,
  rejected: XCircle,
  expired: Clock3,
}

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

function formatStatus(status: QuotationStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

export default function QuotationsPage() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<"all" | QuotationStatus>("all")

  const filteredQuotations = useMemo(() => {
    const query = search.trim().toLowerCase()

    return quotations.filter((quotation) => {
      const matchesSearch =
        quotation.id.toLowerCase().includes(query) ||
        quotation.customer.toLowerCase().includes(query)

      const matchesStatus =
        status === "all" || quotation.status === status

      return matchesSearch && matchesStatus
    })
  }, [search, status])

  const totalValue = quotations.reduce(
    (total, quotation) => total + quotation.total,
    0
  )

  const acceptedValue = quotations
    .filter((quotation) => quotation.status === "accepted")
    .reduce((total, quotation) => total + quotation.total, 0)

  const pendingCount = quotations.filter(
    (quotation) =>
      quotation.status === "draft" || quotation.status === "sent"
  ).length

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Quotations
          </h1>
          <p className="text-muted-foreground">
            Create, send and track rental quotations.
          </p>
        </div>

        <Button>
          <FilePlus2 className="mr-2 size-4" />
          New quotation
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total quotations"
          value={quotations.length.toString()}
          description="All quotations"
          icon={FileText}
        />

        <SummaryCard
          title="Quotation value"
          value={currencyFormatter.format(totalValue)}
          description="Combined quotation amount"
          icon={FileText}
        />

        <SummaryCard
          title="Pending"
          value={pendingCount.toString()}
          description="Draft or awaiting response"
          icon={Clock3}
        />

        <SummaryCard
          title="Accepted value"
          value={currencyFormatter.format(acceptedValue)}
          description="Confirmed quotation value"
          icon={CheckCircle2}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All quotations</CardTitle>
          <CardDescription>
            Review quotation details, validity and customer responses.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />

              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by quotation or customer..."
                className="pl-9"
              />
            </div>

            <Select
              value={status}
              onValueChange={(value) =>
                setStatus(value as "all" | QuotationStatus)
              }
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quotation</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Rental period</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Valid until</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredQuotations.length > 0 ? (
                  filteredQuotations.map((quotation) => (
                    <TableRow key={quotation.id}>
                      <TableCell className="font-medium">
                        {quotation.id}
                      </TableCell>

                      <TableCell>{quotation.customer}</TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <CalendarDays className="text-muted-foreground size-4" />
                          <span>
                            {quotation.rentalStart} –{" "}
                            {quotation.rentalEnd}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>{quotation.items}</TableCell>

                      <TableCell className="font-medium">
                        {currencyFormatter.format(quotation.total)}
                      </TableCell>

                      <TableCell>
                        <QuotationStatusBadge status={quotation.status} />
                      </TableCell>

                      <TableCell className="whitespace-nowrap">
                        {quotation.createdAt}
                      </TableCell>

                      <TableCell className="whitespace-nowrap">
                        {quotation.validUntil}
                      </TableCell>

                      <TableCell>
                        <QuotationActions quotation={quotation} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="h-40 text-center"
                    >
                      <FileText className="text-muted-foreground mx-auto mb-3 size-9" />
                      <p className="font-medium">
                        No quotations found
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Change your filters or create a quotation.
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
  value: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div className="min-w-0">
          <p className="text-muted-foreground text-sm">{title}</p>
          <p className="mt-1 truncate text-2xl font-bold tabular-nums">
            {value}
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            {description}
          </p>
        </div>

        <div className="bg-primary/10 ml-4 rounded-lg p-3">
          <Icon className="text-primary size-5" />
        </div>
      </CardContent>
    </Card>
  )
}

function QuotationStatusBadge({
  status,
}: {
  status: QuotationStatus
}) {
  const Icon = statusIcons[status]

  return (
    <Badge
      variant="outline"
      className={`gap-1.5 ${statusStyles[status]}`}
    >
      <Icon className="size-3" />
      {formatStatus(status)}
    </Badge>
  )
}

function QuotationActions({
  quotation,
}: {
  quotation: Quotation
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger >
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="size-4" />
          <span className="sr-only">
            Actions for {quotation.id}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{quotation.id}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Eye className="mr-2 size-4" />
          View details
        </DropdownMenuItem>

        <DropdownMenuItem disabled={quotation.status === "accepted"}>
          <FilePenLine className="mr-2 size-4" />
          Edit quotation
        </DropdownMenuItem>

        {quotation.status === "draft" && (
          <DropdownMenuItem>
            <Send className="mr-2 size-4" />
            Send to customer
          </DropdownMenuItem>
        )}

        {quotation.status === "accepted" && (
          <DropdownMenuItem>
            <FilePlus2 className="mr-2 size-4" />
            Convert to rental
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-destructive">
          <Trash2 className="mr-2 size-4" />
          Delete quotation
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
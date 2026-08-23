import React from 'react'

export default function ReservationsPage() {
  return (
    <div>ReservationsPage

      {/* [List] [Calendar] */}

      {/* Variant       Customer    Qty    Start     End       Status
Canon R5      ABC         2      Aug 25    Aug 28    Active */}



// // {/* Check Availability

// // Product/Variant
// // Start
// // End
// // Quantity

// // [Check]

On Hand       10
Reserved       6
Available      4
 */}
 
    </div>
  )
 }


// "use client"

// import { useMemo, useState } from "react"
// import {
//   CalendarDays,
//   CheckCircle2,
//   Clock3,
//   Eye,
//   Grid2X2,
//   List,
//   MoreHorizontal,
//   PackageSearch,
//   Plus,
//   Search,
//   XCircle,
// } from "lucide-react"

// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs"

// type ReservationStatus =
//   | "pending"
//   | "confirmed"
//   | "active"
//   | "completed"
//   | "cancelled"

// interface Reservation {
//   id: string
//   variantId: string
//   variant: string
//   customer: string
//   quantity: number
//   startDate: string
//   endDate: string
//   startDateValue: string
//   status: ReservationStatus
// }

// interface ProductVariant {
//   id: string
//   name: string
//   onHand: number
//   reserved: number
// }

// const productVariants: ProductVariant[] = [
//   {
//     id: "canon-r5",
//     name: "Canon EOS R5",
//     onHand: 10,
//     reserved: 6,
//   },
//   {
//     id: "sony-a7-iv",
//     name: "Sony A7 IV",
//     onHand: 8,
//     reserved: 3,
//   },
//   {
//     id: "nikon-z8",
//     name: "Nikon Z8",
//     onHand: 5,
//     reserved: 4,
//   },
//   {
//     id: "canon-rf-24-70",
//     name: "Canon RF 24-70mm",
//     onHand: 12,
//     reserved: 5,
//   },
// ]

// const reservations: Reservation[] = [
//   {
//     id: "RES-001",
//     variantId: "canon-r5",
//     variant: "Canon EOS R5",
//     customer: "ABC Ltd",
//     quantity: 2,
//     startDate: "Aug 25, 2026",
//     endDate: "Aug 28, 2026",
//     startDateValue: "2026-08-25",
//     status: "active",
//   },
//   {
//     id: "RES-002",
//     variantId: "sony-a7-iv",
//     variant: "Sony A7 IV",
//     customer: "Patel Enterprises",
//     quantity: 3,
//     startDate: "Aug 26, 2026",
//     endDate: "Aug 30, 2026",
//     startDateValue: "2026-08-26",
//     status: "confirmed",
//   },
//   {
//     id: "RES-003",
//     variantId: "nikon-z8",
//     variant: "Nikon Z8",
//     customer: "Global Events",
//     quantity: 1,
//     startDate: "Aug 27, 2026",
//     endDate: "Sep 02, 2026",
//     startDateValue: "2026-08-27",
//     status: "pending",
//   },
//   {
//     id: "RES-004",
//     variantId: "canon-rf-24-70",
//     variant: "Canon RF 24-70mm",
//     customer: "Creative Studio",
//     quantity: 4,
//     startDate: "Aug 29, 2026",
//     endDate: "Sep 01, 2026",
//     startDateValue: "2026-08-29",
//     status: "confirmed",
//   },
// ]

// const statusStyles: Record<ReservationStatus, string> = {
//   pending: "border-amber-200 bg-amber-50 text-amber-700",
//   confirmed: "border-blue-200 bg-blue-50 text-blue-700",
//   active: "border-purple-200 bg-purple-50 text-purple-700",
//   completed: "border-green-200 bg-green-50 text-green-700",
//   cancelled: "border-red-200 bg-red-50 text-red-700",
// }

// function formatStatus(status: ReservationStatus) {
//   return status.charAt(0).toUpperCase() + status.slice(1)
// }

// export default function ReservationsPage() {
//   const [search, setSearch] = useState("")
//   const [status, setStatus] = useState<"all" | ReservationStatus>(
//     "all"
//   )

//   const [variantId, setVariantId] = useState("")
//   const [startDate, setStartDate] = useState("")
//   const [endDate, setEndDate] = useState("")
//   const [quantity, setQuantity] = useState("1")
//   const [availabilityResult, setAvailabilityResult] =
//     useState<ProductVariant | null>(null)

//   const filteredReservations = useMemo(() => {
//     const query = search.trim().toLowerCase()

//     return reservations.filter((reservation) => {
//       const matchesSearch =
//         reservation.id.toLowerCase().includes(query) ||
//         reservation.variant.toLowerCase().includes(query) ||
//         reservation.customer.toLowerCase().includes(query)

//       const matchesStatus =
//         status === "all" || reservation.status === status

//       return matchesSearch && matchesStatus
//     })
//   }, [search, status])

//   const calendarGroups = useMemo(() => {
//     return filteredReservations.reduce<
//       Record<string, Reservation[]>
//     >((groups, reservation) => {
//       groups[reservation.startDate] ??= []
//       groups[reservation.startDate].push(reservation)
//       return groups
//     }, {})
//   }, [filteredReservations])

//   function checkAvailability() {
//     if (!variantId || !startDate || !endDate) return

//     const variant = productVariants.find(
//       (item) => item.id === variantId
//     )

//     setAvailabilityResult(variant ?? null)
//   }

//   const requestedQuantity = Number(quantity) || 0
//   const availableQuantity = availabilityResult
//     ? availabilityResult.onHand - availabilityResult.reserved
//     : 0

//   const hasEnoughStock =
//     availabilityResult !== null &&
//     requestedQuantity > 0 &&
//     requestedQuantity <= availableQuantity

//   return (
//     <div className="space-y-6 p-4 md:p-6">
//       <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//         <div>
//           <h1 className="text-2xl font-bold tracking-tight">
//             Reservations
//           </h1>
//           <p className="text-muted-foreground">
//             Reserve inventory and check availability across rental
//             periods.
//           </p>
//         </div>

//         <Button>
//           <Plus className="mr-2 size-4" />
//           New reservation
//         </Button>
//       </div>

//       <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
//         <Card>
//           <CardHeader>
//             <CardTitle>Inventory reservations</CardTitle>
//             <CardDescription>
//               View upcoming, active and completed reservations.
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <Tabs defaultValue="list" className="space-y-4">
//               <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
//                 <TabsList>
//                   <TabsTrigger value="list">
//                     <List className="mr-2 size-4" />
//                     List
//                   </TabsTrigger>

//                   <TabsTrigger value="calendar">
//                     <CalendarDays className="mr-2 size-4" />
//                     Calendar
//                   </TabsTrigger>
//                 </TabsList>

//                 <div className="relative flex-1">
//                   <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />

//                   <Input
//                     value={search}
//                     onChange={(event) =>
//                       setSearch(event.target.value)
//                     }
//                     placeholder="Search reservation, product or customer..."
//                     className="pl-9"
//                   />
//                 </div>

//                 <Select
//                   value={status}
//                   onValueChange={(value) =>
//                     setStatus(
//                       value as "all" | ReservationStatus
//                     )
//                   }
//                 >
//                   <SelectTrigger className="w-full lg:w-44">
//                     <SelectValue placeholder="Status" />
//                   </SelectTrigger>

//                   <SelectContent>
//                     <SelectItem value="all">
//                       All statuses
//                     </SelectItem>
//                     <SelectItem value="pending">Pending</SelectItem>
//                     <SelectItem value="confirmed">
//                       Confirmed
//                     </SelectItem>
//                     <SelectItem value="active">Active</SelectItem>
//                     <SelectItem value="completed">
//                       Completed
//                     </SelectItem>
//                     <SelectItem value="cancelled">
//                       Cancelled
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <TabsContent value="list">
//                 <ReservationTable
//                   reservations={filteredReservations}
//                 />
//               </TabsContent>

//               <TabsContent value="calendar">
//                 <ReservationCalendar groups={calendarGroups} />
//               </TabsContent>
//             </Tabs>
//           </CardContent>
//         </Card>

//         <Card className="h-fit">
//           <CardHeader>
//             <div className="flex items-center gap-3">
//               <div className="bg-primary/10 rounded-lg p-2.5">
//                 <PackageSearch className="text-primary size-5" />
//               </div>

//               <div>
//                 <CardTitle>Check availability</CardTitle>
//                 <CardDescription>
//                   Find available inventory for a rental period.
//                 </CardDescription>
//               </div>
//             </div>
//           </CardHeader>

//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label>Product or variant</Label>

//               <Select
//                 value={variantId}
//                 onValueChange={(value) => {
//                   setVariantId(value)
//                   setAvailabilityResult(null)
//                 }}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a variant" />
//                 </SelectTrigger>

//                 <SelectContent>
//                   {productVariants.map((variant) => (
//                     <SelectItem
//                       key={variant.id}
//                       value={variant.id}
//                     >
//                       {variant.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//               <div className="space-y-2">
//                 <Label htmlFor="start-date">Start</Label>
//                 <Input
//                   id="start-date"
//                   type="date"
//                   value={startDate}
//                   onChange={(event) => {
//                     setStartDate(event.target.value)
//                     setAvailabilityResult(null)
//                   }}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="end-date">End</Label>
//                 <Input
//                   id="end-date"
//                   type="date"
//                   min={startDate}
//                   value={endDate}
//                   onChange={(event) => {
//                     setEndDate(event.target.value)
//                     setAvailabilityResult(null)
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="quantity">Quantity</Label>
//               <Input
//                 id="quantity"
//                 type="number"
//                 min="1"
//                 value={quantity}
//                 onChange={(event) => {
//                   setQuantity(event.target.value)
//                   setAvailabilityResult(null)
//                 }}
//               />
//             </div>

//             <Button
//               className="w-full"
//               onClick={checkAvailability}
//               disabled={
//                 !variantId ||
//                 !startDate ||
//                 !endDate ||
//                 requestedQuantity < 1 ||
//                 endDate < startDate
//               }
//             >
//               <PackageSearch className="mr-2 size-4" />
//               Check availability
//             </Button>

//             {availabilityResult && (
//               <div className="space-y-3 rounded-lg border p-4">
//                 <div className="flex items-center justify-between">
//                   <p className="font-medium">
//                     {availabilityResult.name}
//                   </p>

//                   <Badge
//                     variant="outline"
//                     className={
//                       hasEnoughStock
//                         ? "border-green-200 bg-green-50 text-green-700"
//                         : "border-red-200 bg-red-50 text-red-700"
//                     }
//                   >
//                     {hasEnoughStock ? (
//                       <CheckCircle2 className="mr-1 size-3" />
//                     ) : (
//                       <XCircle className="mr-1 size-3" />
//                     )}

//                     {hasEnoughStock
//                       ? "Available"
//                       : "Insufficient stock"}
//                   </Badge>
//                 </div>

//                 <AvailabilityRow
//                   label="On hand"
//                   value={availabilityResult.onHand}
//                 />

//                 <AvailabilityRow
//                   label="Reserved"
//                   value={availabilityResult.reserved}
//                 />

//                 <div className="border-t pt-3">
//                   <AvailabilityRow
//                     label="Available"
//                     value={availableQuantity}
//                     emphasized
//                   />
//                 </div>

//                 <AvailabilityRow
//                   label="Requested"
//                   value={requestedQuantity}
//                 />

//                 {hasEnoughStock && (
//                   <Button className="w-full">
//                     <Plus className="mr-2 size-4" />
//                     Create reservation
//                   </Button>
//                 )}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }


// "use client"

// import { useMemo, useState } from "react"
// import {
//   CalendarDays,
//   CheckCircle2,
//   Clock3,
//   Eye,
//   LayoutList,
//   MoreHorizontal,
//   Package,
//   Pencil,
//   Plus,
//   Search,
//   Trash2,
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

// interface ProductVariant {
//   id: string
//   product: string
//   variant: string
//   onHand: number
// }

// interface Reservation {
//   id: string
//   product: string
//   variantId: string
//   variant: string
//   customer: string
//   quantity: number
//   startDate: string
//   endDate: string
//   status: ReservationStatus
// }

// const productVariants: ProductVariant[] = [
//   {
//     id: "variant-1",
//     product: "Canon EOS R5",
//     variant: "Body Only",
//     onHand: 10,
//   },
//   {
//     id: "variant-2",
//     product: "Canon EOS R5",
//     variant: "24-105mm Kit",
//     onHand: 6,
//   },
//   {
//     id: "variant-3",
//     product: "Sony A7 IV",
//     variant: "Body Only",
//     onHand: 8,
//   },
//   {
//     id: "variant-4",
//     product: "Nikon Z6 II",
//     variant: "24-70mm Kit",
//     onHand: 5,
//   },
// ]

// const reservations: Reservation[] = [
//   {
//     id: "RES-001",
//     product: "Canon EOS R5",
//     variantId: "variant-1",
//     variant: "Body Only",
//     customer: "ABC Ltd",
//     quantity: 2,
//     startDate: "2026-08-25",
//     endDate: "2026-08-28",
//     status: "active",
//   },
//   {
//     id: "RES-002",
//     product: "Canon EOS R5",
//     variantId: "variant-1",
//     variant: "Body Only",
//     customer: "Patel Enterprises",
//     quantity: 4,
//     startDate: "2026-08-26",
//     endDate: "2026-08-30",
//     status: "confirmed",
//   },
//   {
//     id: "RES-003",
//     product: "Sony A7 IV",
//     variantId: "variant-3",
//     variant: "Body Only",
//     customer: "Global Events",
//     quantity: 3,
//     startDate: "2026-08-27",
//     endDate: "2026-08-29",
//     status: "pending",
//   },
//   {
//     id: "RES-004",
//     product: "Nikon Z6 II",
//     variantId: "variant-4",
//     variant: "24-70mm Kit",
//     customer: "Creative Studio",
//     quantity: 2,
//     startDate: "2026-09-01",
//     endDate: "2026-09-04",
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

// const dateFormatter = new Intl.DateTimeFormat("en-IN", {
//   day: "2-digit",
//   month: "short",
//   year: "numeric",
// })

// function formatDate(value: string) {
//   return dateFormatter.format(new Date(`${value}T00:00:00`))
// }

// function formatStatus(status: ReservationStatus) {
//   return status.charAt(0).toUpperCase() + status.slice(1)
// }

// function datesOverlap(
//   firstStart: string,
//   firstEnd: string,
//   secondStart: string,
//   secondEnd: string
// ) {
//   return firstStart <= secondEnd && firstEnd >= secondStart
// }

// export default function ReservationsPage() {
//   const [search, setSearch] = useState("")
//   const [status, setStatus] = useState<
//     "all" | ReservationStatus
//   >("all")

//   const [selectedVariantId, setSelectedVariantId] = useState("")
//   const [startDate, setStartDate] = useState("")
//   const [endDate, setEndDate] = useState("")
//   const [quantity, setQuantity] = useState(1)
//   const [availabilityChecked, setAvailabilityChecked] =
//     useState(false)

//   const filteredReservations = useMemo(() => {
//     const query = search.trim().toLowerCase()

//     return reservations.filter((reservation) => {
//       const matchesSearch =
//         reservation.id.toLowerCase().includes(query) ||
//         reservation.product.toLowerCase().includes(query) ||
//         reservation.variant.toLowerCase().includes(query) ||
//         reservation.customer.toLowerCase().includes(query)

//       const matchesStatus =
//         status === "all" || reservation.status === status

//       return matchesSearch && matchesStatus
//     })
//   }, [search, status])

//   const availability = useMemo(() => {
//     const selectedVariant = productVariants.find(
//       (variant) => variant.id === selectedVariantId
//     )

//     if (!selectedVariant || !startDate || !endDate) {
//       return null
//     }

//     const reserved = reservations
//       .filter(
//         (reservation) =>
//           reservation.variantId === selectedVariantId &&
//           reservation.status !== "cancelled" &&
//           datesOverlap(
//             startDate,
//             endDate,
//             reservation.startDate,
//             reservation.endDate
//           )
//       )
//       .reduce(
//         (total, reservation) => total + reservation.quantity,
//         0
//       )

//     return {
//       onHand: selectedVariant.onHand,
//       reserved,
//       available: Math.max(selectedVariant.onHand - reserved, 0),
//     }
//   }, [selectedVariantId, startDate, endDate])

//   const isDateRangeInvalid =
//     Boolean(startDate && endDate) && endDate < startDate

//   const requestedQuantityAvailable =
//     availability !== null &&
//     !isDateRangeInvalid &&
//     quantity > 0 &&
//     quantity <= availability.available

//   function checkAvailability() {
//     setAvailabilityChecked(true)
//   }

//   function updateVariant(value: string) {
//     setSelectedVariantId(value)
//     setAvailabilityChecked(false)
//   }

//   function updateStartDate(value: string) {
//     setStartDate(value)
//     setAvailabilityChecked(false)
//   }

//   function updateEndDate(value: string) {
//     setEndDate(value)
//     setAvailabilityChecked(false)
//   }

//   return (
//     <div className="space-y-6 p-4 md:p-6">
//       <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//         <div>
//           <h1 className="text-2xl font-bold tracking-tight">
//             Reservations
//           </h1>
//           <p className="text-muted-foreground">
//             Track product reservations and prevent inventory conflicts.
//           </p>
//         </div>

//         <Button>
//           <Plus className="mr-2 size-4" />
//           New reservation
//         </Button>
//       </div>

//       <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
//         <Tabs defaultValue="list" className="min-w-0">
//           <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row">
//             <TabsList>
//               <TabsTrigger value="list">
//                 <LayoutList className="mr-2 size-4" />
//                 List
//               </TabsTrigger>

//               <TabsTrigger value="calendar">
//                 <CalendarDays className="mr-2 size-4" />
//                 Calendar
//               </TabsTrigger>
//             </TabsList>
//           </div>

//           <TabsContent value="list" className="mt-0">
//             <ReservationList
//               reservations={filteredReservations}
//               search={search}
//               status={status}
//               onSearchChange={setSearch}
//               onStatusChange={setStatus}
//             />
//           </TabsContent>

//           <TabsContent value="calendar" className="mt-0">
//             <ReservationCalendar reservations={reservations} />
//           </TabsContent>
//         </Tabs>

//         <Card className="h-fit">
//           <CardHeader>
//             <CardTitle>Check availability</CardTitle>
//             <CardDescription>
//               Check stock availability for a selected period.
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="space-y-5">
//             <div className="space-y-2">
//               <Label>Product variant</Label>

//               <Select
//                 value={selectedVariantId}
//                 onValueChange={updateVariant}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a variant" />
//                 </SelectTrigger>

//                 <SelectContent>
//                   {productVariants.map((variant) => (
//                     <SelectItem key={variant.id} value={variant.id}>
//                       {variant.product} — {variant.variant}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
//               <div className="space-y-2">
//                 <Label htmlFor="start-date">Start date</Label>
//                 <Input
//                   id="start-date"
//                   type="date"
//                   value={startDate}
//                   onChange={(event) =>
//                     updateStartDate(event.target.value)
//                   }
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="end-date">End date</Label>
//                 <Input
//                   id="end-date"
//                   type="date"
//                   min={startDate || undefined}
//                   value={endDate}
//                   onChange={(event) =>
//                     updateEndDate(event.target.value)
//                   }
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="quantity">Quantity</Label>
//               <Input
//                 id="quantity"
//                 type="number"
//                 min={1}
//                 value={quantity}
//                 onChange={(event) => {
//                   setQuantity(Number(event.target.value))
//                   setAvailabilityChecked(false)
//                 }}
//               />
//             </div>

//             {isDateRangeInvalid && (
//               <p className="text-destructive text-sm">
//                 End date must be on or after the start date.
//               </p>
//             )}

//             <Button
//               className="w-full"
//               onClick={checkAvailability}
//               disabled={
//                 !selectedVariantId ||
//                 !startDate ||
//                 !endDate ||
//                 quantity < 1 ||
//                 isDateRangeInvalid
//               }
//             >
//               <Search className="mr-2 size-4" />
//               Check availability
//             </Button>

//             {availabilityChecked && availability && (
//               <AvailabilityResult
//                 onHand={availability.onHand}
//                 reserved={availability.reserved}
//                 available={availability.available}
//                 requestedQuantity={quantity}
//                 canReserve={requestedQuantityAvailable}
//               />
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// function ReservationList({
//   reservations,
//   search,
//   status,
//   onSearchChange,
//   onStatusChange,
// }: {
//   reservations: Reservation[]
//   search: string
//   status: "all" | ReservationStatus
//   onSearchChange: (value: string) => void
//   onStatusChange: (value: "all" | ReservationStatus) => void
// }) {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>All reservations</CardTitle>
//         <CardDescription>
//           View reserved products, quantities and rental periods.
//         </CardDescription>
//       </CardHeader>

//       <CardContent className="space-y-4">
//         <div className="flex flex-col gap-3 sm:flex-row">
//           <div className="relative flex-1">
//             <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />

//             <Input
//               value={search}
//               onChange={(event) =>
//                 onSearchChange(event.target.value)
//               }
//               placeholder="Search reservations..."
//               className="pl-9"
//             />
//           </div>

//           <Select
//             value={status}
//             onValueChange={(value) =>
//               onStatusChange(value as "all" | ReservationStatus)
//             }
//           >
//             <SelectTrigger className="w-full sm:w-44">
//               <SelectValue placeholder="Status" />
//             </SelectTrigger>

//             <SelectContent>
//               <SelectItem value="all">All statuses</SelectItem>
//               <SelectItem value="pending">Pending</SelectItem>
//               <SelectItem value="confirmed">Confirmed</SelectItem>
//               <SelectItem value="active">Active</SelectItem>
//               <SelectItem value="completed">Completed</SelectItem>
//               <SelectItem value="cancelled">Cancelled</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="overflow-hidden rounded-md border">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Reservation</TableHead>
//                 <TableHead>Product/variant</TableHead>
//                 <TableHead>Customer</TableHead>
//                 <TableHead>Quantity</TableHead>
//                 <TableHead>Start</TableHead>
//                 <TableHead>End</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead className="w-12" />
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               {reservations.length > 0 ? (
//                 reservations.map((reservation) => (
//                   <TableRow key={reservation.id}>
//                     <TableCell className="font-medium">
//                       {reservation.id}
//                     </TableCell>

//                     <TableCell>
//                       <p className="font-medium">
//                         {reservation.product}
//                       </p>
//                       <p className="text-muted-foreground text-xs">
//                         {reservation.variant}
//                       </p>
//                     </TableCell>

//                     <TableCell>{reservation.customer}</TableCell>

//                     <TableCell>{reservation.quantity}</TableCell>

//                     <TableCell className="whitespace-nowrap">
//                       {formatDate(reservation.startDate)}
//                     </TableCell>

//                     <TableCell className="whitespace-nowrap">
//                       {formatDate(reservation.endDate)}
//                     </TableCell>

//                     <TableCell>
//                       <Badge
//                         variant="outline"
//                         className={
//                           statusStyles[reservation.status]
//                         }
//                       >
//                         {formatStatus(reservation.status)}
//                       </Badge>
//                     </TableCell>

//                     <TableCell>
//                       <ReservationActions
//                         reservation={reservation}
//                       />
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={8}
//                     className="h-40 text-center"
//                   >
//                     <Package className="text-muted-foreground mx-auto mb-3 size-9" />
//                     <p className="font-medium">
//                       No reservations found
//                     </p>
//                     <p className="text-muted-foreground text-sm">
//                       Change the filters or create a reservation.
//                     </p>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// function ReservationCalendar({
//   reservations,
// }: {
//   reservations: Reservation[]
// }) {
//   const groupedReservations = Object.entries(
//     reservations.reduce<Record<string, Reservation[]>>(
//       (groups, reservation) => {
//         const key = reservation.startDate
//         groups[key] ??= []
//         groups[key].push(reservation)
//         return groups
//       },
//       {}
//     )
//   ).sort(([firstDate], [secondDate]) =>
//     firstDate.localeCompare(secondDate)
//   )

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Reservation calendar</CardTitle>
//         <CardDescription>
//           Reservations grouped by their starting date.
//         </CardDescription>
//       </CardHeader>

//       <CardContent>
//         <div className="space-y-5">
//           {groupedReservations.map(([date, items]) => (
//             <div
//               key={date}
//               className="grid gap-3 border-l-2 pl-4 sm:grid-cols-[140px_1fr]"
//             >
//               <div>
//                 <p className="font-medium">{formatDate(date)}</p>
//                 <p className="text-muted-foreground text-xs">
//                   {items.length} reservation
//                   {items.length !== 1 ? "s" : ""}
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 {items.map((reservation) => (
//                   <div
//                     key={reservation.id}
//                     className="flex flex-col justify-between gap-3 rounded-lg border p-3 sm:flex-row sm:items-center"
//                   >
//                     <div>
//                       <p className="text-sm font-medium">
//                         {reservation.product} —{" "}
//                         {reservation.variant}
//                       </p>

//                       <p className="text-muted-foreground text-xs">
//                         {reservation.customer} · Qty{" "}
//                         {reservation.quantity} · Until{" "}
//                         {formatDate(reservation.endDate)}
//                       </p>
//                     </div>

//                     <Badge
//                       variant="outline"
//                       className={`w-fit ${
//                         statusStyles[reservation.status]
//                       }`}
//                     >
//                       {formatStatus(reservation.status)}
//                     </Badge>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// function AvailabilityResult({
//   onHand,
//   reserved,
//   available,
//   requestedQuantity,
//   canReserve,
// }: {
//   onHand: number
//   reserved: number
//   available: number
//   requestedQuantity: number
//   canReserve: boolean
// }) {
//   return (
//     <div className="space-y-4 rounded-lg border p-4">
//       <div className="flex items-center gap-2">
//         {canReserve ? (
//           <>
//             <CheckCircle2 className="size-5 text-green-600" />
//             <p className="font-medium text-green-700">
//               Quantity available
//             </p>
//           </>
//         ) : (
//           <>
//             <XCircle className="text-destructive size-5" />
//             <p className="text-destructive font-medium">
//               Insufficient availability
//             </p>
//           </>
//         )}
//       </div>

//       <div className="space-y-2 text-sm">
//         <StockRow label="On hand" value={onHand} />
//         <StockRow label="Reserved" value={reserved} />
//         <div className="border-t pt-2">
//           <StockRow
//             label="Available"
//             value={available}
//             emphasized
//           />
//         </div>
//         <StockRow
//           label="Requested"
//           value={requestedQuantity}
//         />
//       </div>

//       {canReserve && (
//         <Button className="w-full">
//           <Plus className="mr-2 size-4" />
//           Create reservation
//         </Button>
//       )}
//     </div>
//   )
// }

// function StockRow({
//   label,
//   value,
//   emphasized = false,
// }: {
//   label: string
//   value: number
//   emphasized?: boolean
// }) {
//   return (
//     <div
//       className={`flex justify-between ${
//         emphasized ? "font-semibold" : ""
//       }`}
//     >
//       <span className="text-muted-foreground">{label}</span>
//       <span>{value}</span>
//     </div>
//   )
// }

// function ReservationActions({
//   reservation,
// }: {
//   reservation: Reservation
// }) {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger>
//         <Button variant="ghost" size="icon">
//           <MoreHorizontal className="size-4" />
//           <span className="sr-only">
//             Actions for {reservation.id}
//           </span>
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent align="end">
//         <DropdownMenuLabel>{reservation.id}</DropdownMenuLabel>
//         <DropdownMenuSeparator />

//         <DropdownMenuItem>
//           <Eye className="mr-2 size-4" />
//           View details
//         </DropdownMenuItem>

//         <DropdownMenuItem>
//           <Pencil className="mr-2 size-4" />
//           Edit reservation
//         </DropdownMenuItem>

//         {reservation.status === "pending" && (
//           <DropdownMenuItem>
//             <CheckCircle2 className="mr-2 size-4" />
//             Confirm reservation
//           </DropdownMenuItem>
//         )}

//         <DropdownMenuSeparator />

//         <DropdownMenuItem className="text-destructive">
//           <Trash2 className="mr-2 size-4" />
//           Cancel reservation
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }
// import React from 'react'

// export default function TaxesPage() {
//   return (
//     <div>TaxesPage


//       {/* Taxes

//                          [+ Tax]

// Name       Rate       Status
// GST 18%    18%        Active
// GST 12%    12%        Active */}
//     </div>
//   )
// }

"use client"

import { useMemo, useState } from "react"
import {
  Calculator,
  CheckCircle2,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

type TaxStatus = "active" | "inactive"

type Tax = {
  id: string
  name: string
  rate: number
  status: TaxStatus
  createdAt: string
}

type TaxForm = {
  name: string
  rate: string
  status: TaxStatus
}

const initialTaxes: Tax[] = [
  {
    id: "tax-1",
    name: "GST 18%",
    rate: 18,
    status: "active",
    createdAt: "Aug 20, 2026",
  },
  {
    id: "tax-2",
    name: "GST 12%",
    rate: 12,
    status: "active",
    createdAt: "Aug 18, 2026",
  },
  {
    id: "tax-3",
    name: "GST 5%",
    rate: 5,
    status: "active",
    createdAt: "Aug 15, 2026",
  },
  {
    id: "tax-4",
    name: "Legacy VAT",
    rate: 4,
    status: "inactive",
    createdAt: "Aug 10, 2026",
  },
]

const emptyForm: TaxForm = {
  name: "",
  rate: "",
  status: "active",
}

export default function TaxesPage() {
  const [taxes, setTaxes] = useState<Tax[]>(initialTaxes)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<
    "all" | TaxStatus
  >("all")

  const [form, setForm] = useState<TaxForm>(emptyForm)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTax, setEditingTax] = useState<Tax | null>(null)
  const [taxToDelete, setTaxToDelete] = useState<Tax | null>(null)

  const filteredTaxes = useMemo(() => {
    const query = search.trim().toLowerCase()

    return taxes.filter((tax) => {
      const matchesSearch = tax.name.toLowerCase().includes(query)
      const matchesStatus =
        statusFilter === "all" || tax.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [taxes, search, statusFilter])

  const activeTaxes = taxes.filter(
    (tax) => tax.status === "active"
  ).length

  const averageRate =
    taxes.length > 0
      ? taxes.reduce((total, tax) => total + tax.rate, 0) /
        taxes.length
      : 0

  function openCreateDialog() {
    setEditingTax(null)
    setForm(emptyForm)
    setIsFormOpen(true)
  }

  function openEditDialog(tax: Tax) {
    setEditingTax(tax)
    setForm({
      name: tax.name,
      rate: tax.rate.toString(),
      status: tax.status,
    })
    setIsFormOpen(true)
  }

  function closeFormDialog() {
    setIsFormOpen(false)
    setEditingTax(null)
    setForm(emptyForm)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const name = form.name.trim()
    const rate = Number(form.rate)

    if (!name || Number.isNaN(rate) || rate < 0 || rate > 100) {
      return
    }

    if (editingTax) {
      setTaxes((currentTaxes) =>
        currentTaxes.map((tax) =>
          tax.id === editingTax.id
            ? {
                ...tax,
                name,
                rate,
                status: form.status,
              }
            : tax
        )
      )
    } else {
      setTaxes((currentTaxes) => [
        {
          id: crypto.randomUUID(),
          name,
          rate,
          status: form.status,
          createdAt: new Intl.DateTimeFormat("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }).format(new Date()),
        },
        ...currentTaxes,
      ])
    }

    closeFormDialog()
  }

  function handleDelete() {
    if (!taxToDelete) return

    setTaxes((currentTaxes) =>
      currentTaxes.filter((tax) => tax.id !== taxToDelete.id)
    )

    setTaxToDelete(null)
  }

  function toggleStatus(tax: Tax) {
    setTaxes((currentTaxes) =>
      currentTaxes.map((currentTax) =>
        currentTax.id === tax.id
          ? {
              ...currentTax,
              status:
                currentTax.status === "active"
                  ? "inactive"
                  : "active",
            }
          : currentTax
      )
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Taxes
          </h1>
          <p className="text-muted-foreground">
            Configure tax rates used in quotations, rentals and invoices.
          </p>
        </div>

        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 size-4" />
          Add tax
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          title="Total taxes"
          value={taxes.length.toString()}
          description="Configured tax rates"
          icon={Calculator}
        />

        <SummaryCard
          title="Active taxes"
          value={activeTaxes.toString()}
          description="Available for transactions"
          icon={CheckCircle2}
        />

        <SummaryCard
          title="Average rate"
          value={`${averageRate.toFixed(1)}%`}
          description="Across all configured taxes"
          icon={Calculator}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tax rates</CardTitle>
          <CardDescription>
            Manage tax names, percentages and availability.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />

              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search taxes..."
                className="pl-9"
              />
            </div>

            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value as "all" | TaxStatus)
              }
            >
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredTaxes.length > 0 ? (
                  filteredTaxes.map((tax) => (
                    <TableRow key={tax.id}>
                      <TableCell className="font-medium">
                        {tax.name}
                      </TableCell>

                      <TableCell>
                        <span className="font-semibold tabular-nums">
                          {tax.rate}%
                        </span>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            tax.status === "active"
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-slate-200 bg-slate-50 text-slate-600"
                          }
                        >
                          {tax.status === "active"
                            ? "Active"
                            : "Inactive"}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-muted-foreground">
                        {tax.createdAt}
                      </TableCell>

                      <TableCell>
                        <TaxActions
                          tax={tax}
                          onEdit={openEditDialog}
                          onToggleStatus={toggleStatus}
                          onDelete={setTaxToDelete}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-40 text-center"
                    >
                      <Calculator className="text-muted-foreground mx-auto mb-3 size-9" />
                      <p className="font-medium">No taxes found</p>
                      <p className="text-muted-foreground text-sm">
                        Change your filters or add a tax rate.
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <TaxFormDialog
        open={isFormOpen}
        form={form}
        editingTax={editingTax}
        onFormChange={setForm}
        onClose={closeFormDialog}
        onSubmit={handleSubmit}
      />

      <DeleteTaxDialog
        tax={taxToDelete}
        onClose={() => setTaxToDelete(null)}
        onConfirm={handleDelete}
      />
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
        <div>
          <p className="text-muted-foreground text-sm">{title}</p>
          <p className="mt-1 text-2xl font-bold tabular-nums">
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

function TaxActions({
  tax,
  onEdit,
  onToggleStatus,
  onDelete,
}: {
  tax: Tax
  onEdit: (tax: Tax) => void
  onToggleStatus: (tax: Tax) => void
  onDelete: (tax: Tax) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger >
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="size-4" />
          <span className="sr-only">
            Actions for {tax.name}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{tax.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onEdit(tax)}>
          <Pencil className="mr-2 size-4" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onToggleStatus(tax)}>
          <CheckCircle2 className="mr-2 size-4" />
          Mark as {tax.status === "active" ? "inactive" : "active"}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-destructive"
          onClick={() => onDelete(tax)}
        >
          <Trash2 className="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function TaxFormDialog({
  open,
  form,
  editingTax,
  onFormChange,
  onClose,
  onSubmit,
}: {
  open: boolean
  form: TaxForm
  editingTax: Tax | null
  onFormChange: (form: TaxForm) => void
  onClose: () => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  const numericRate = Number(form.rate)
  const rateIsInvalid =
    form.rate !== "" &&
    (Number.isNaN(numericRate) ||
      numericRate < 0 ||
      numericRate > 100)

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingTax ? "Edit tax" : "Create tax"}
          </DialogTitle>

          <DialogDescription>
            {editingTax
              ? "Update the selected tax rate."
              : "Add a tax rate for quotations, rentals and invoices."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tax-name">Tax name</Label>
            <Input
              id="tax-name"
              value={form.name}
              onChange={(event) =>
                onFormChange({
                  ...form,
                  name: event.target.value,
                })
              }
              placeholder="For example, GST 18%"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tax-rate">Rate (%)</Label>
            <Input
              id="tax-rate"
              type="number"
              min={0}
              max={100}
              step="0.01"
              value={form.rate}
              onChange={(event) =>
                onFormChange({
                  ...form,
                  rate: event.target.value,
                })
              }
              placeholder="18"
            />

            {rateIsInvalid && (
              <p className="text-destructive text-sm">
                Tax rate must be between 0 and 100.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Status</Label>

            <Select
              value={form.status}
              onValueChange={(value) =>
                onFormChange({
                  ...form,
                  status: value as TaxStatus,
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                !form.name.trim() ||
                !form.rate ||
                rateIsInvalid
              }
            >
              {editingTax ? "Save changes" : "Create tax"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function DeleteTaxDialog({
  tax,
  onClose,
  onConfirm,
}: {
  tax: Tax | null
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <AlertDialog
      open={tax !== null}
      onOpenChange={(open) => !open && onClose()}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {tax?.name}?</AlertDialogTitle>

          <AlertDialogDescription>
            This tax will no longer be available for new transactions.
            Existing quotations and invoices should keep their stored tax
            amounts.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete tax
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
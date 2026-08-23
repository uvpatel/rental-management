// import React from 'react'

// export default function RentalPage() {
//   return (
//     <div>RentalPage

//       {/* Rental Settings

// Default Rental Unit
// [Day ▼]

// Security Deposit
// [20] %

// Late Fee
// ₹ [500] / Day

// Grace Period
// [60] minutes

// Return Reminder
// [24] hours before

// ☑ Allow Partial Payments
// ☑ Require Deposit

// [Save] */}
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import {
  BellRing,
  Clock3,
  IndianRupee,
  Save,
  ShieldCheck,
  WalletCards,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function RentalPage() {
  const [saving, setSaving] = useState(false)
  const [allowPartialPayments, setAllowPartialPayments] = useState(true)
  const [requireDeposit, setRequireDeposit] = useState(true)

  const handleSave = async () => {
    try {
      setSaving(true)

      // TODO: Connect with API
      //
      // await fetch("/api/v1/settings/rental", {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     defaultRentalUnit,
      //     securityDeposit,
      //     lateFee,
      //     gracePeriod,
      //     returnReminder,
      //     allowPartialPayments,
      //     requireDeposit,
      //   }),
      // })

      await new Promise((resolve) => setTimeout(resolve, 700))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Rental Settings
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Configure your default rental rules, deposits, fees, and payment
            policies.
          </p>
        </div>

        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 size-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Separator />

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        {/* Main Settings */}
        <div className="space-y-6">
          {/* Rental Defaults */}
          <Card>
            <CardHeader>
              <CardTitle>Rental Defaults</CardTitle>

              <CardDescription>
                Configure the default rules applied when creating a new rental.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Rental Unit */}
              <div className="grid gap-3 sm:grid-cols-[1fr_220px] sm:items-center">
                <div>
                  <Label>Default Rental Unit</Label>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Default billing period for rental products.
                  </p>
                </div>

                <Select defaultValue="day">
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="hour">Hour</SelectItem>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Grace Period */}
              <div className="grid gap-3 sm:grid-cols-[1fr_220px] sm:items-center">
                <div>
                  <Label htmlFor="gracePeriod">Grace Period</Label>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Extra time allowed before a return is considered late.
                  </p>
                </div>

                <div className="relative">
                  <Clock3 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="gracePeriod"
                    type="number"
                    min={0}
                    defaultValue={60}
                    className="pl-9 pr-20"
                  />

                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    minutes
                  </span>
                </div>
              </div>

              <Separator />

              {/* Reminder */}
              <div className="grid gap-3 sm:grid-cols-[1fr_220px] sm:items-center">
                <div>
                  <Label htmlFor="returnReminder">Return Reminder</Label>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Notify customers before their rental is due.
                  </p>
                </div>

                <div className="relative">
                  <BellRing className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="returnReminder"
                    type="number"
                    min={0}
                    defaultValue={24}
                    className="pl-9 pr-24"
                  />

                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    hours
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deposit */}
          <Card>
            <CardHeader>
              <CardTitle>Security Deposit</CardTitle>

              <CardDescription>
                Configure the default security deposit required for rentals.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-3 sm:grid-cols-[1fr_220px] sm:items-center">
                <div>
                  <Label htmlFor="securityDeposit">
                    Security Deposit
                  </Label>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Percentage of the rental amount collected as a deposit.
                  </p>
                </div>

                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="securityDeposit"
                    type="number"
                    min={0}
                    max={100}
                    defaultValue={20}
                    className="pl-9 pr-10"
                  />

                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    %
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between gap-6">
                <div>
                  <Label htmlFor="requireDeposit">
                    Require Security Deposit
                  </Label>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Require customers to pay a deposit before confirming a
                    rental.
                  </p>
                </div>

                <Switch
                  id="requireDeposit"
                  checked={requireDeposit}
                  onCheckedChange={setRequireDeposit}
                />
              </div>
            </CardContent>
          </Card>

          {/* Late Fees */}
          <Card>
            <CardHeader>
              <CardTitle>Late Return Fees</CardTitle>

              <CardDescription>
                Define charges applied when rental items are returned late.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid gap-3 sm:grid-cols-[1fr_220px] sm:items-center">
                <div>
                  <Label htmlFor="lateFee">Late Fee</Label>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Amount charged for each day after the grace period.
                  </p>
                </div>

                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="lateFee"
                    type="number"
                    min={0}
                    defaultValue={500}
                    className="pl-9 pr-16"
                  />

                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    / day
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Policies */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Policies</CardTitle>

              <CardDescription>
                Configure how customers can pay for their rentals.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2">
                    <WalletCards className="size-4 text-muted-foreground" />

                    <Label htmlFor="partialPayments">
                      Allow Partial Payments
                    </Label>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Allow customers to pay part of the rental amount and
                    complete the remaining balance later.
                  </p>
                </div>

                <Switch
                  id="partialPayments"
                  checked={allowPartialPayments}
                  onCheckedChange={setAllowPartialPayments}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Current Rental Policy
              </CardTitle>

              <CardDescription>
                Summary of your active rental configuration.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Rental unit
                </span>
                <span className="font-medium">Day</span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Deposit
                </span>
                <span className="font-medium">
                  {requireDeposit ? "20%" : "Disabled"}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Late fee
                </span>
                <span className="font-medium">₹500/day</span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Grace period
                </span>
                <span className="font-medium">60 min</span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Reminder
                </span>
                <span className="font-medium">24h before</span>
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Partial payments
                </span>

                <span className="font-medium">
                  {allowPartialPayments ? "Allowed" : "Disabled"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                How these settings work
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                These values act as defaults when new quotations,
                reservations, and rental orders are created. You can still
                override applicable values on individual rentals.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Save */}
      <div className="flex justify-end border-t pt-6">
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 size-4" />
          {saving ? "Saving..." : "Save Rental Settings"}
        </Button>
      </div>
    </div>
  )
}
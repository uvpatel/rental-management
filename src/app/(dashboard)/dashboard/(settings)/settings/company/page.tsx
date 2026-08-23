// import React from 'react'

// export default function CompanyPage() {
//   return (
//     <div>CompanyPage


//       {/* Company Settings

// Company Name
// GSTIN
// PAN
// Email
// Phone
// Logo

// Billing Address
// Warehouse Address

// [Save Changes] */}
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import {
  Building2,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Save,
  Upload,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function CompanySettingsPage() {
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    try {
      setSaving(true)

      // TODO:
      // await fetch("/api/v1/settings/company", {
      //   method: "PUT",
      //   body: JSON.stringify(...)
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
          <div className="flex items-center gap-2">
            <Building2 className="size-5 text-muted-foreground" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Company
            </h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your rental company's business information and preferences.
          </p>
        </div>

        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 size-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Separator />

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        {/* Main */}
        <div className="space-y-6">
          {/* Business Information */}
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Basic information used across reservations, invoices, and
                customer documents.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company name</Label>
                  <Input
                    id="companyName"
                    defaultValue="RentFlow Rentals"
                    placeholder="Company name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="legalName">Legal business name</Label>
                  <Input
                    id="legalName"
                    defaultValue="RentFlow Rentals Pvt. Ltd."
                    placeholder="Legal business name"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="gstin">GSTIN</Label>
                  <Input
                    id="gstin"
                    placeholder="24ABCDE1234F1Z5"
                  />
                  <p className="text-xs text-muted-foreground">
                    GST identification number used for tax invoices.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>

                  <div className="relative">
                    <Globe2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="website"
                      className="pl-9"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Business description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  placeholder="Tell customers about your rental business..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Contact details shown on invoices, reservations, and customer
                communication.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Business email</Label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-9"
                      defaultValue="hello@rentflow.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      className="pl-9"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle>Business Address</CardTitle>
              <CardDescription>
                Primary address for your rental business.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="address">Street address</Label>

                <div className="relative">
                  <MapPin className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="address"
                    className="pl-9"
                    placeholder="Street, building, area"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Vadodara" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="Gujarat" />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal code</Label>
                  <Input id="postalCode" placeholder="390001" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>

                  <Select defaultValue="india">
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Regional Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Regional Settings</CardTitle>
              <CardDescription>
                Configure currency, timezone, and business formatting.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid gap-5 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Currency</Label>

                  <Select defaultValue="inr">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="inr">INR (₹)</SelectItem>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Timezone</Label>

                  <Select defaultValue="asia-kolkata">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="asia-kolkata">
                        Asia/Kolkata
                      </SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="america-new-york">
                        America/New_York
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date format</Label>

                  <Select defaultValue="dd-mm-yyyy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="dd-mm-yyyy">
                        DD/MM/YYYY
                      </SelectItem>
                      <SelectItem value="mm-dd-yyyy">
                        MM/DD/YYYY
                      </SelectItem>
                      <SelectItem value="yyyy-mm-dd">
                        YYYY-MM-DD
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Logo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Company Logo</CardTitle>
              <CardDescription>
                Used on invoices and customer documents.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed bg-muted/30">
                <div className="text-center">
                  <Building2 className="mx-auto mb-2 size-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    No logo uploaded
                  </p>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Upload className="mr-2 size-4" />
                Upload Logo
              </Button>

              <p className="text-xs text-muted-foreground">
                PNG, JPG or SVG. Recommended size 512 × 512.
              </p>
            </CardContent>
          </Card>

          {/* Company Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Company Profile</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium">Active</span>
              </div>

              <Separator />

              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Currency</span>
                <span className="font-medium">INR</span>
              </div>

              <Separator />

              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Timezone</span>
                <span className="font-medium">Asia/Kolkata</span>
              </div>

              <Separator />

              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Tax system</span>
                <span className="font-medium">GST</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
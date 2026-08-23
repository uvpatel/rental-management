"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  AudioLinesIcon,
  CalendarRangeIcon,
  ChartNoAxesCombinedIcon,
  GalleryVerticalEndIcon,
  LayoutDashboardIcon,
  PackageIcon,
  ReceiptTextIcon,
  Settings2Icon,
  TerminalIcon,
  UsersIcon,
  WarehouseIcon,
} from "lucide-react"
// This is sample data.
const data = {
  teams: [
    {
      name: "RentalFlow Inc",
      logo: (
        <GalleryVerticalEndIcon />
      ),
      plan: "Enterprise",
    },
    {
      name: "Rental Corp.",
      logo: (
        <AudioLinesIcon />
      ),
      plan: "Business",
    },
    {
      name: "QuickRent Ltd.",
      logo: (
        <TerminalIcon />
      ),
      plan: "Startup",
    },
  ],

  navMain: [
    {
      title: "Rentals",
      url: "#",
      icon: (
        <CalendarRangeIcon />
      ),
      isActive: true,
      items: [
        {
          title: "Quotations",
          url: "/dashboard/quotations",
        },
        {
          title: "Rental Orders",
          url: "/dashboard/rentals",
        },
        {
          title: "Reservations",
          url: "/dashboard/reservations",
        },
      ],
    },

    {
      title: "Catalog",
      url: "#",
      icon: (
        <PackageIcon />
      ),
      items: [
        {
          title: "Products",
          url: "/dashboard/products",
        },
        {
          title: "Product Attributes",
          url: "/dashboard/attributes",
        },
        {
          title: "Rental Pricing",
          url: "/dashboard/rental-rates",
        },
      ],
    },

    {
      title: "Inventory",
      url: "#",
      icon: (
        <WarehouseIcon />
      ),
      items: [
        {
          title: "Inventory",
          url: "/dashboard/inventory",
        },
        {
          title: "Pickups",
          url: "/dashboard/pickups",
        },
        {
          title: "Returns",
          url: "/dashboard/returns",
        },
        {
          title: "Stock Movements",
          url: "/dashboard/stock-movements",
        },
      ],
    },

    {
      title: "Finance",
      url: "#",
      icon: (
        <ReceiptTextIcon />
      ),
      items: [
        {
          title: "Invoices",
          url: "/dashboard/invoices",
        },
        {
          title: "Payments",
          url: "/dashboard/payments",
        },
        {
          title: "Security Deposits",
          url: "/dashboard/deposits",
        },
        {
          title: "Taxes",
          url: "/dashboard/taxes",
        },
      ],
    },

    {
      title: "Settings",
      url: "#",
      icon: (
        <Settings2Icon />
      ),
      items: [
        {
          title: "General",
          url: "/dashboard/settings",
        },
        {
          title: "Company",
          url: "/dashboard/settings/company",
        },
        {
          title: "Team & Roles",
          url: "/dashboard/settings/team",
        },
        {
          title: "Rental Settings",
          url: "/dashboard/settings/rental",
        },
      ],
    },
  ],

  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: (
        <LayoutDashboardIcon />
      ),
    },
    {
      name: "Customers",
      url: "/dashboard/customers",
      icon: (
        <UsersIcon />
      ),
    },
    {
      name: "Reports & Analytics",
      url: "/dashboard/reports",
      icon: (
        <ChartNoAxesCombinedIcon />
      ),
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

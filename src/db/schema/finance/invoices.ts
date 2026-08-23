import {
  pgTable,
  uuid,
  varchar,
  text,
  numeric,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { rentalOrders } from "../rental/rental-orders";
import { organizations } from "../organization/organizations";
import { invoiceStatusEnum } from "../shared/enums";
import { timestamps } from "../shared/columns";

export const invoices = pgTable(
  "invoices",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    invoiceNumber: varchar("invoice_number", {
      length: 50,
    })
      .notNull()
      .unique(),

    rentalOrderId: uuid("rental_order_id")
      .notNull()
      .references(() => rentalOrders.id),

    vendorId: uuid("vendor_id")
      .notNull()
      .references(() => organizations.id),

    customerId: uuid("customer_id")
      .notNull()
      .references(() => organizations.id),

    status: invoiceStatusEnum("status")
      .notNull()
      .default("DRAFT"),

    // Legal snapshot
    customerName: varchar("customer_name", {
      length: 255,
    }).notNull(),

    companyName: varchar("company_name", {
      length: 255,
    }),

    gstin: varchar("gstin", {
      length: 15,
    }),

    billingAddressSnapshot: text(
      "billing_address_snapshot",
    ).notNull(),

    subtotal: numeric("subtotal", {
      precision: 12,
      scale: 2,
    }).notNull(),

    discountAmount: numeric("discount_amount", {
      precision: 12,
      scale: 2,
    })
      .notNull()
      .default("0"),

    taxAmount: numeric("tax_amount", {
      precision: 12,
      scale: 2,
    })
      .notNull()
      .default("0"),

    totalAmount: numeric("total_amount", {
      precision: 12,
      scale: 2,
    }).notNull(),

    paidAmount: numeric("paid_amount", {
      precision: 12,
      scale: 2,
    })
      .notNull()
      .default("0"),

    balanceAmount: numeric("balance_amount", {
      precision: 12,
      scale: 2,
    }).notNull(),

    issuedAt: timestamp("issued_at", {
      withTimezone: true,
    }),

    dueAt: timestamp("due_at", {
      withTimezone: true,
    }),

    paidAt: timestamp("paid_at", {
      withTimezone: true,
    }),

    ...timestamps,
  },

  (table) => [
    index("invoices_order_idx")
      .on(table.rentalOrderId),

    index("invoices_vendor_idx")
      .on(table.vendorId),

    index("invoices_customer_idx")
      .on(table.customerId),

    index("invoices_status_idx")
      .on(table.status),
  ],
);
import {
  pgTable,
  uuid,
  varchar,
  numeric,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { invoices } from "./invoices";
import { rentalOrders } from "../rental/rental-orders";
import { organizations } from "../organization/organizations";

import {
  paymentMethodEnum,
  transactionStatusEnum,
} from "../shared/enums";

import { timestamps } from "../shared/columns";

export const payments = pgTable(
  "payments",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    invoiceId: uuid("invoice_id")
      .notNull()
      .references(() => invoices.id),

    rentalOrderId: uuid("rental_order_id")
      .notNull()
      .references(() => rentalOrders.id),

    customerId: uuid("customer_id")
      .notNull()
      .references(() => organizations.id),

    vendorId: uuid("vendor_id")
      .notNull()
      .references(() => organizations.id),

    amount: numeric("amount", {
      precision: 12,
      scale: 2,
    }).notNull(),

    method: paymentMethodEnum("method")
      .notNull(),

    provider: varchar("provider", {
      length: 100,
    }),

    providerPaymentId: varchar(
      "provider_payment_id",
      { length: 255 },
    ),

    providerOrderId: varchar(
      "provider_order_id",
      { length: 255 },
    ),

    status: transactionStatusEnum("status")
      .notNull()
      .default("PENDING"),

    paidAt: timestamp("paid_at", {
      withTimezone: true,
    }),

    ...timestamps,
  },

  (table) => [
    index("payments_invoice_idx")
      .on(table.invoiceId),

    index("payments_order_idx")
      .on(table.rentalOrderId),

    index("payments_vendor_idx")
      .on(table.vendorId),
  ],
);
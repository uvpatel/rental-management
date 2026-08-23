import {
  pgTable,
  uuid,
  varchar,
  numeric,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { organizations } from "../organization/organizations";
import { addresses } from "../organization/addresses";
import { quotationStatusEnum } from "../shared/enums";
import { timestamps } from "../shared/columns";

export const quotations = pgTable(
  "quotations",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    quotationNumber: varchar(
      "quotation_number",
      { length: 50 },
    )
      .notNull()
      .unique(),

    vendorId: uuid("vendor_id")
      .notNull()
      .references(() => organizations.id),

    customerId: uuid("customer_id")
      .notNull()
      .references(() => organizations.id),

    billingAddressId: uuid("billing_address_id")
      .references(() => addresses.id),

    shippingAddressId: uuid("shipping_address_id")
      .references(() => addresses.id),

    status: quotationStatusEnum("status")
      .notNull()
      .default("DRAFT"),

    validUntil: timestamp("valid_until", {
      withTimezone: true,
    }),

    subtotal: numeric("subtotal", {
      precision: 12,
      scale: 2,
    })
      .notNull()
      .default("0"),

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
    })
      .notNull()
      .default("0"),

    notes: text("notes"),

    sentAt: timestamp("sent_at", {
      withTimezone: true,
    }),

    acceptedAt: timestamp("accepted_at", {
      withTimezone: true,
    }),

    ...timestamps,
  },

  (table) => [
    index("quotations_vendor_idx")
      .on(table.vendorId),

    index("quotations_customer_idx")
      .on(table.customerId),

    index("quotations_status_idx")
      .on(table.status),
  ],
);
import {
  pgTable,
  uuid,
  varchar,
  numeric,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { quotations } from "./quotations";
import { organizations } from "../organization/organizations";
import { addresses } from "../organization/addresses";

import {
  rentalOrderStatusEnum,
  paymentStatusEnum,
  pickupStatusEnum,
  returnStatusEnum,
} from "../shared/enums";

import { timestamps } from "../shared/columns";

export const rentalOrders = pgTable(
  "rental_orders",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    orderNumber: varchar("order_number", {
      length: 50,
    })
      .notNull()
      .unique(),

    quotationId: uuid("quotation_id")
      .references(() => quotations.id),

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

    status: rentalOrderStatusEnum("status")
      .notNull()
      .default("DRAFT"),

    paymentStatus: paymentStatusEnum(
      "payment_status",
    )
      .notNull()
      .default("UNPAID"),

    pickupStatus: pickupStatusEnum(
      "pickup_status",
    )
      .notNull()
      .default("PENDING"),

    returnStatus: returnStatusEnum(
      "return_status",
    )
      .notNull()
      .default("PENDING"),

    rentalStart: timestamp("rental_start", {
      withTimezone: true,
    }).notNull(),

    rentalEnd: timestamp("rental_end", {
      withTimezone: true,
    }).notNull(),

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

    depositAmount: numeric("deposit_amount", {
      precision: 12,
      scale: 2,
    })
      .notNull()
      .default("0"),

    lateFeeAmount: numeric("late_fee_amount", {
      precision: 12,
      scale: 2,
    })
      .notNull()
      .default("0"),

    damageFeeAmount: numeric("damage_fee_amount", {
      precision: 12,
      scale: 2,
    })
      .notNull()
      .default("0"),

    totalAmount: numeric("total_amount", {
      precision: 12,
      scale: 2,
    }).notNull(),

    confirmedAt: timestamp("confirmed_at", {
      withTimezone: true,
    }),

    completedAt: timestamp("completed_at", {
      withTimezone: true,
    }),

    cancelledAt: timestamp("cancelled_at", {
      withTimezone: true,
    }),

    ...timestamps,
  },

  (table) => [
    index("rental_orders_vendor_idx")
      .on(table.vendorId),

    index("rental_orders_customer_idx")
      .on(table.customerId),

    index("rental_orders_status_idx")
      .on(table.status),

    index("rental_orders_period_idx")
      .on(
        table.rentalStart,
        table.rentalEnd,
      ),
  ],
);
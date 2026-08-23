import {
  pgTable,
  uuid,
  integer,
  timestamp,
  index,
  check,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

import { organizations } from "../organization/organizations";
import { productVariants } from "../catalog/product-variants";
import { rentalOrders } from "./rental-orders";
import { rentalOrderLines } from "./rental-order-lines";

import { reservationStatusEnum } from "../shared/enums";
import { timestamps } from "../shared/columns";

export const reservations = pgTable(
  "reservations",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    vendorId: uuid("vendor_id")
      .notNull()
      .references(() => organizations.id),

    rentalOrderId: uuid("rental_order_id")
      .notNull()
      .references(() => rentalOrders.id),

    rentalOrderLineId: uuid("rental_order_line_id")
      .notNull()
      .references(() => rentalOrderLines.id),

    variantId: uuid("variant_id")
      .notNull()
      .references(() => productVariants.id),

    quantity: integer("quantity")
      .notNull(),

    startAt: timestamp("start_at", {
      withTimezone: true,
    }).notNull(),

    endAt: timestamp("end_at", {
      withTimezone: true,
    }).notNull(),

    status: reservationStatusEnum("status")
      .notNull()
      .default("RESERVED"),

    releasedAt: timestamp("released_at", {
      withTimezone: true,
    }),

    ...timestamps,
  },

  (table) => [
    index("reservations_variant_idx")
      .on(table.variantId),

    index("reservations_order_idx")
      .on(table.rentalOrderId),

    index("reservations_availability_idx")
      .on(
        table.variantId,
        table.status,
        table.startAt,
        table.endAt,
      ),

    check(
      "reservations_quantity_positive",
      sql`${table.quantity} > 0`,
    ),

    check(
      "reservations_valid_period",
      sql`${table.endAt} > ${table.startAt}`,
    ),
  ],
);
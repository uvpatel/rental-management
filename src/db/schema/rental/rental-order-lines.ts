import {
  pgTable,
  uuid,
  varchar,
  integer,
  numeric,
  timestamp,
  index,
  check,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

import { rentalOrders } from "./rental-orders";
import { productVariants } from "../catalog/product-variants";
import { rentalUnitEnum } from "../shared/enums";

export const rentalOrderLines = pgTable(
  "rental_order_lines",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    rentalOrderId: uuid("rental_order_id")
      .notNull()
      .references(() => rentalOrders.id, {
        onDelete: "cascade",
      }),

    variantId: uuid("variant_id")
      .notNull()
      .references(() => productVariants.id),

    description: varchar("description", {
      length: 500,
    }).notNull(),

    quantity: integer("quantity")
      .notNull(),

    rentalStart: timestamp("rental_start", {
      withTimezone: true,
    }).notNull(),

    rentalEnd: timestamp("rental_end", {
      withTimezone: true,
    }).notNull(),

    pricingUnit: rentalUnitEnum("pricing_unit")
      .notNull(),

    pricingDuration: integer("pricing_duration")
      .notNull()
      .default(1),

    unitPrice: numeric("unit_price", {
      precision: 12,
      scale: 2,
    }).notNull(),

    subtotal: numeric("subtotal", {
      precision: 12,
      scale: 2,
    }).notNull(),

    taxRate: numeric("tax_rate", {
      precision: 5,
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
  },

  (table) => [
    index("rental_order_lines_order_idx")
      .on(table.rentalOrderId),

    index("rental_order_lines_variant_idx")
      .on(table.variantId),

    check(
      "rental_order_lines_quantity_positive",
      sql`${table.quantity} > 0`,
    ),

    check(
      "rental_order_lines_valid_period",
      sql`${table.rentalEnd} > ${table.rentalStart}`,
    ),
  ],
);
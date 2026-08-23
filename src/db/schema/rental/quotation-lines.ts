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

import { quotations } from "./quotations";
import { productVariants } from "../catalog/product-variants";
import { rentalUnitEnum } from "../shared/enums";

export const quotationLines = pgTable(
  "quotation_lines",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    quotationId: uuid("quotation_id")
      .notNull()
      .references(() => quotations.id, {
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

    discountAmount: numeric("discount_amount", {
      precision: 12,
      scale: 2,
    })
      .notNull()
      .default("0"),

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
    index("quotation_lines_quotation_idx")
      .on(table.quotationId),

    index("quotation_lines_variant_idx")
      .on(table.variantId),

    check(
      "quotation_lines_quantity_positive",
      sql`${table.quantity} > 0`,
    ),

    check(
      "quotation_lines_valid_period",
      sql`${table.rentalEnd} > ${table.rentalStart}`,
    ),
  ],
);
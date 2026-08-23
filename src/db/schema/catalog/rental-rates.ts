import {
  pgTable,
  uuid,
  integer,
  numeric,
  boolean,
  index,
  uniqueIndex,
  check,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

import { productVariants } from "./product-variants";
import { rentalUnitEnum } from "../shared/enums";
import { timestamps } from "../shared/columns";

export const rentalRates = pgTable(
  "rental_rates",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    variantId: uuid("variant_id")
      .notNull()
      .references(() => productVariants.id, {
        onDelete: "cascade",
      }),

    unit: rentalUnitEnum("unit")
      .notNull(),

    duration: integer("duration")
      .notNull()
      .default(1),

    price: numeric("price", {
      precision: 12,
      scale: 2,
    }).notNull(),

    minimumQuantity: integer("minimum_quantity")
      .notNull()
      .default(1),

    isActive: boolean("is_active")
      .notNull()
      .default(true),

    ...timestamps,
  },

  (table) => [
    index("rental_rates_variant_idx")
      .on(table.variantId),

    uniqueIndex(
      "rental_rates_variant_unit_duration_uidx",
    ).on(
      table.variantId,
      table.unit,
      table.duration,
    ),

    check(
      "rental_rates_duration_positive",
      sql`${table.duration} > 0`,
    ),

    check(
      "rental_rates_price_non_negative",
      sql`${table.price} >= 0`,
    ),

    check(
      "rental_rates_minimum_quantity_positive",
      sql`${table.minimumQuantity} > 0`,
    ),
  ],
);
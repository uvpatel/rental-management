import {
  pgTable,
  uuid,
  integer,
  numeric,
  text,
  index,
} from "drizzle-orm/pg-core";

import { returns } from "./returns";
import { rentalOrderLines } from "../rental/rental-order-lines";
import { productVariants } from "../catalog/product-variants";
import { returnConditionEnum } from "../shared/enums";

export const returnLines = pgTable(
  "return_lines",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    returnId: uuid("return_id")
      .notNull()
      .references(() => returns.id, {
        onDelete: "cascade",
      }),

    rentalOrderLineId: uuid("rental_order_line_id")
      .notNull()
      .references(() => rentalOrderLines.id),

    variantId: uuid("variant_id")
      .notNull()
      .references(() => productVariants.id),

    expectedQuantity: integer("expected_quantity")
      .notNull(),

    returnedQuantity: integer("returned_quantity")
      .notNull()
      .default(0),

    condition: returnConditionEnum("condition"),

    damageFee: numeric("damage_fee", {
      precision: 12,
      scale: 2,
    })
      .notNull()
      .default("0"),

    damageNotes: text("damage_notes"),
  },

  (table) => [
    index("return_lines_return_idx")
      .on(table.returnId),
  ],
);
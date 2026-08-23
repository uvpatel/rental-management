import {
  pgTable,
  uuid,
  integer,
  text,
  index,
} from "drizzle-orm/pg-core";

import { pickups } from "./pickups";
import { rentalOrderLines } from "../rental/rental-order-lines";
import { productVariants } from "../catalog/product-variants";

export const pickupLines = pgTable(
  "pickup_lines",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    pickupId: uuid("pickup_id")
      .notNull()
      .references(() => pickups.id, {
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

    pickedQuantity: integer("picked_quantity")
      .notNull()
      .default(0),

    notes: text("notes"),
  },

  (table) => [
    index("pickup_lines_pickup_idx")
      .on(table.pickupId),
  ],
);
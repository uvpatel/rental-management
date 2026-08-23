import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { organizations } from "../organization/organizations";
import { addresses } from "../organization/addresses";
import { productVariants } from "../catalog/product-variants";
import { user } from "@/db/schema/auth/users";

import { stockMovementTypeEnum } from "../shared/enums";

export const stockMovements = pgTable(
  "stock_movements",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    vendorId: uuid("vendor_id")
      .notNull()
      .references(() => organizations.id),

    variantId: uuid("variant_id")
      .notNull()
      .references(() => productVariants.id),

    type: stockMovementTypeEnum("type")
      .notNull(),

    quantity: integer("quantity")
      .notNull(),

    fromLocationId: uuid("from_location_id")
      .references(() => addresses.id),

    toLocationId: uuid("to_location_id")
      .references(() => addresses.id),

    referenceType: text("reference_type"),
    referenceId: uuid("reference_id"),

    notes: text("notes"),

    performedBy: text("performed_by")
      .references(() => user.id),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },

  (table) => [
    index("stock_movements_variant_idx")
      .on(table.variantId),

    index("stock_movements_vendor_idx")
      .on(table.vendorId),

    index("stock_movements_reference_idx")
      .on(
        table.referenceType,
        table.referenceId,
      ),
  ],
);

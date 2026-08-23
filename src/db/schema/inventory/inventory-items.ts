import {
  pgTable,
  uuid,
  integer,
  uniqueIndex,
  index,
  check,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

import { organizations } from "../organization/organizations";
import { addresses } from "../organization/addresses";
import { productVariants } from "../catalog/product-variants";
import { timestamps } from "../shared/columns";

export const inventoryItems = pgTable(
  "inventory_items",
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

    locationId: uuid("location_id")
      .notNull()
      .references(() => addresses.id),

    quantityOnHand: integer("quantity_on_hand")
      .notNull()
      .default(0),

    ...timestamps,
  },

  (table) => [
    uniqueIndex(
      "inventory_variant_location_uidx",
    ).on(
      table.variantId,
      table.locationId,
    ),

    index("inventory_vendor_idx")
      .on(table.vendorId),

    index("inventory_variant_idx")
      .on(table.variantId),

    check(
      "inventory_quantity_non_negative",
      sql`${table.quantityOnHand} >= 0`,
    ),
  ],
);
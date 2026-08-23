import {
  pgTable,
  uuid,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

import { productVariants } from "./product-variants";
import { attributeValues } from "./attribute-values";

export const variantValues = pgTable(
  "variant_values",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    variantId: uuid("variant_id")
      .notNull()
      .references(() => productVariants.id, {
        onDelete: "cascade",
      }),

    attributeValueId: uuid("attribute_value_id")
      .notNull()
      .references(() => attributeValues.id, {
        onDelete: "cascade",
      }),
  },

  (table) => [
    uniqueIndex(
      "variant_values_variant_value_uidx",
    ).on(
      table.variantId,
      table.attributeValueId,
    ),

    index("variant_values_variant_idx")
      .on(table.variantId),
  ],
);
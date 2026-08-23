import {
  pgTable,
  uuid,
  varchar,
  numeric,
  boolean,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { products } from "./products";
import { timestamps } from "../shared/columns";

export const productVariants = pgTable(
  "product_variants",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, {
        onDelete: "cascade",
      }),

    sku: varchar("sku", {
      length: 100,
    }).notNull(),

    name: varchar("name", {
      length: 255,
    }).notNull(),

    costPrice: numeric("cost_price", {
      precision: 12,
      scale: 2,
    }),

    salesPrice: numeric("sales_price", {
      precision: 12,
      scale: 2,
    }),

    isActive: boolean("is_active")
      .notNull()
      .default(true),

    ...timestamps,
  },

  (table) => [
    index("product_variants_product_idx")
      .on(table.productId),

    uniqueIndex(
      "product_variants_product_sku_uidx",
    ).on(
      table.productId,
      table.sku,
    ),
  ],
);
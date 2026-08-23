import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  index,
  uniqueIndex,
  timestamp,
} from "drizzle-orm/pg-core";

import { organizations } from "../organization/organizations";
import { timestamps } from "../shared/columns";

export const products = pgTable(
  "products",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    vendorId: uuid("vendor_id")
      .notNull()
      .references(() => organizations.id),

    name: varchar("name", {
      length: 255,
    }).notNull(),

    slug: varchar("slug", {
      length: 255,
    }).notNull(),

    description: text("description"),

    shortDescription: varchar(
      "short_description",
      { length: 500 },
    ),

    thumbnailUrl: text("thumbnail_url"),

    isRentable: boolean("is_rentable")
      .notNull()
      .default(true),

    isPublished: boolean("is_published")
      .notNull()
      .default(false),

    deletedAt: timestamp("deleted_at", {
      withTimezone: true,
    }),

    ...timestamps,
  },

  (table) => [
    index("products_vendor_idx")
      .on(table.vendorId),

    uniqueIndex(
      "products_vendor_slug_uidx",
    ).on(
      table.vendorId,
      table.slug,
    ),
  ],
);
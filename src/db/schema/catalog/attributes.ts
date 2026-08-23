import {
  pgTable,
  uuid,
  varchar,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { organizations } from "../organization/organizations";
import { timestamps } from "../shared/columns";

export const attributes = pgTable(
  "attributes",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    vendorId: uuid("vendor_id")
      .notNull()
      .references(() => organizations.id, {
        onDelete: "cascade",
      }),

    name: varchar("name", {
      length: 100,
    }).notNull(),

    slug: varchar("slug", {
      length: 100,
    }).notNull(),

    ...timestamps,
  },

  (table) => [
    uniqueIndex(
      "attributes_vendor_slug_uidx",
    ).on(
      table.vendorId,
      table.slug,
    ),
  ],
);
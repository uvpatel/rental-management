import {
  pgTable,
  uuid,
  varchar,
  numeric,
  boolean,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { organizations } from "../organization/organizations";
import { timestamps } from "../shared/columns";

export const taxes = pgTable(
  "taxes",
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

    rate: numeric("rate", {
      precision: 5,
      scale: 2,
    }).notNull(),

    isActive: boolean("is_active")
      .notNull()
      .default(true),

    ...timestamps,
  },

  (table) => [
    uniqueIndex(
      "taxes_vendor_name_uidx",
    ).on(
      table.vendorId,
      table.name,
    ),
  ],
);
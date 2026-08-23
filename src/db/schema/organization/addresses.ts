import {
  pgTable,
  uuid,
  varchar,
  boolean,
  index,
} from "drizzle-orm/pg-core";

import { organizations } from "./organizations";
import { addressTypeEnum } from "../shared/enums";
import { timestamps } from "../shared/columns";

export const addresses = pgTable(
  "addresses",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, {
        onDelete: "cascade",
      }),

    type: addressTypeEnum("type")
      .notNull(),

    name: varchar("name", {
      length: 255,
    }),

    phone: varchar("phone", {
      length: 30,
    }),

    addressLine1: varchar("address_line_1", {
      length: 255,
    }).notNull(),

    addressLine2: varchar("address_line_2", {
      length: 255,
    }),

    city: varchar("city", {
      length: 100,
    }).notNull(),

    state: varchar("state", {
      length: 100,
    }).notNull(),

    postalCode: varchar("postal_code", {
      length: 20,
    }).notNull(),

    country: varchar("country", {
      length: 100,
    })
      .notNull()
      .default("India"),

    isDefault: boolean("is_default")
      .notNull()
      .default(false),

    ...timestamps,
  },

  (table) => [
    index("addresses_organization_idx")
      .on(table.organizationId),
  ],
);
import {
  pgTable,
  uuid,
  varchar,
  text,
  index,
} from "drizzle-orm/pg-core";

import {
  organizationTypeEnum,
  organizationStatusEnum,
} from "../shared/enums";

import { timestamps } from "../shared/columns";


export const organizations = pgTable(
  "organizations",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    name: varchar("name", {
      length: 255,
    }).notNull(),

    slug: varchar("slug", {
      length: 255,
    })
      .notNull()
      .unique(),

    type: organizationTypeEnum("type")
      .notNull(),

    status: organizationStatusEnum("status")
      .notNull()
      .default("ACTIVE"),

    gstin: varchar("gstin", {
      length: 15,
    }),

    pan: varchar("pan", {
      length: 10,
    }),

    email: varchar("email", {
      length: 255,
    }),

    phone: varchar("phone", {
      length: 30,
    }),

    logoUrl: text("logo_url"),

    ...timestamps,
  },

  (table) => [
    index("organizations_type_idx")
      .on(table.type),

    index("organizations_status_idx")
      .on(table.status),
  ],
);

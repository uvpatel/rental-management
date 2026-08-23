import {
  pgTable,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { users } from "./users.schema";

export const sessions = pgTable(
  "session",
  {
    id: text("id").primaryKey(),

    expiresAt: timestamp("expires_at", {
      withTimezone: true,
    }).notNull(),

    token: text("token")
      .notNull()
      .unique(),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    ipAddress: text("ip_address"),

    userAgent: text("user_agent"),

    userId: text("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
  },

  (table) => [
    index("sessions_user_idx").on(table.userId),
  ],
);
import {
  pgTable,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { users } from "./users.schema";

export const accounts = pgTable(
  "account",
  {
    id: text("id").primaryKey(),

    accountId: text("account_id").notNull(),

    providerId: text("provider_id").notNull(),

    userId: text("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),

    accessTokenExpiresAt: timestamp(
      "access_token_expires_at",
      { withTimezone: true },
    ),

    refreshTokenExpiresAt: timestamp(
      "refresh_token_expires_at",
      { withTimezone: true },
    ),

    scope: text("scope"),
    password: text("password"),

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
  },

  (table) => [
    index("accounts_user_idx").on(table.userId),
  ],
);
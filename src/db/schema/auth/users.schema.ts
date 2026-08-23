import {
  pgTable,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

import { platformRoleEnum } from "../shared/enums";

export const users = pgTable("user", {
  id: text("id").primaryKey(),

  name: text("name").notNull(),

  email: text("email")
    .notNull()
    .unique(),

  emailVerified: boolean("email_verified")
    .notNull()
    .default(false),

  image: text("image"),

  role: platformRoleEnum("role")
    .notNull()
    .default("USER"),

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
});
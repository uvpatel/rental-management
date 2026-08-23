import {
  pgTable,
  uuid,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { user } from "../auth/users";
import { notificationTypeEnum } from "../shared/enums";

export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),

    type: notificationTypeEnum("type")
      .notNull(),

    title: text("title")
      .notNull(),

    message: text("message")
      .notNull(),

    entityType: text("entity_type"),

    entityId: uuid("entity_id"),

    readAt: timestamp("read_at", {
      withTimezone: true,
    }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },

  (table) => [
    index("notifications_user_idx")
      .on(table.userId),

    index("notifications_user_read_idx")
      .on(
        table.userId,
        table.readAt,
      ),
  ],
);

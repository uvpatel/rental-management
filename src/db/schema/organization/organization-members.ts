import {
  pgTable,
  uuid,
  text,
  timestamp,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

import { user } from "@/db/schema/auth/users";
import { organizations } from "./organizations";
import { organizationMemberRoleEnum } from "../shared/enums";

export const organizationMembers = pgTable(
  "organization_members",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, {
        onDelete: "cascade",
      }),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),

    role: organizationMemberRoleEnum("role")
      .notNull()
      .default("MEMBER"),

    joinedAt: timestamp("joined_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },

  (table) => [
    uniqueIndex(
      "organization_members_org_user_uidx",
    ).on(
      table.organizationId,
      table.userId,
    ),

    index("organization_members_user_idx")
      .on(table.userId),
  ],
);

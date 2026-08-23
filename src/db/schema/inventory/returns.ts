import {
  pgTable,
  uuid,
  varchar,
  numeric,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { rentalOrders } from "../rental/rental-orders";
import { organizations } from "../organization/organizations";
import { users } from "../auth/users.schema";
import { returnStatusEnum } from "../shared/enums";
import { timestamps } from "../shared/columns";

export const returns = pgTable(
  "returns",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    returnNumber: varchar("return_number", {
      length: 50,
    })
      .notNull()
      .unique(),

    rentalOrderId: uuid("rental_order_id")
      .notNull()
      .references(() => rentalOrders.id),

    vendorId: uuid("vendor_id")
      .notNull()
      .references(() => organizations.id),

    status: returnStatusEnum("status")
      .notNull()
      .default("PENDING"),

    expectedAt: timestamp("expected_at", {
      withTimezone: true,
    }).notNull(),

    returnedAt: timestamp("returned_at", {
      withTimezone: true,
    }),

    lateFee: numeric("late_fee", {
      precision: 12,
      scale: 2,
    })
      .notNull()
      .default("0"),

    damageFee: numeric("damage_fee", {
      precision: 12,
      scale: 2,
    })
      .notNull()
      .default("0"),

    processedBy: text("processed_by")
      .references(() => users.id),

    notes: text("notes"),

    ...timestamps,
  },

  (table) => [
    index("returns_order_idx")
      .on(table.rentalOrderId),

    index("returns_expected_idx")
      .on(table.expectedAt),
  ],
);
import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { rentalOrders } from "../rental/rental-orders";
import { organizations } from "../organization/organizations";
import { users } from "../auth/users.schema";
import { pickupStatusEnum } from "../shared/enums";
import { timestamps } from "../shared/columns";

export const pickups = pgTable(
  "pickups",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    pickupNumber: varchar("pickup_number", {
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

    status: pickupStatusEnum("status")
      .notNull()
      .default("PENDING"),

    scheduledAt: timestamp("scheduled_at", {
      withTimezone: true,
    }),

    pickedUpAt: timestamp("picked_up_at", {
      withTimezone: true,
    }),

    instructions: text("instructions"),

    processedBy: text("processed_by")
      .references(() => users.id),

    ...timestamps,
  },

  (table) => [
    index("pickups_order_idx")
      .on(table.rentalOrderId),

    index("pickups_vendor_status_idx")
      .on(
        table.vendorId,
        table.status,
      ),
  ],
);
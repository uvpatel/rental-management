import {
  pgTable,
  uuid,
  numeric,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { rentalOrders } from "../rental/rental-orders";
import { depositStatusEnum } from "../shared/enums";
import { timestamps } from "../shared/columns";

export const deposits = pgTable(
  "deposits",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    rentalOrderId: uuid("rental_order_id")
      .notNull()
      .references(() => rentalOrders.id),

    amount: numeric("amount", {
      precision: 12,
      scale: 2,
    }).notNull(),

    status: depositStatusEnum("status")
      .notNull()
      .default("REQUIRED"),

    collectedAmount: numeric(
      "collected_amount",
      {
        precision: 12,
        scale: 2,
      },
    )
      .notNull()
      .default("0"),

    deductedAmount: numeric(
      "deducted_amount",
      {
        precision: 12,
        scale: 2,
      },
    )
      .notNull()
      .default("0"),

    refundedAmount: numeric(
      "refunded_amount",
      {
        precision: 12,
        scale: 2,
      },
    )
      .notNull()
      .default("0"),

    collectedAt: timestamp("collected_at", {
      withTimezone: true,
    }),

    refundedAt: timestamp("refunded_at", {
      withTimezone: true,
    }),

    ...timestamps,
  },

  (table) => [
    index("deposits_order_idx")
      .on(table.rentalOrderId),
  ],
);
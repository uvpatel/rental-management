import {
  pgTable,
  uuid,
  varchar,
  integer,
  numeric,
  index,
} from "drizzle-orm/pg-core";

import { invoices } from "./invoices";
import { invoiceLineTypeEnum } from "../shared/enums";

export const invoiceLines = pgTable(
  "invoice_lines",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    invoiceId: uuid("invoice_id")
      .notNull()
      .references(() => invoices.id, {
        onDelete: "cascade",
      }),

    type: invoiceLineTypeEnum("type")
      .notNull()
      .default("RENTAL"),

    description: varchar("description", {
      length: 500,
    }).notNull(),

    quantity: integer("quantity")
      .notNull()
      .default(1),

    unitPrice: numeric("unit_price", {
      precision: 12,
      scale: 2,
    }).notNull(),

    subtotal: numeric("subtotal", {
      precision: 12,
      scale: 2,
    }).notNull(),

    taxRate: numeric("tax_rate", {
      precision: 5,
      scale: 2,
    })
      .notNull()
      .default("0"),

    taxAmount: numeric("tax_amount", {
      precision: 12,
      scale: 2,
    })
      .notNull()
      .default("0"),

    totalAmount: numeric("total_amount", {
      precision: 12,
      scale: 2,
    }).notNull(),
  },

  (table) => [
    index("invoice_lines_invoice_idx")
      .on(table.invoiceId),
  ],
);
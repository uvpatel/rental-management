import {
  pgTable,
  uuid,
  varchar,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { attributes } from "./attributes";
import { timestamps } from "../shared/columns";

export const attributeValues = pgTable(
  "attribute_values",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    attributeId: uuid("attribute_id")
      .notNull()
      .references(() => attributes.id, {
        onDelete: "cascade",
      }),

    value: varchar("value", {
      length: 100,
    }).notNull(),

    ...timestamps,
  },

  (table) => [
    index("attribute_values_attribute_idx")
      .on(table.attributeId),

    uniqueIndex(
      "attribute_values_attribute_value_uidx",
    ).on(
      table.attributeId,
      table.value,
    ),
  ],
);
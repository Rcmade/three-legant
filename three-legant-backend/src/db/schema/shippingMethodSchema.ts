import { numeric, pgTable, text } from "drizzle-orm/pg-core";
import { commonCreatedField } from "./commonSchemaFields";
import { users } from "./userSchema";
import { nId } from "@/lib/utils/dbUtils";

export const shippingAddress = pgTable("shipping_address", {
  ...commonCreatedField,
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  title: text("title").notNull().unique(),
  description: text("description"),
  shippingCost: numeric("shipping_cost", { precision: 10, scale: 2 }).notNull(),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nId(6)),
});

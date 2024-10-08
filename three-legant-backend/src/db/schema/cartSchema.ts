import { nId } from "@/lib/utils/dbUtils";
import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { products } from "./productSchema";
import { users } from "./userSchema";
import { commonCreatedField } from "./commonSchemaFields";

export const UserCart = pgTable("user_cart", {
  id: text("id").primaryKey().$defaultFn(nId),
  productId: text("product_id")
    .references(() => products.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  qty: integer("qty").default(0).notNull(),
  ...commonCreatedField,
});

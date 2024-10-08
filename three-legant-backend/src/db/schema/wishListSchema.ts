import { nId } from "@/lib/utils/dbUtils";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { products } from "./productSchema";
import { users } from "./userSchema";

export const UserWishList = pgTable("wish_list", {
  id: text("id").primaryKey().$defaultFn(nId),
  productId: text("product_id")
    .references(() => products.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});


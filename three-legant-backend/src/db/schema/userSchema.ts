import { timestamp, pgTable, text, varchar, pgEnum } from "drizzle-orm/pg-core";
import { nId } from "@/lib/utils/dbUtils";
//
export const userRole = pgEnum("UserRole", ["ADMIN", "USER", "SELLER"]);

export const users = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(nId),
  role: userRole("role").notNull().default("USER"),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date())
    .defaultNow(),
});

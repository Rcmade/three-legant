import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { commonCreatedField } from "./commonSchemaFields";
import { users } from "./userSchema";

export const address = pgTable("address", {
  ...commonCreatedField,
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  street: varchar("street", { length: 255 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  zipCode: varchar("zip_code", { length: 20 }).notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
});

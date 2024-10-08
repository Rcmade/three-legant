import {
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { nId } from "@/lib/utils/dbUtils";
import { commonCreatedField } from "./commonSchemaFields";
import { users } from "./userSchema";

export const banners = pgTable("banners", {
  id: text("id").primaryKey().$defaultFn(nId),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(), // Title of the banner
  imageUrl: varchar("image_url", { length: 500 }).notNull(), // URL of the banner image
  link: varchar("link", { length: 500 }).notNull(), // URL where the banner redirects
  bannerType: varchar("banner_type", { length: 50 }).notNull(), // Type of banner (e.g., 'promo', 'category', 'featured')
  isActive: boolean("is_active").default(true), // Active status of the banner
  priority: integer("priority").default(0), // Priority for display ordering
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  ...commonCreatedField,
});

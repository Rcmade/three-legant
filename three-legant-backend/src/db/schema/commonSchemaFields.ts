import {
  integer,
  numeric,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const commonCreatedField = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date())
    .defaultNow(),
};

export const commonProductFields = {
  primaryImage: text("primary_image").notNull(),
  stock: integer("stock").default(0).notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  discountedPrice: numeric("discounted_price", { precision: 10, scale: 2 }),
  sortDescription: varchar("sort_description", { length: 300 }).notNull(),
};

import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { commonCreatedField } from "./commonSchemaFields";
import { users } from "./userSchema";
import { address } from "./addressSchema";

// Enums for order statuses
export const orderStatus = pgEnum("order_status", [
  "paid",
  "cancel",
  "pending",
  "failed",
]);
export const tempOrderStatus = pgEnum("temp_order_status", [
  "pending",
  "failed",
]);

// Reusable Order Object (For both Orders and Temp Orders)
const orderObj = {
  ...commonCreatedField,
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  shippingMethod: text("shipping_method").notNull(),
  clientSecret: text("client_secret").unique().notNull(),
  userShippingAddress: text("shipping_address")
    .references(() => address.id, {
      onDelete: "no action",
      onUpdate: "cascade",
    })
    .notNull(),
};

// Reusable Order Items Object (For both Final and Temp Order Items)
const orderItemsObj = {
  ...commonCreatedField,
  productId: text("product_id").notNull(),
  name: text("name").notNull(),
  qty: integer("qty").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  primaryImage: text("primary_image").notNull(),
};

// Final Orders Table (Only for Paid Orders)
export const orders = pgTable("orders", {
  ...orderObj,
  status: orderStatus("status").default("pending").notNull(),
});

// Temporary Orders Table (Holds Data Until Payment is Confirmed)
export const tempOrders = pgTable("temp_orders", {
  ...orderObj,
  status: tempOrderStatus("status").default("pending").notNull(),
  clientSecret: text("temp_client_secret").unique().notNull(),
  expireAt: timestamp("expire_at"),
});

// Final Order Items Table (Linked with Orders)
export const orderItems = pgTable("order_items", {
  ...orderItemsObj,
  orderId: text("order_id")
    .references(() => orders.id, { onDelete: "cascade" })
    .notNull(),
});

// Temporary Order Items Table (Linked with Temp Orders)
export const tempOrderItems = pgTable("temp_order_items", {
  ...orderItemsObj,
  orderId: text("order_id")
    .references(() => tempOrders.id, { onDelete: "cascade" })
    .notNull(),
});

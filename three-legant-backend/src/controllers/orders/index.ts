import { db } from "@/db/db";
import { orders, orderItems } from "@/db/schema/orderSchema"; // Adjust the import as per your schema structure
import { eq } from "drizzle-orm";

export const getOrderBySecret = async (orderBySecret: string) => {
  const result = await db
    .select({
      order: {
        createdAt: orders.createdAt,
        id: orders.id,
        totalAmount: orders.totalAmount,
      },
      items: {
        primaryImage: orderItems.primaryImage,
        qty: orderItems.qty,
      },
    })
    .from(orders)
    .innerJoin(orderItems, eq(orderItems.orderId, orders.id))
    .where(eq(orders.clientSecret, orderBySecret));

  if (result.length === 0) {
    return null;
  }

  // Structure the result to separate order details from items
  const orderDetails = result[0].order; // Get the order details from the first result
  const orderItemsList = result.map((row) => row.items); // Get all items related to the order

  return {
    order: orderDetails,
    items: orderItemsList,
  };
};

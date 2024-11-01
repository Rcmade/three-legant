import { db } from "@/db/db";
import { orders, orderItems, address } from "@/db/schema";
import {
  GetOrderAddressT,
  GetOrderItemsT,
  OrderItemsT,
  PaginationParams,
} from "@/types";
import { and, count, eq, or, like, sql, desc } from "drizzle-orm"; // Query helpers

export const getUserOrders = async (
  paginationParams: PaginationParams & { sortBy?: keyof typeof orders },
  userId: string
) => {
  const {
    limit = 10,
    page = 1,
    search = "",
    sortBy = "createdAt",
  } = paginationParams;

  const similarityThreshold = 0.3;

  // Build search query for both `orders` and `orderItems` fields
  const searchQuery = search
    ? or(
        sql`similarity(${orders.clientSecret}, ${search}) > ${similarityThreshold}`, // Search by client secret
        sql`similarity(${orders.shippingMethod}, ${search}) > ${similarityThreshold}`, // Search by shipping method
        like(orderItems.name, `%${search}%`) // Search by product name in order items
      )
    : undefined;

  const whereClause = and(eq(orders.userId, userId), searchQuery);

  // Fetch orders with only the required fields and their items
  const userOrders = await db
    .select({
      id: orders.id,
      createdAt: orders.createdAt,
      totalAmount: orders.totalAmount,
      clientSecret: orders.clientSecret,
      status: orders.status,
      /**
       * @type  OrderItemsT use this only if need to update update the OrderItemsT also
       */
      items: sql`json_agg(
        json_build_object(
          'orderItemId', ${orderItems.id},
          'productId', ${orderItems.productId},
          'name', ${orderItems.name},
          'qty', ${orderItems.qty},
          'price', ${orderItems.price},
          'primaryImage', ${orderItems.primaryImage}
        )
      )`.as("items"),
    })
    .from(orders)
    .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
    .where(whereClause)
    .groupBy(orders.id)
    .limit(limit)
    .offset(Math.max(page - 1, 0) * limit)
    .orderBy(desc(orders[sortBy] || (orders.createdAt as any)));

  // Fetch the total count of orders for pagination
  const totalOrders = await db
    .select({ count: count() })
    .from(orders)
    .where(eq(orders.userId, userId));

  return {
    orders: userOrders.map((order) => ({
      ...order,
      items: (order.items ?? []) as OrderItemsT[],
    })),
    pagination: {
      total: totalOrders[0]?.count || 0,
      limit,
      page,
    },
  };
};

type GetOrderAddressByIdT = Omit<GetOrderAddressT, "createdAt" | "updatedAt">;
type GetOrderItemsByIdT = Omit<
  GetOrderItemsT,
  "createdAt" | "updatedAt" | "id" | "orderId"
> & {
  orderId: string;
};
// export const getUserOrderById = async (orderId: string, userId: string) => {
//   // const order = await db
//   //   .select({
//   //     id: orders.id,
//   //     createdAt: orders.createdAt,
//   //     totalAmount: orders.totalAmount,
//   //     clientSecret: orders.clientSecret,
//   //     status: orders.status,
//   //     shippingMethod: orders.shippingMethod,
//   //     /** @type GetOrderAddressByIdT */
//   //     userShippingAddress: sql`
//   //       json_build_object(
//   //         'id', ${address.id},
//   //         'street', ${address.street},
//   //         'city', ${address.city},
//   //         'state', ${address.state},
//   //         'zipCode', ${address.zipCode},
//   //         'country', ${address.country}
//   //         'firstName', ${address.firstName},
//   //         'lastName', ${address.lastName},
//   //         'email', ${address.email},
//   //         'phone', ${address.phone}
//   //       )
//   //     `.as("userShippingAddress"),
//   //     /** @typeGetOrderItemsByIdT[] */
//   //     items: sql`
//   //       json_agg(
//   //         json_build_object(
//   //           'orderItemId', ${orderItems.id},
//   //           'productId', ${orderItems.productId},
//   //           'name', ${orderItems.name},
//   //           'qty', ${orderItems.qty},
//   //           'price', ${orderItems.price},
//   //           'primaryImage', ${orderItems.primaryImage}
//   //          )
//   //       )
//   //     `.as("items"),
//   //   })
//   //   .from(orders)
//   //   .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
//   //   .leftJoin(address, eq(orders.userShippingAddress, address.id))
//   //   .where(and(eq(orders.id, orderId), eq(orders.userId, userId)))
//   //   .groupBy(orders.id, address.id);

//   const order = await db
//     .select({
//       id: orders.id,
//       createdAt: orders.createdAt,
//       totalAmount: orders.totalAmount,
//       clientSecret: orders.clientSecret,
//       status: orders.status,
//       shippingMethod: orders.shippingMethod,
//       userShippingAddress: sql`
//       json_build_object(
//         'id', a.id,
//         'street', a.street,
//         'city', a.city,
//         'state', a.state,
//         'country', a.country,
//         'email', a.email,
//         'phone', a.phone
//       )
//     `.as("userShippingAddress"),
//       items: sql`
//       json_agg(
//         json_build_object(
//           'orderItemId', ${orderItems.id},
//           'productId', ${orderItems.productId},
//           'name', ${orderItems.name},
//           'qty', ${orderItems.qty},
//           'price', ${orderItems.price},
//           'primaryImage', ${orderItems.primaryImage}
//         )
//       )
//     `.as("items"),
//     })
//     .from(orders)
//     .leftJoin(
//       sql`public.address AS a`,
//       eq(orders.userShippingAddress, sql`a.id`)
//     ) // Use schema if needed
//     .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
//     .where(and(eq(orders.id, orderId), eq(orders.userId, userId)))
//     .groupBy(orders.id, sql`a.id`);
//   if (order.length === 0) {
//     throw new Error("Order not found or access denied.");
//   }

//   const result = order[0];

//   return {
//     id: result.id,
//     createdAt: result.createdAt,
//     totalAmount: result.totalAmount,
//     clientSecret: result.clientSecret,
//     status: result.status,
//     shippingMethod: result.shippingMethod,
//     userShippingAddress: result.userShippingAddress as GetOrderAddressByIdT,
//     items: result.items as GetOrderItemsByIdT[],
//   };
// };

export const getUserOrderById = async (orderId: string, userId: string) => {
  const order = await db
    .select({
      id: orders.id,
      createdAt: orders.createdAt,
      totalAmount: orders.totalAmount,
      clientSecret: orders.clientSecret,
      status: orders.status,
      // shippingMethod: orders.shippingMethod,
      /** @type OrderItemsT */
      userShippingAddress: sql`
        json_build_object(
          'id', ${address.id},
          'street', ${address.street},
          'city', ${address.city},
          'state', ${address.state},
          'zipCode', ${address.zipCode},
          'country', ${address.country},
          'firstName', ${address.firstName},
          'lastName', ${address.lastName},
          'email', ${address.email},
          'phone', ${address.phone}
        )`.as("userShippingAddress"),
      /** @type GetOrderItemsByIdT[] */
      items: sql`
        json_agg(
          json_build_object(
          'orderItemId', ${orderItems.id},
          'productId', ${orderItems.productId},
          'name', ${orderItems.name},
          'qty', ${orderItems.qty},
          'price', ${orderItems.price},
          'primaryImage', ${orderItems.primaryImage}
          )
        )`.as("items"),
    })
    .from(orders)
    .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
    .leftJoin(address, eq(orders.userShippingAddress, address.id)) // Join with address table
    .where(and(eq(orders.id, orderId), eq(orders.userId, userId)))
    .groupBy(orders.id, address.id);

  if (order.length === 0) {
    throw new Error("Order not found or access denied.");
  }

  const result = order[0];
  return {
    orders: {
      ...result,
      items: result.items as OrderItemsT[],
      userShippingAddress: undefined,
    },
    userShippingAddress: result.userShippingAddress as GetOrderAddressByIdT,
  };
};

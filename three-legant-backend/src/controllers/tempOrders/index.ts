import { db } from "@/db/db";
import { address } from "@/db/schema/addressSchema";
import { users } from "@/db/schema/userSchema";
import { tempOrderItems, tempOrders } from "@/db/schema/orderSchema";
import { TempOrderRequestT } from "@/types";
import { and, eq } from "drizzle-orm";
import Stripe from "stripe";
import { createPaymentIntent } from "../payments";

export const createTempOrder = async (
  userId: string,
  data: TempOrderRequestT
) => {
  // 1. Verify User's Shipping Address
  const [userShipping] = await db
    .select({ id: address.id })
    .from(address)
    .where(and(eq(address.id, data.shippingId), eq(address.userId, userId)))
    .limit(1);

  if (!userShipping?.id) {
    return { error: "Shipping address not found" };
  }

  // Extract PaymentIntent ID from clientSecret
  const paymentIntentId = data.clientSecret.split("_secret_")[0];

  // 2. Validate Payment Intent with Stripe
  const stripeCon = new Stripe(process.env.STRIPE_SECRET_KEY!);
  let paymentIntent;
  try {
    paymentIntent = await stripeCon.paymentIntents.retrieve(paymentIntentId);
  } catch (error) {
    console.error("Error retrieving PaymentIntent:", error);
    return { error: "Failed to validate payment" };
  }

  const paymentInfo = await createPaymentIntent(
    userId,
    {
      shippingMethodId: data.shippingMethodId,
    },
    true
  );

  if (paymentIntent.amount !== paymentInfo?.totalAmountInCents) {
    return { error: "Payment amount does not match" };
  }

  // Prepare Temp Order Data
  const tempOrderData = {
    id: paymentIntent.metadata.id || undefined,
    userId,
    totalAmount: paymentInfo.totalAmount.toString(),
    shippingMethod: data.shippingMethodId,
    clientSecret: data.clientSecret,
    userShippingAddress: userShipping.id,
  };

  // console.dir(tempOrderData, { depth: Infinity, colors: true });

  const items = paymentInfo.cart?.products?.map((item) => ({
    productId: item.productId,
    name: item.name,
    qty: item.qty,
    price: item.price,
    primaryImage: item.primaryImage,
  }));

  try {
    // 3. Use Transaction to Insert Temp Order and Items
    const result = await db.transaction(async (trx) => {
      // Insert the temporary order and get its ID
      const [tempOrder] = await trx
        .insert(tempOrders)
        .values(tempOrderData)
        .returning({ id: tempOrders.id })
        .onConflictDoNothing();

      // Attach the temp order ID to each item
      const orderItems = items.map((item) => ({
        ...item,
        orderId: tempOrder.id,
      }));

      // Batch insert all the items
      await trx.insert(tempOrderItems).values(orderItems);

      // 4. Update PaymentIntent with Order ID in metadata
      // const ev = await stripeCon.paymentIntents.update(paymentIntentId, {
      //   metadata: {
      //     orderId: tempOrder.id,
      //   },
      // });


      return tempOrder;
    });

    return { message: "Temporary order created", order: result };
  } catch (error) {
    console.error("Error creating temporary order:", error);
    return { error: "Failed to create temporary order" };
  }
};

// export const createTempOrder = async (
//   userId: string,
//   data: TempOrderRequestT
// ) => {
//   // 1. Verify User's Shipping Address

//   const [userShipping] = await db
//     .select({ id: address.id })
//     .from(address)
//     .where(and(eq(address.id, data.shippingId), eq(address.userId, userId)))
//     .limit(1);

//   if (!userShipping?.id) {
//     return { error: "Shipping address not found" };
//   }

//   // 2. Validate Payment Intent with Stripe
//   const stripeCon = new Stripe(process.env.STRIPE_SECRET_KEY!);
//   const paymentIntent = await stripeCon.paymentIntents.retrieve(
//     data.clientSecret
//   );


//   const paymentInfo = await createPaymentIntent(
//     userId,
//     data.shippingMethodId,
//     true
//   );

//   if (paymentIntent.amount !== paymentInfo?.totalAmount) {
//     return { error: "Payment amount does not match" };
//   }

//   // Prepare Temp Order Data
//   const tempOrderData = {
//     userId,
//     totalAmount: paymentInfo.totalAmount.toString(),
//     shippingMethod: data.shippingMethodId,
//     clientSecret: data.clientSecret,
//     userShippingAddress: userShipping.id,
//   };

//   const items = paymentInfo.cart?.products?.map((item) => ({
//     productId: item.productId,
//     name: item.name,
//     qty: item.qty,
//     price: item.price,
//     primaryImage: item.primaryImage,
//   }));

//   try {
//     // 3. Use Transaction to Insert Temp Order and Items
//     const result = await db.transaction(async (trx) => {
//       // Insert the temporary order and get its ID
//       const [tempOrder] = await trx
//         .insert(tempOrders)
//         .values(tempOrderData)
//         .returning({ id: tempOrders.id });

//       // Attach the temp order ID to each item
//       const orderItems = items.map((item) => ({
//         ...item,
//         orderId: tempOrder.id,
//       }));

//       // Batch insert all the items
//       await trx.insert(tempOrderItems).values(orderItems);

//       return tempOrder;
//     });

//     const updateIntent = await stripeCon.paymentIntents.update(
//       data.clientSecret,
//       {
//         metadata: {
//           orderId: result.id,
//         },
//       }
//     );

//     return { message: "Temporary order created", order: result };
//   } catch (error) {
//     console.error("Error creating temporary order:", error);
//     return { error: "Failed to create temporary order" };
//   }
// };

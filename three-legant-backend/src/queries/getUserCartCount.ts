import { db } from "@/db/db";
import { UserCart } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { Context } from "hono";

export async function getUserCartCount(userId: string,c:Context) {
  const result = await db(c)
    .select({
      count: count(), // Using the `count` function to get the total
    })
    .from(UserCart)
    .where(eq(UserCart.userId, userId));

  // The result will be an array, get the first item to access the count
  return result[0]?.count || 0;
}

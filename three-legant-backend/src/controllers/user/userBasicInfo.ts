import { db } from "@/db/db";
import { users } from "@/db/schema";
import { getUserCartCount } from "@/queries/getUserCartCount";
import { eq } from "drizzle-orm";
import { Context } from "hono";

export const userBasicInfo = async (userId: string, c: Context) => {
  const cartCount = await getUserCartCount(userId, c);
  return {
    cartCount,
  };
};

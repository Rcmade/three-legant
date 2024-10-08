import { db } from "@/db/db";
import { users } from "@/db/schema";
import { getUserCartCount } from "@/queries/getUserCartCount";
import { eq } from "drizzle-orm";

export const userBasicInfo = async (userId: string) => {
  const cartCount = await getUserCartCount(userId);
  return {
    cartCount,
  };
};

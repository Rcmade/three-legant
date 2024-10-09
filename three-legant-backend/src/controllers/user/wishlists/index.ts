import { db } from "@/db/db";
import { users, UserWishList } from "@/db/schema";
import { WishlistInputT } from "@/types";
import { wishlistInput } from "@/zodSchema/wishListSchema";
import { and, eq, or } from "drizzle-orm";
import { Context } from "hono";

export const createWishlist = async (data: WishlistInputT, c: Context) => {
  const parseData = wishlistInput.safeParse(data);
  if (parseData.error) {
    return {
      error: "Invalid fields",
      // errors: parseData.error.errors,
    };
  }

  const d = parseData.data;

  const [isExist] = await db(c)
    .select()
    .from(UserWishList)
    .where(
      and(
        eq(UserWishList.productId, d.productId),
        eq(UserWishList.userId, d.userId)
      )
    );

  if (isExist) {
    return isExist;
  }
  const [result] = await db(c).insert(UserWishList).values(d).returning();

  return result;
};

export const getWishlistByIdOrProductId = async (
  id: string,
  userId: string,
  c: Context
) => {
  const [result] = await db(c)
    .select({
      productId: UserWishList.productId,
    })
    .from(UserWishList)
    .where(
      and(
        eq(UserWishList.userId, userId),
        or(eq(UserWishList.id, id), eq(UserWishList.productId, id))
      )
    )
    .limit(1)
    .execute();
  return result;
};

export const removeWishListByIdOrProductId = async (
  id: string,
  userId: string,
  c: Context
) => {
  const [result] = await db(c)
    .delete(UserWishList)
    .where(
      and(
        eq(UserWishList.userId, userId),
        or(eq(UserWishList.id, id), eq(UserWishList.productId, id))
      )
    )
    .returning();

  return result;
};

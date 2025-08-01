import { db } from "@/db/db";
import { users, UserWishList } from "@/db/schema";
import { WishlistInputT } from "@/types";
import { wishlistInput } from "@/zodSchema/wishListSchema";
import { and, eq, or } from "drizzle-orm";

export const createWishlist = async (data: WishlistInputT) => {
  const parseData = wishlistInput.safeParse(data);
  if (parseData.error) {
    return {
      error: "Invalid fields",
      // errors: parseData.error.errors,
    };
  }

  const d = parseData.data;

  const [isExist] = await db
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
  const [result] = await db.insert(UserWishList).values(d).returning();

  return result;
};

export const getWishlistByIdOrProductId = async (
  id: string,
  userId: string
) => {
  const [result] = await db
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
  userId: string
) => {
  const [result] = await db
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

import { getAllCartProducts } from "@/controllers/user/cart";
import { Context } from "hono";

export const cartRouteUtils = async (
  params: Record<string, string>,
  userId: string,
  c: Context
) => {
  const limit = params.limit ? parseInt(params.limit, 10) : 10;
  const cartProducts = await getAllCartProducts(
    userId,
    {
      ...params,
      limit: limit,
      offset: +(params.offset || 0),
      noLimit: !!params?.noLimit,
      priceFilter: +params.priceFilter,
      sortBy: params.sortBy as any,
    },
    c
  );

  return cartProducts;
};

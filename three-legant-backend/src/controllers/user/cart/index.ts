import { db } from "@/db/db";
import { products, UserCart } from "@/db/schema";
import { CartInputT, PaginationParams } from "@/types"; // Make sure to define this type appropriately
import { cartInput } from "@/zodSchema/cartSchema";
import { and, count, desc, eq, lte, or, sql } from "drizzle-orm";

export const createCartItem = async (data: CartInputT) => {
  // Validate the input
  const parseData = cartInput.safeParse(data);
  if (parseData.error) {
    return {
      error: "Invalid fields",
    };
  }

  const d = parseData.data;

  // Query the product stock and check for existing cart item
  const [productAndCartItem] = await db
    .select({
      productStock: products.stock,
      cartQty: UserCart.qty,
    })
    .from(products)
    .leftJoin(
      UserCart,
      and(eq(products.id, UserCart.productId), eq(UserCart.userId, d.userId))
    )
    .where(eq(products.id, d.productId))
    .limit(1);

  // Check if the product exists
  if (!productAndCartItem) {
    return {
      error: "Product not found",
    };
  }

  const { productStock, cartQty } = productAndCartItem;

  // Check if the requested quantity exceeds the available stock
  const totalQty = (cartQty || 0) + d.qty;

  const select = {
    id: UserCart.id,
    productId: UserCart.productId,
    userId: UserCart.userId,
    qty: UserCart.qty,
    updatedAt: UserCart.updatedAt,
  };
  // If the product already exists in the cart, update the quantity
  if (cartQty) {
    const [updatedCartItem] = await db
      .update(UserCart)
      .set({
        qty: totalQty > productStock ? +d.qty : totalQty,
      })
      .where(
        and(eq(UserCart.productId, d.productId), eq(UserCart.userId, d.userId))
      )
      .returning(select);
    return updatedCartItem;
  }

  // If the product is not in the cart, insert a new cart item
  const [newCartItem] = await db.insert(UserCart).values(d).returning(select);
  return newCartItem; // Return the newly created cart item
};

export const getCartByIdOrProductId = async (id: string, userId: string) => {
  const [result] = await db
    .select({
      productId: UserCart.productId,
      qty: UserCart.qty,
    })
    .from(UserCart)
    .where(
      and(
        eq(UserCart.userId, userId),
        or(eq(UserCart.id, id), eq(UserCart.productId, id))
      )
    )
    .limit(1)
    .execute();
  return result; // Return the cart item matching the ID or product ID
};

export const removeCartItemByIdOrProductId = async (
  id: string,
  userId: string
) => {
  const [result] = await db
    .delete(UserCart)
    .where(
      and(
        eq(UserCart.userId, userId),
        or(eq(UserCart.id, id), eq(UserCart.productId, id))
      )
    )
    .returning();

  return result; // Return the removed cart item
};

export const updateCartItemQuantity = async (
  id: string,
  userId: string,
  qty: number
) => {
  const [result] = await db
    .update(UserCart)
    .set({ qty })
    .where(and(eq(UserCart.userId, userId), eq(UserCart.id, id)))
    .returning();
  return result; // Return the updated cart item
};
export const getAllCartProducts = async (
  userId: string,
  paginationParams: PaginationParams & {
    sortBy?: keyof typeof UserCart;
    noLimit?: boolean;
  }
) => {
  const {
    limit = 10, // Default limit if not provided
    offset = 0,
    priceFilter,
    sortBy = "createdAt",
    noLimit = false, // Additional param for checking if limit should be ignored
  } = paginationParams;

  // Build the where clause with optional filters
  const whereClause = and(
    eq(UserCart.userId, userId), // Filter by userId in the cart
    priceFilter ? lte(products.price, priceFilter.toString()) : undefined
  );

  let query = db
    .select({
      cartId: UserCart.id,
      productId: UserCart.productId,
      qty: UserCart.qty,
      updatedAt: UserCart.updatedAt,
      name: products.name,
      description: products.description,
      category: products.categoryName,
      price: products.price,
      discountedPrice: products.discountedPrice,
      primaryImage: products.primaryImage,
      stock: products.stock,
      total:
        sql`COALESCE(${UserCart.qty} * ${products.discountedPrice}, ${UserCart.qty} * ${products.price})`.as(
          "total"
        ),
      subtotal:
        sql`SUM(COALESCE(${UserCart.qty} * ${products.discountedPrice}, ${UserCart.qty} * ${products.price})) OVER ()`.as(
          "subtotal"
        ),
    })
    .from(UserCart)
    .innerJoin(products, eq(UserCart.productId, products.id))
    .where(whereClause)
    .offset(offset)
    .orderBy(desc((UserCart[sortBy] as any) || UserCart.updatedAt))
    .$dynamic();
  if (!noLimit) {
    query = query.limit(limit);
  }

  // Execute the query
  const cartProducts = await query;

  let totalCount = 0;

  if (noLimit) {
    const [totalCartProducts] = await db
      .select({ count: count() })
      .from(UserCart)
      .innerJoin(products, eq(UserCart.productId, products.id))
      .where(whereClause);
    totalCount = totalCartProducts.count;
  }

  const subtotal =
    cartProducts.length > 0 ? Number(cartProducts[0].subtotal) : 0;
  const formateCart = cartProducts.map((i) => ({
    ...i,
    qty: i.qty >= i.stock ? i.stock : i.qty,
    subtotal: undefined,
  }));

  return {
    subtotal,
    total: subtotal,
    products: formateCart,
    pagination: noLimit
      ? undefined
      : {
          total: totalCount,
          limit,
          offset,
        },
  };
};

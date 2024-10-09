import { Hono } from "hono";
import { verifyAuth } from "@/lib/utils/middlewareUtils";
import {
  createCartItem,
  getCartByIdOrProductId,
  removeCartItemByIdOrProductId,
  updateCartItemQuantity, // Optional: if you want to allow updating quantities
} from "@/controllers/user/cart"; // Ensure this points to your cart controller
import { zValidator } from "@hono/zod-validator";
import { cartRouteUtils } from "@/lib/utils/cartRouteUtils";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";

const cart = new Hono()
  .get(
    "/",
    async (c, next) => await verifyAuth(c, next, "Please login first."),
    async (c) => {
      const auth = c.get("authUser");
      const userId = auth?.token?.sub;
      if (!userId)
        throw new HTTPException(401, { message: "User not logged in" });

      const params = c.req.query();
      const cartProducts = await cartRouteUtils(params, userId,c);
      return c.json(cartProducts);
    }
  )
  .get("/:id", verifyAuth, async (c) => {
    const params = c.req.param("id") || "";
    const cartItem = await getCartByIdOrProductId(
      params,
      c.get("authUser").token?.sub!,c
    );
    if (cartItem) {
      return c.json(cartItem);
    }
    return c.json({ error: "Cart item not found" });
  })
  .post(
    "/",
    (c, next) => verifyAuth(c, next, "Please login first."),
    zValidator(
      "json",
      z.object({
        productId: z.string(),
        qty: z.number().positive(),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const data = c.req.valid("json");
      const res = await createCartItem({ ...data, userId: auth.token?.sub! },c);
      if ("error" in res) {
        throw new HTTPException(401, { message: res.error });
      }
      return c.json(res);
    }
  )
  .delete("/:id", verifyAuth, async (c) => {
    const params = c.req.param("id") || "";
    const cartItem = await removeCartItemByIdOrProductId(
      params,
      c.get("authUser").token?.sub!,c
    );
    if (cartItem) {
      return c.json(cartItem);
    }
    throw new HTTPException(401, { message: "Cart item not found" });
  })
  .put("/:cartId", verifyAuth, async (c) => {
    const params = c.req.param("cartId") || "";
    const { qty } = await c.req.json(); // Assuming the new quantity is passed in the request body
    const updatedItem = await updateCartItemQuantity(
      params,
      c.get("authUser").token?.sub!,
      qty,c
    );
    if (updatedItem) {
      return c.json(updatedItem);
    }
    throw new HTTPException(401, {
      message: "Failed to update cart item quantity",
    });
  });

export default cart;

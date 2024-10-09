import { Hono } from "hono";
import { verifyAuth } from "@/lib/utils/middlewareUtils";
import {
  createWishlist,
  getWishlistByIdOrProductId,
  removeWishListByIdOrProductId,
} from "@/controllers/user/wishlists";
const wishlist = new Hono()

  .get("/:id", verifyAuth, async (c) => {
    const params = c.req.param("id") || "";
    const wishlist = await getWishlistByIdOrProductId(
      params,
      c.get("authUser").token?.sub!, c
    );
    if (wishlist) {
      return c.json(wishlist);
    }
    return c.json({ error: "Wishlist not found" });
  })
  .post(
    "/",
    (c, next) => verifyAuth(c, next, "Please login first."),
    async (c, nex) => {
      const auth = c.get("authUser");
      const data = await c.req.json();
      const res = await createWishlist({ ...data, userId: auth.token?.sub },c);
      if ("error" in res) {
        return c.json(res, 400);
      }
      return c.json(res);
    }
  )
  .delete("/:id", verifyAuth, async (c) => {
    const params = c.req.param("id") || "";
    const wishlist = await removeWishListByIdOrProductId(
      params,
      c.get("authUser").token?.sub!,c
    );
    if (wishlist) {
      return c.json(wishlist);
    }
    return c.json({ error: "Wishlist not found" });
  });
export default wishlist;

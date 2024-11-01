import { createPaymentIntent } from "@/controllers/payments";
import { createTempOrder } from "@/controllers/tempOrders";
import { db } from "@/db/db";
import { tempOrders, tempOrderItems, address, users } from "@/db/schema";
import { verifyAuth } from "@/lib/utils/middlewareUtils";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import Stripe from "stripe";

const tempOrdersRoute = new Hono().post("/create", verifyAuth, async (c) => {
  const data = await c.req.json(); // { shippingId, clientSecret, shippingMethodId }
  const auth = c.get("authUser");
  const userId = auth?.token?.sub!;

  const res = await createTempOrder(userId, data);

  if (res.error) {
    throw new HTTPException(400, { message: res.error });
  }

  return c.json(res);

});

export default tempOrdersRoute;

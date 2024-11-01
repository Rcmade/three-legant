import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { addressSchema } from "@/zodSchema";
import { verifyAuth } from "@/lib/utils/middlewareUtils";
import { HTTPException } from "hono/http-exception";
import { createPaymentIntent } from "@/controllers/payments";
import { z } from "zod";
import { paymentIntentRequest } from "@/zodSchema/paymentSchema";

const paymentsRoute = new Hono().post(
  "/payment-intent",
  (c, next) => verifyAuth(c, next, "Please login first."),
  zValidator("json", paymentIntentRequest),
  async (c) => {
    const auth = c.get("authUser");
    const userId = auth?.token?.sub!;
    if (!userId) throw new HTTPException(401, { message: "UnAuthorized" });

    const data = c.req.valid("json");

    const intent = await createPaymentIntent(userId, data);

    if (!intent)
      throw new HTTPException(400, {
        message: "Failed to create payment intent",
      });

    return c.json(intent);
  }
);

export default paymentsRoute;

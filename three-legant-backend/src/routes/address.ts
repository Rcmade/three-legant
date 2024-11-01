import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { address } from "@/db/schema";
import { addressSchema } from "@/zodSchema";
import { verifyAuth } from "@/lib/utils/middlewareUtils";
import { HTTPException } from "hono/http-exception";
import { db } from "@/db/db";
import { upsertAddress } from "@/controllers/user/upsertAddress";
import { asc, desc, eq } from "drizzle-orm";
import { getAddresses } from "@/controllers/address";

const addressRoute = new Hono()
  .post(
    "/delivery-address",
    (c, next) => verifyAuth(c, next, "Please login first."),
    zValidator("json", addressSchema),
    async (c) => {
      const data = c.req.valid("json");
      const auth = c.get("authUser");
      const userId = auth?.token?.sub!;
      if (!userId) throw new HTTPException(401, { message: "UnAuthorized" });
      const upsert = await upsertAddress(data, userId);
      return c.json(upsert);
    }
  )
  .get(
    "/addresses",
    (c, next) => verifyAuth(c, next, "Please login first."),
    async (c) => {
      const auth = c.get("authUser");
      const { isLatest } = c.req.query();

      const userId = auth?.token?.sub!;
      if (!userId) throw new HTTPException(401, { message: "UnAuthorized" });

      const addresses = await getAddresses(userId, !!isLatest);
    
      return c.json(addresses);
    }
  );

export default addressRoute;

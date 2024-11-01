import { getOrderBySecret } from "@/controllers/orders";
import {
  getUserOrderById,
  getUserOrders,
} from "@/controllers/orders/userOrders";
import { verifyAuth } from "@/lib/utils/middlewareUtils";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const orders = new Hono()
  .get("/order-completed", async (c) => {
    const { paymentSecret } = c.req.query();
    const res = await getOrderBySecret(paymentSecret);
    if (!paymentSecret) {
      throw new HTTPException(400, { message: "Payment ID is missing" });
    }
    if (!res) {
      throw new HTTPException(400, {
        message: '"No order found with the provided payment ID"',
      });
    }
    return c.json(res);
  })
  .get("/", verifyAuth, async (c) => {
    const auth = c.get("authUser");
    const params = c.req.query();
    const userId = auth?.token?.sub;

    if (!userId)
      throw new HTTPException(401, { message: "User not logged in" });

    const orders = await getUserOrders(
      {
        limit: 10,
        page: 0,
        priceFilter: +params.priceFilter,
        search: params.search,
        sortBy: params.sortBy as any,
      },
      userId!
    );

    return c.json(orders);
    // if (!userId) {
    //   return c.json(null);
    // }

    // const userInfo = await userBasicInfo(userId);
    // return c.json(userInfo);
  })
  .get("/id/:orderId", verifyAuth, async (c) => {
    const auth = c.get("authUser");
    const orderId = c.req.param("orderId");
    const userId = auth?.token?.sub!;
    if (!orderId || !userId) {
      throw new HTTPException(400, {
        message: "Order ID and User Id is missing",
      });
    }

    const order = await getUserOrderById(orderId, userId!);

    if (!order) {
      throw new HTTPException(404, { message: "Order not found" });
    }

    return c.json(order);
  });

export default orders;

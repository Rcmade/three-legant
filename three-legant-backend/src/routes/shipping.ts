import { Hono } from "hono";
import {
  getShippingAddress,
  getShippingAddresses,
} from "@/controllers/shipping";

const shippings = new Hono()
  .get("/get-shipping-addresses/:id", async (c) => {
    const id = c.req.param("id") || "";
    const shippingAddress = await getShippingAddress(id);
    return c.json(shippingAddress);
  })
  .get("/get-shipping-addresses", async (c) => {
    const shippingsAddresses = await getShippingAddresses();
    return c.json(shippingsAddresses);
  });
export default shippings;

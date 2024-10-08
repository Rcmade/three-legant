import { Hono } from "hono";
import { getBannersByType } from "@/controllers/banners/get-banner";

const banner = new Hono().get("/:type", async (c) => {
  const params = c.req.param("type") || "";
  const banners = await getBannersByType(params);
  return c.json(banners);
});

export default banner;

import { getCategories } from "@/controllers/categories";
import { Hono } from "hono";

const category = new Hono().get("/", async (c) => {
  const params = c.req.query();
  const categories = await getCategories({
    limit: 10,
    page: 1,
    priceFilter: +params.priceFilter,
    search: params.search,
    sortBy: params.sortBy as any,
  });
  return c.json(categories);
});
export default category;

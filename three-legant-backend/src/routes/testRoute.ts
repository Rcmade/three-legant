import { Hono } from "hono";

const testRoute = new Hono().get("/", (c) => {
  const auth = c.get("authUser");
  return c.json(auth);
});
export default testRoute;

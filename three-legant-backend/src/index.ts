import { serve } from "@hono/node-server";
import { Context, Hono } from "hono";
import { logger } from "hono/logger";
import "dotenv/config";
import product from "@/routes/product";
import banner from "@/routes/banners";
import testRoute from "@/routes/testRoute";
import wishlist from "@/routes/wishlist";
import user from "@/routes/user";
import cart from "@/routes/cart";
import { cors } from "hono/cors";
import { initAuthConfig, type AuthConfig } from "@hono/auth-js";
import orders from "./routes/orders";
import addressRoute from "./routes/address";
import shippings from "./routes/shipping";
import paymentsRoute from "./routes/payments";
import webhooks from "./routes/webhooks";
import tempOrders from "./routes/tempOrder";
import category from "./routes/category";
import adminProducts from "./routes/admin/products";

const app = new Hono();

app.use(logger());

app.use("*", initAuthConfig(getAuthConfig));

const port = Number(process.env.PORT || 3000);

console.log(`Server is running on  http://localhost:${port}`);

app.use(
  "/*",
  cors({
    origin: [
      "https://three-legant.vercel.app",
      "http://localhost:3000",
      "https://three-legant.vercel.app",
    ],
    // allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["POST", "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    // exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  })
);
// app.use("/api/wishlist/*",                                                                                                   );
export const routes = app
  .route("/test", testRoute)
  .route("/api/user", user)
  .route("/api/cart", cart)
  .route("/api/address", addressRoute)
  .route("/api/shipping", shippings)
  .route("/api/payments", paymentsRoute)
  .route("/api/category", category)
  .route("/api/wishlist", wishlist)
  .route("/api/products", product)
  .route("/api/admin/products", adminProducts)
  .route("/api/orders", orders)
  .route("/api/temp-orders", tempOrders)
  .route("/api/webhooks", webhooks)
  .route("/api/banners", banner);
;
export type AppType = typeof routes;

function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    providers: [],
  };
}

serve({
  fetch: routes.fetch,
  port,
});

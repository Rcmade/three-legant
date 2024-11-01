import { zValidator } from "@hono/zod-validator";
import { upsertUser } from "@/controllers/user/upsertUser";
import { Hono } from "hono";
import { verifyAuth } from "@/lib/utils/middlewareUtils";
import { userBasicInfo } from "@/controllers/user/userBasicInfo";

const user = new Hono()
  .post(
    "/",
    //  zValidator("json", upsertUserSchema),
    async (c) => {
      const data = await c.req.json();
      const userInfo = await upsertUser(data);
      return c.json(userInfo);
    }
  )
  .get("/user-basic-info", verifyAuth, async (c) => {
    const auth = c.get("authUser");
    const userId = auth?.token?.sub;

    if (!userId) {
      return c.json(null);
    }

    const userInfo = await userBasicInfo(userId);
    return c.json(userInfo);
  });
// .post("/", (c) => c.json({ a: "create a book" }, 201))
// .get("/:id", (c) => c.json(`get ${c.req.param("id")}`));

export default user;

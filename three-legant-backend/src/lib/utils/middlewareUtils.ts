import { Context } from "hono";
import { type Next } from "hono";
import { getAuthUser } from "./authUtils";


export const verifyAuth = async (
  c: Context,
  next: Next,
  unAuthorizedMessage?: string
) => {
  const authUser = await getAuthUser(c);
  const isAuth = !!authUser?.token || !!authUser?.user;
  if (!isAuth) {
    return Response.json(
      { error: unAuthorizedMessage || "Un Authorized Access" },
      {
        status: 401,
      }
    );
  } else {
    if (authUser.session && authUser.session.user) {
      authUser.session.user.id = authUser.token?.sub;
    }
    c.set("authUser", authUser);
  }
  await next();
};

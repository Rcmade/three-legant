import { db } from "@/db/db";
import { users } from "@/db/schema";
import { UpsertUserT } from "@/types";
import { Context } from "hono";

export const upsertUser = async (user: UpsertUserT, c: Context) => {
  const formateUser = {
    email: user.email!,
    name: user.name!,
    image: user.image!,
  };
  const [upsertUserDb] = await db(c)
    .insert(users)
    .values(formateUser)
    .onConflictDoUpdate({
      target: users.email,
      set: formateUser,
    })
    .returning();

  return upsertUserDb;
};

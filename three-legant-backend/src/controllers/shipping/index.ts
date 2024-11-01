import { db } from "@/db/db";
import { shippingAddress } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export const getShippingAddresses = async () => {
  const addresses = await db
    .select({
      title: shippingAddress.title,
      id: shippingAddress.id,
      cost: shippingAddress.shippingCost,
    })
    .from(shippingAddress)
    .orderBy(asc(shippingAddress.shippingCost))
    .execute();
  return addresses;
};

export const getShippingAddress = async (id: string) => {
  const address = await db
    .select({
      title: shippingAddress.title,
      id: shippingAddress.id,
      cost: shippingAddress.shippingCost,
    })
    .from(shippingAddress)
    .where(eq(shippingAddress.id, id))
    .execute();
  return address[0];
};

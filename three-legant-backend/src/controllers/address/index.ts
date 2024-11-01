import { db } from "@/db/db";
import { address } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export const getAddresses = async (userId: string, isLatest = false) => {
  const addresses = db
    .select({
      id: address.id,
      email: address.email,
      phone: address.phone,
      street: address.street,
      country: address.country,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      firstName: address.firstName,
      lastName: address.lastName,
    })
    .from(address)
    .where(eq(address.userId, userId))
    .orderBy(asc(address.updatedAt))
    .$dynamic();

  if (isLatest) {
    const addressList = await addresses.limit(1).execute();
    return addressList;
  }

  const addressList = await addresses.execute();
  return addressList;
};

export const getUserAddressById = async (userId: string) => {
  const [addressList] = await db
    .select({
      id: address.id,
      email: address.email,
      phone: address.phone,
      street: address.street,
      country: address.country,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      firstName: address.firstName,
      lastName: address.lastName,
    })
    .from(address)
    .where(eq(address.userId, userId))
    .execute();
  return addressList;
};

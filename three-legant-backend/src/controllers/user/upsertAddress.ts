import { db } from "@/db/db";
import { address } from "@/db/schema";
import { AddressSchemaT } from "@/types";

export const upsertAddress = async (data: AddressSchemaT, userId: string) => {
  const [upsert] = await db
    .insert(address)
    .values({
      ...data,
      userId,
    })
    .onConflictDoUpdate({
      target: address.id,
      set: data,
    })
    .returning({
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
    });

  return upsert;
};

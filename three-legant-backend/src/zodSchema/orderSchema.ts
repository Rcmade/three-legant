import { address, orderItems } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const _orderItemsSchema = createSelectSchema(orderItems);

export const _orderAddressSchema = createSelectSchema(address);

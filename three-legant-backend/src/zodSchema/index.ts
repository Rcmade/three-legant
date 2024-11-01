import { address } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";

export const addressSchema = createInsertSchema(address).omit({
  userId: true,
  createdAt: true,
  updatedAt: true,
});

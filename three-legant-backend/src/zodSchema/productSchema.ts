import { createInsertSchema } from "drizzle-zod";
import { products } from "@/db/schema";

export const insertProductSchema = createInsertSchema(products);

import { createInsertSchema } from "drizzle-zod";
import { products } from "@/db/schema";


const insertProductSchema = createInsertSchema(products);

export default insertProductSchema;

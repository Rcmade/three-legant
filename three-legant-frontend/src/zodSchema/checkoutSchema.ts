import { addressSchema } from "@/zodSchema/addressSchema";
import { z } from "zod";
import { contactSchema } from "./contactInfoSchema";

export const checkoutSchema = z.object({
  ...contactSchema,
  ...addressSchema,
  id: z.string().optional(),
});

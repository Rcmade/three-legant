import { z } from "zod";

export const cartInput = z.object({
  userId: z.string(),
  productId: z.string(),
  qty: z.number().min(1),
});

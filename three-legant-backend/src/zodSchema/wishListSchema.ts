import { z } from "zod";

export const wishlistInput = z.object({
  productId: z.string().min(1).max(255),
  userId: z.string().min(1).max(255),
});

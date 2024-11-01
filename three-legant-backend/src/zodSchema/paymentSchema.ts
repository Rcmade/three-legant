import { z } from "zod";

export const paymentIntentRequest = z.object({
  shippingMethodId: z.string().min(1),
  clientSecret: z.string().optional(),
});

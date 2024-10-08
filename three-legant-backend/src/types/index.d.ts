import { cartInput } from "@/zodSchema/cartSchema";
import { upsertUserSchema } from "@/zodSchema/userInfoSchema";
import { wishlistInput } from "@/zodSchema/wishListSchema";
import { z } from "zod";

export type UploadFileT = {
  public_id: string;
  secure_url: string;
};

export type PaginationParams = {
  limit?: number;
  offset?: number;
  search?: string;
  priceFilter?: number;
};

export type SubImage = {
  image: string | null;
};

export type UpsertUserT = z.infer<typeof upsertUserSchema>;
export type WishlistInputT = z.infer<typeof wishlistInput>;
export type CartInputT = z.infer<typeof cartInput>;

import { orderItems } from "@/db/schema";
import { addressSchema } from "@/zodSchema";
import { cartInput } from "@/zodSchema/cartSchema";
import {
  _orderAddressSchema,
  _orderItemsSchema,
} from "@/zodSchema/orderSchema";
import { paymentIntentRequest } from "@/zodSchema/paymentSchema";
import { upsertUserSchema, userSchema } from "@/zodSchema/userInfoSchema";
import { wishlistInput } from "@/zodSchema/wishListSchema";
import { z } from "zod";
import {} from "drizzle-orm";
export type UploadFileT = {
  public_id: string;
  secure_url: string;
};

export type PaginationParams = {
  limit?: number;
  page?: number;
  search?: string;
  priceFilter?: number;
};

export type SubImage = {
  image: string | null;
};

export type GetOrderItemsT = z.infer<typeof _orderItemsSchema>;
export type UpsertUserT = z.infer<typeof upsertUserSchema>;
export type WishlistInputT = z.infer<typeof wishlistInput>;
export type CartInputT = z.infer<typeof cartInput>;
export type AddressSchemaT = z.infer<typeof addressSchema>;
export type PaymentIntentRequestT = z.infer<typeof paymentIntentRequest>;
export type GetOrderAddressT = z.infer<typeof _orderAddressSchema>;
export type UserRole = z.infer<typeof userSchema>["role"];
export type TempOrderRequestT = {
  shippingId: string;
  clientSecret: string;
  shippingMethodId: string;
};

export type OrderItemsT = {
  orderItemId: string;
  productId: string;
  name: string;
  qty: number;
  price: string;
  primaryImage: string;
};

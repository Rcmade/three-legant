import { alertVariants } from "@/components/ui/alert";
import {
  cartBreadcrumb,
  checkoutBreadcrumb,
  checkoutDetailsBreadcrumb,
  orderComplete,
} from "@/content/checkoutContent";
import { companyValueIconContent } from "@/content/companyValueContent";
import {
  addressFormSchema,
  addressSchema,
  userAddressSchema,
} from "@/zodSchema/addressSchema";
import { contactInfoSchema } from "@/zodSchema/contactInfoSchema";
import { userInfoSchema } from "@/zodSchema/userInfoSchema";
import { VariantProps } from "class-variance-authority";
import { z } from "zod";
import { ProductDetailsResponseT } from "./apiResponse";
import { checkoutSchema } from "@/zodSchema/checkoutSchema";
import productSchema from "@/zodSchema/productSchema";
export type AlertVarientT = VariantProps<typeof alertVariants>["variant"];

export type PageProps = {
  params: { [key: string]: string };
  searchParams: SearchParams;
};

export type SearchParams = {
  [key: string]: string;
};

export type Children = {
  children: React.ReactNode;
};

export type CategoryCardProps = { title: string; href: string; src: string };

export type CompanyValueT = {
  Icon: keyof typeof companyValueIconContent;
  title: string;
  sortDesc: string;
};

export type CheckOutBreadcrumb =
  (typeof checkoutBreadcrumb)[keyof typeof checkoutBreadcrumb];

export type ContactInfoT = z.infer<typeof contactInfoSchema>;
export type AddressInfoT = z.infer<typeof addressFormSchema>;
export type UserInfoSChema = z.infer<typeof userInfoSchema>;
export type CheckoutSchemaT = z.infer<typeof checkoutSchema>;
export type UserAddressSchemaT = z.infer<typeof userAddressSchema>;
export type ProductSchemaT = z.infer<typeof productSchema>;

export type ChangeProductQtyProps = {
  id: string;
  stock: number; //max stock
  cartItemQty: number; //current cart qty
};

export type PaginationParams = {
  limit?: number;
  page?: number;
  search?: string;
};

export type RevalidationType = "tag" | "path";

export type ProductCommonAdditionalInfoT = ProductDetailsResponseT["product"];

export type HandleAddToCartT = {
  productId: string;
  qty: string | number;
  authorization: string;
};

export type CheckoutPageCurrentFormT =
  | "contactInfo"
  | "payment"
  | "shippingMethod";

import { alertVariants } from "@/components/ui/alert";
import {
  cartBreadcrumb,
  checkoutBreadcrumb,
  checkoutDetailsBreadcrumb,
  orderComplete,
} from "@/content/checkoutContent";
import { companyValueIconContent } from "@/content/companyValueContent";
import { addressSchema } from "@/zodSchema/addressSchema";
import { contactInfoSchema } from "@/zodSchema/contactInfoSchema";
import { userInfoSchema } from "@/zodSchema/userInfoSchema";
import { VariantProps } from "class-variance-authority";
import { z } from "zod";
export type AlertVarientT = VariantProps<typeof alertVariants>["variant"];

export type PageProps = {
  params: { [key: string]: string };
  searchParams: SearchParams;
};

export type SearchParams = {
  [key: string]: string | number | boolean;
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
export type AddressInfoT = z.infer<typeof addressSchema>;
export type UserInfoSChema = z.infer<typeof userInfoSchema>;

export type ChangeProductQtyProps = {
  id: string;
  stock: number; //max stock
  cartItemQty: number; //current cart qty
};

export type PaginationParams = {
  limit?: number;
  offset?: number;
  search?: string;
};

export type RevalidationType = "tag" | "path";

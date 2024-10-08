import { ZodParsedType } from "zod";

export type BannerResponseT = {
  id: string;
  imageUrl: string;
  href: string;
  title: string;
}[];

export type BannerRequestT = { type: string };

export type CartsResponseT = {
  subtotal: number;
  total: number;
  products: {
    qty: number;
    cartId: string;
    productId: string;
    updatedAt: string;
    name: string;
    description: string | null;
    category: string | null;
    price: string;
    discountedPrice: string | null;
    primaryImage: string;
    stock: number;
    total: never;
  }[];
  pagination: { total: number; limit: number; offset: number } | undefined;
};

export type CartByIdResponseT =
  | { productId: string; qty: number }
  | { error: string };

export type CartByIdRequestT = { id: string };

export type AddCartResponseT = {
  id: string;
  updatedAt: string;
  userId: string;
  productId: string;
  qty: number;
};

export type AddCartRequestT = { productId: string; qty: number };

export type DeleteCartResponseT = {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  productId: string;
  qty: number;
};

export type DeleteCartRequestT = { id: string };

export type UpdateCartResponseT = {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  productId: string;
  qty: number;
};

export type UpdateCartRequestT = { cartId: string };

export type NewArrivalResponseT = {
  id: string;
  name: string;
  price: string;
  discountedPrice: string | null;
  primaryImage: string;
  stock: number;
  brand: string | null;
  categoryName: string;
}[];

export type ProductResponseT = {
  products: {
    name: string;
    id: string;
    brand: string | null;
    createdAt: string;
    updatedAt: string;
    userId: string;
    description: string | null;
    sku: string;
    rating: string | null;
    categoryId: string | null;
    categoryName: string | null;
    isAvailable: boolean | null;
    currentVariantType: string | null;
    variantValue: string | null;
    parentId: string | null;
    primaryImage: string;
    stock: number;
    price: string;
    discountedPrice: string | null;
    sortDescription: string;
    meta: never;
  }[];
  pagination: { total: number; limit: number; offset: number };
};

export type ProductDetailsResponseT = {
  product: {
    subImages: { image: string | null }[];
    id: string;
    name: string;
    sortDescription: string;
    description: string | null;
    sku: string;
    price: string;
    rating: string | null;
    discountedPrice: string | null;
    currentVariantType: string | null;
    currentVariantValue: string | null;
    category: string | null;
    stock: number;
    primaryImage: string;
    brand: string | null;
    meta: never;
    isAvailable: boolean | null;
  };
  variants: ({
    name: string;
    id: string;
    variantValue: string | null;
    primaryImage: string;
    stock: number;
    price: string;
    discountedPrice: string | null;
  } | null)[];
};

export type UpsertUserResponseT = {
  email: string;
  name: string;
  image: string | null;
  id: string;
  role: "ADMIN" | "USER" | "SELLER";
  phone: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UserBasicInfoResponseT = { cartCount: number } | null;

export type WishListByIdResponse = { productId: string } | { error: string };

export type WishListByIdRequest = { id: string };

export type AddWishListResponse =
  | { error: string }
  | { id: string; createdAt: string; userId: string; productId: string };

export type DeleteWishListResponse = { id: string };


// Do not change anything here. 
// This file is generated by the 'bun gen-types' command in the backend folder.

import { ZodParsedType } from "zod";

export type BannerResponseT = { id: string; imageUrl: string; href: string; title: string; }[];



export type BannerRequestT = { type: string; };



export type CartsResponseT = { subtotal: number; total: number; products: { qty: number; cartId: string; productId: string; updatedAt: string; name: string; description: string | null; category: string | null; price: string; discountedPrice: string | null; primaryImage: string; stock: number; total: never; }[]; pagination: { total: number; limit: number; page: number; } | undefined; };



export type CartByIdResponseT = { productId: string; qty: number; } | { error: string; };



export type CartByIdRequestT = { id: string; };



export type AddCartResponseT = { id: string; updatedAt: string; userId: string; productId: string; qty: number; };



export type AddCartRequestT = { productId: string; qty: number; };



export type DeleteCartResponseT = { id: string; createdAt: string; updatedAt: string; userId: string; productId: string; qty: number; };



export type DeleteCartRequestT = { id: string; };



export type UpdateCartResponseT = { id: string; createdAt: string; updatedAt: string; userId: string; productId: string; qty: number; };



export type UpdateCartRequestT = { cartId: string; };



export type NewArrivalResponseT = { id: string; name: string; price: string; discountedPrice: string | null; primaryImage: string; stock: number; brand: string | null; categoryName: string | null; }[];



export type ProductResponseT = { products: { id: string; name: string; description: string | null; price: string; discountedPrice: string | null; primaryImage: string; stock: number; brand: string | null; categoryName: string | null; }[]; pagination: { total: number; limit: number; page: number; }; };



export type AdminProductResponseT = { products: { id: string; name: string; description: string | null; price: string; discountedPrice: string | null; primaryImage: string; stock: number; brand: string | null; categoryName: string | null; }[]; pagination: { total: number; limit: number; page: number; }; };



export type ProductDetailsResponseT = { product: { subImages: { image: string | null; }[]; id: string; name: string; sortDescription: string; description: string | null; sku: string; price: string; rating: string | null; discountedPrice: string | null; currentVariantType: string | null; currentVariantValue: string | null; category: string | null; stock: number; primaryImage: string; brand: string | null; meta: never; isAvailable: boolean | null; }; variants: ({ name: string; id: string; sku: string; variantValue: string | null; primaryImage: string; stock: number; price: string; discountedPrice: string | null; } | null)[]; };



export type AdminProductDetailsResponseT = { product: { subImages: { image: string | null; }[]; id: string; name: string; sortDescription: string; description: string | null; sku: string; price: string; rating: string | null; discountedPrice: string | null; currentVariantType: string | null; currentVariantValue: string | null; category: string | null; stock: number; primaryImage: string; brand: string | null; meta: never; isAvailable: boolean | null; }; variants: ({ name: string; id: string; sku: string; variantValue: string | null; primaryImage: string; stock: number; price: string; discountedPrice: string | null; } | null)[]; };



export type UpsertUserResponseT = { email: string; name: string; image: string | null; id: string; role: "ADMIN" | "USER" | "SELLER"; phone: string | null; createdAt: string; updatedAt: string; };



export type UserBasicInfoResponseT = { cartCount: number; } | null;



export type WishListByIdResponse = { productId: string; } | { error: string; };



export type WishListByIdRequest = { id: string; };



export type AddWishListResponse = { error: string; } | { id: string; createdAt: string; userId: string; productId: string; };



export type DeleteWishListResponse = { id: string; };



export type AddAddressRequestT = { email: string; phone: string; street: string; country: string; city: string; state: string; zipCode: string; firstName: string; lastName: string; id?: string | undefined; };



export type AddAddressResponseT = { email: string; id: string; phone: string; street: string; country: string; city: string; state: string; zipCode: string; firstName: string; lastName: string; };



export type GetAddressResponseT = { id: string; email: string; phone: string; street: string; country: string; city: string; state: string; zipCode: string; firstName: string; lastName: string; }[];



export type GetShippingMethodsResponseT = { title: string; id: string; cost: string; }[];



export type CreatePaymentIntentResponseT = { cart: { subtotal: number; total: number; products: { qty: number; cartId: string; productId: string; updatedAt: string; name: string; description: string | null; category: string | null; price: string; discountedPrice: string | null; primaryImage: string; stock: number; total: never; }[]; pagination: { total: number; limit: number; page: number; } | undefined; }; totalAmount: number; totalAmountInCents: number; clientSecret: null; id: null; } | { clientSecret: string | null; id: string; };



export type CreatePaymentIntentRequestT = { shippingMethodId: string; clientSecret?: string | undefined; };



export type CreateTempOrderResponseT = { error: string; } | { message: string; order: { id: string; }; };



export type GetOrderBySecretResponseT = { order: { id: string; createdAt: string; totalAmount: string; }; items: { primaryImage: string; qty: number; }[]; };



export type GetUserOrdersResponseT = { orders: { items: { orderItemId: string; productId: string; name: string; qty: number; price: string; primaryImage: string; }[]; id: string; createdAt: string; totalAmount: string; clientSecret: string; status: "paid" | "cancel" | "pending" | "failed"; }[]; pagination: { total: number; limit: number; page: number; }; };



export type GetOrderByIdResponseT = { orders: { items: { orderItemId: string; productId: string; name: string; qty: number; price: string; primaryImage: string; }[]; id: string; createdAt: string; totalAmount: string; clientSecret: string; status: "paid" | "cancel" | "pending" | "failed"; }; userShippingAddress: { email: string; id: string; phone: string; userId: string; street: string; country: string; city: string; state: string; zipCode: string; firstName: string; lastName: string; }; };



export type GetCategoriesResponseT = { categories: { id: string; name: string; description: string | null; createdAt: string; }[]; pagination: { total: number; limit: number; page: number; }; };




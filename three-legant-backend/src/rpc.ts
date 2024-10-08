import { AppType } from ".";
import { hc, InferResponseType, InferRequestType } from "hono/client";
const client = hc<AppType>("http://localhost:4000");

// Banner
export type BannerResponseT = InferResponseType<
  (typeof client.api.banners)[":type"]["$get"]
>;

export type BannerRequestT = InferRequestType<
  (typeof client.api.banners)[":type"]["$get"]
>["param"];

// Cart
export type CartsResponseT = InferResponseType<typeof client.api.cart.$get>;

export type CartByIdResponseT = InferResponseType<
  (typeof client.api.cart)[":id"]["$get"]
>;

export type CartByIdRequestT = InferRequestType<
  (typeof client.api.cart)[":id"]["$get"]
>["param"];

export type AddCartResponseT = InferResponseType<typeof client.api.cart.$post>;

export type AddCartRequestT = InferRequestType<
  typeof client.api.cart.$post
>["json"];

export type DeleteCartResponseT = InferResponseType<
  (typeof client.api.cart)[":id"]["$delete"]
>;

export type DeleteCartRequestT = InferRequestType<
  (typeof client.api.cart)[":id"]["$delete"]
>["param"];

export type UpdateCartResponseT = InferResponseType<
  (typeof client.api.cart)[":cartId"]["$put"]
>;

export type UpdateCartRequestT = InferRequestType<
  (typeof client.api.cart)[":cartId"]["$put"]
>["param"];

// products
export type NewArrivalResponseT = InferResponseType<
  (typeof client.api.products)["home-api"]["new-arrival"]["$get"]
>;

export type ProductResponseT = InferResponseType<
  typeof client.api.products.$get
>;

export type ProductDetailsResponseT = InferResponseType<
  (typeof client.api.products)["product-details"][":id"]["$get"]
>;

// user
export type UpsertUserResponseT = InferResponseType<
  typeof client.api.user.$post
>;

export type UserBasicInfoResponseT = InferResponseType<
  (typeof client.api.user)["user-basic-info"]["$get"]
>;

// wishlist
export type WishListByIdResponse = InferResponseType<
  (typeof client.api.wishlist)[":id"]["$get"]
>;

export type WishListByIdRequest = InferRequestType<
  (typeof client.api.wishlist)[":id"]["$get"]
>["param"];

export type AddWishListResponse = InferResponseType<
  typeof client.api.wishlist.$post
>;

export type DeleteWishListResponse = InferRequestType<
  (typeof client.api.wishlist)[":id"]["$delete"]
>["param"];

export type AddToCartResponseT = {
  productId: string;
  qty: number;
  userId?: string;
  id?: string;
  createdAt?: Date;
};

export type CartResponseT = {
  qty: any;
  subtotal: undefined;
  cartId: string;
  productId: string;
  updatedAt: Date;
  name: string;
  description: string | null;
  category: string | null;
  price: string;

  discountedPrice: string | null;
  primaryImage: string;
  stock: number;
  total: unknown;
};

export type CartPagingResponseT = {
  pagination:
    | {
        total: number;
        limit: number;
        offset: number;
      }
    | undefined;
};

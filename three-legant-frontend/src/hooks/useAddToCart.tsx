import { handleAddToCart } from "@/query/cart";
import { HandleAddToCartT } from "@/types";
import { AddCartResponseT } from "@/types/apiResponse";
import { create } from "zustand";
import { useAuthorization } from "./useAuthorization";

type UseAddToCartI = {
  createCart: (cartD: HandleAddToCartT) => Promise<AddCartResponseT | null>;
  isLoading: boolean;
};

// export const useAddToCart = create<UseAddToCartI>((set) => ({
//   isLoading: false,
//   createCart: async (cartD) => {

//     // const {} = useAuthorization()
//     set({ isLoading: true });
//     const data = await handleAddToCart(cartD);
//     if (data?.id) {
//       return data;
//     }

//     set({ isLoading: false });
//     return null;
//   },
// }));

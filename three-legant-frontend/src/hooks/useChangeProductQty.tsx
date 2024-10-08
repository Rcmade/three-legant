import { ChangeProductQtyProps } from "@/types";
import { create } from "zustand";

interface ProductState {
  productsQty: Record<string, number>; // A map to store quantities by product ID
  increaseQty: (data: ChangeProductQtyProps) => void;
  decreaseQty: (data: ChangeProductQtyProps) => void;
  setQty: (qty: number, data: ChangeProductQtyProps) => void;
}

const useChangeProductQty = create<ProductState>((set) => ({
  productsQty: {}, // Initialize with an empty object

  // Increase quantity of a specific product
  increaseQty: (data) =>
    set((state) => {
      const currentQty = state.productsQty[data.id] || data?.cartItemQty || 1;
      return {
        productsQty: {
          ...state.productsQty,
          [data.id]: Math.min(currentQty + 1, data.stock), // Respect stock limits
        },
      };
    }),

  // Decrease quantity of a specific product
  decreaseQty: (data) =>
    set((state) => {
      const currentQty = state.productsQty[data.id] || data?.cartItemQty || 1;
      return {
        productsQty: {
          ...state.productsQty,
          [data.id]: Math.max(currentQty - 1, 1), // Ensure qty does not go below 1
        },
      };
    }),

  // Set specific quantity for a product
  setQty: (qty, data) =>
    set((state) => {
      return {
        productsQty: {
          ...state.productsQty,
          [data.id]: Math.min(Math.max(qty, 1), data.stock), // Ensure qty is valid
        },
      };
    }),
}));

export { useChangeProductQty };

import { AddCartResponseT } from "@/types/apiResponse";
import { create } from "zustand";
import { persist } from "zustand/middleware"; // to persist the cart in local storage

// interface CartItem extends AddCartResponseT {}

type CartItem = AddCartResponseT;

interface CartState {
  currentCartItem: CartItem | null;
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  setCurrentCartItem: (item: CartItem | null) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      currentCartItem: null, // Store current cart item for the product details page
      cartItems: [], // Store cart items array

      // Add an item to the cart array
      addToCart: (item) => {
        const { cartItems } = get();
        const existingItem = cartItems.find(
          (cartItem) =>
            "productId" in cartItem &&
            "productId" in item &&
            cartItem?.productId === item?.productId,
        );

        if (existingItem) {
          // Update the quantity if the item already exists
          set({
            cartItems: cartItems.map((cartItem) =>
              "productId" in cartItem &&
              "productId" in item &&
              cartItem.productId === item.productId
                ? { ...cartItem, qty: cartItem.qty + item.qty }
                : cartItem,
            ),
            currentCartItem: {
              ...existingItem,
              qty:
                "qty" in existingItem && "qty" in item
                  ? existingItem.qty + item.qty
                  : 1,
            },
          });
        } else {
          // Add new item to the cart
          set({ cartItems: [...cartItems, item], currentCartItem: item });
        }
      },

      // Remove an item from the cart array
      removeFromCart: (productId) => {
        const { cartItems } = get();
        set({
          cartItems: cartItems.filter(
            (item) => "productId" in item && item.productId !== productId,
          ),
          currentCartItem: cartItems.length > 0 ? cartItems[0] : null, // Set the current cart item if there are still items in the cart
        });
      },

      // Set the current cart item for the product details page
      setCurrentCartItem: (item) => {
        set({ currentCartItem: item });
      },

      // Clear the entire cart
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage", // Key for local storage
      partialize: (state) => ({ cartItems: state.cartItems }), // Persist only the cart items array
    },
  ),
);

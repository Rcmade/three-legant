import { WishlistResponseT } from "@/types/apiTypes/wishlistTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware"; // to persist the wishlist in local storage

interface WishlistState {
  currentWishlistItem: WishlistResponseT | null;
  wishlist: WishlistResponseT[];
  addToWishlist: (item: WishlistResponseT) => void;
  removeFromWishlist: (productId: string) => void;
  setCurrentWishlistItem: (item: WishlistResponseT | null) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      currentWishlistItem: null, // Store current wishlist item for the product details page
      wishlist: [], // Store wishlist array for another page

      // Add an item to the wishlist array
      addToWishlist: (item) => {
        const { wishlist } = get();
        if (!wishlist.find((i) => i.productId === item.productId)) {
          set({ wishlist: [...wishlist, item] });
        }
      },

      // Remove an item from the wishlist array
      removeFromWishlist: (productId) => {
        const { wishlist } = get();
        set({
          wishlist: wishlist.filter((item) => item.productId !== productId),
        });
      },

      // Set the current wishlist item for the product details page
      setCurrentWishlistItem: (item) => {
        set({ currentWishlistItem: item });
      },

      // Clear the entire wishlist
      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: "wishlist-storage", // Key for local storage
      partialize: (state) => ({ wishlist: state.wishlist }), // Persist only the wishlist array
    },
  ),
);

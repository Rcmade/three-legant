import { create } from "zustand";

type UseCartSidebarI = {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
};

export const useCartSidebar = create<UseCartSidebarI>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

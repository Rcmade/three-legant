import { GetAddressResponseT } from "@/types/apiResponse";
import { create } from "zustand";

type UseEditAddressDialogT = {
  onOpen: (address?: GetAddressResponseT[number]) => void;
  onClose: () => void;
  address?: GetAddressResponseT[number];
  isOpen: boolean;
};

export const useEditAddressDialog = create<UseEditAddressDialogT>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false, address: undefined }),
  onOpen: (address) => set({ isOpen: true, address }),
}));

import { AlertVarientT } from "@/types";
import { GridSelectE } from "@/types/enum";
import { create } from "zustand";

interface GridSelectI {
  type?: GridSelectE;
  setGrid: (type: GridSelectE) => void;
}

export const useGridSelect = create<GridSelectI>((set) => ({
  setGrid: (type) => set({ type }),
}));

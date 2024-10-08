import { CartsResponseT } from "@/types/apiResponse";
import { create } from "zustand";

interface Test {
  data?: CartsResponseT;
  setCart: (cart: CartsResponseT) => void;
}

const useTest = (init: CartsResponseT) =>
  create<Test>((set) => ({
    data: init,
    setCart: (cart) => set({ data: init }),
  }));

export default useTest;

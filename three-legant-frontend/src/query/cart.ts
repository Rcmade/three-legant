import { addCartApi } from "@/constant/apiRoute";
import { getAxiosErrorMessage, getBackendUrl } from "@/lib/utils/stringUtils";
import { wait } from "@/lib/utils/testUtils";
import {
  AddCartRequestT,
  AddCartResponseT,
  CartsResponseT,
} from "@/types/apiResponse";
import axios from "axios";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export const addToCart = async (d: AddCartRequestT) => {
  try {
    const { data } = await axios.post<AddCartResponseT>(
      getBackendUrl(addCartApi),
      d,
      {
        withCredentials: true,
      },
    );

    return data;
  } catch (error) {
    throw getAxiosErrorMessage(error);
  }
};



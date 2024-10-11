import { addCartApi } from "@/constant/apiRoute";
import { getAxiosErrorMessage, getBackendUrl } from "@/lib/utils/stringUtils";
import {
  AddCartRequestT,
  AddCartResponseT,
  CartsResponseT,
} from "@/types/apiResponse";
import axios from "axios";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export const addToCart = async (d: AddCartRequestT) => {
  // console.log({d});
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



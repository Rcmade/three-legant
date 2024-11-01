import { addCartApi } from "@/constant/apiRoute";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import { HandleAddToCartT } from "@/types";
import { AddCartResponseT } from "@/types/apiResponse";
import axios from "axios";

export const handleAddToCart = async ({
  productId,
  qty,
  authorization,
}: HandleAddToCartT) => {
  try {
    const { data } = await axios.post<AddCartResponseT>(
      getBackendUrl(addCartApi),
      { productId, qty },
      {
        withCredentials: true,
        headers: {
          Authorization: authorization,
        },
      },
    );
    return data;
  } catch (error) {
    return null;
  }
};

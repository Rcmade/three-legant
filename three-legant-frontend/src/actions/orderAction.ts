import { getUserOrderByIdApi, getUserOrdersApi } from "@/constant/apiRoute";
import { fetcher } from "@/lib/utils/apiUtils";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import {
  GetOrderByIdResponseT,
  GetUserOrdersResponseT,
} from "@/types/apiResponse";
import { headers } from "next/headers";

export const getUserOrder = async (searchParams = "") => {
  try {
    const data: GetUserOrdersResponseT = await fetcher(
      `${getBackendUrl(getUserOrdersApi)}${searchParams}`,
      {
        headers: headers(),
        next: {
          revalidate: 60 * 5,
          tags: [getUserOrdersApi],
        },
      },
    );
    return data;
  } catch (error: any) {
    console.log({ error });
    return null;
  }
};

export const getUserOrderById = async (orderId: string) => {
  try {
    // BUG: This is a bug. The orderId should be checked if it is "user" when user hard reload orderId is "user"
    if (orderId === "user") return null;

    const data: GetOrderByIdResponseT = await fetcher(
      `${getBackendUrl(getUserOrderByIdApi)}/${orderId}`,
      {
        headers: headers(),
      },
    );
    return data;
  } catch (error: any) {
    console.log({ error });
    return null;
  }
};

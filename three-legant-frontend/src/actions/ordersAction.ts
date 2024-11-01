"use server";

import { getAddressesApi, getOrderBySecretApi } from "@/constant/apiRoute";
import { fetcher } from "@/lib/utils/apiUtils";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import { GetOrderBySecretResponseT } from "@/types/apiResponse";
import { headers } from "next/headers";

export const getOrderBySecret = async (
  payment_intent_client_secret: string,
) => {
  try {
    const data: GetOrderBySecretResponseT = await fetcher(
      `${getBackendUrl(getOrderBySecretApi)}?paymentSecret=${payment_intent_client_secret}`,
      {
        headers: headers(),
        next: {
          revalidate: 60 * 5,
          tags: [getAddressesApi],
        },
      },
    );
    return data;
  } catch (error: any) {
    return null;
  }
};

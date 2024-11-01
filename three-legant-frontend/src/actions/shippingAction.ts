"use server";

import { getAvailableShippingApi } from "@/constant/apiRoute";
import { fetcher } from "@/lib/utils/apiUtils";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import { GetShippingMethodsResponseT } from "@/types/apiResponse";

export const getAvailableShipping = async () => {
  try {
    const data: GetShippingMethodsResponseT = await fetcher(
      `${getBackendUrl(getAvailableShippingApi)}`,
      {
        next: {
          revalidate: 24 * 60 * 60,
          tags: [getAvailableShippingApi],
        },
      },
    );
    return data;
  } catch (error: any) {
    return [];
  }
};

export const getSelectedShipping = async (shippingId: string) => {
  try {
    const data: GetShippingMethodsResponseT[0] = await fetcher(
      `${getBackendUrl(getAvailableShippingApi)}/${shippingId}`,
      {
        next: {
          revalidate: 24 * 60 * 60,
          tags: [getAvailableShippingApi],
        },
      },
    );

    return data;
  } catch (error: any) {
    return null;
  }
};

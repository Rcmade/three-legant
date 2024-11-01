"use server";

import { getAddressesApi } from "@/constant/apiRoute";
import { fetcher } from "@/lib/utils/apiUtils";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import { GetAddressResponseT } from "@/types/apiResponse";
import { headers } from "next/headers";

export const getLatestAddress = async () => {
  try {
    const data: GetAddressResponseT = await fetcher(
      `${getBackendUrl(getAddressesApi)}?isLatest=true`,
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

export const getUserAddresses = async () => {
  try {
    const data: GetAddressResponseT = await fetcher(
      `${getBackendUrl(getAddressesApi)}`,
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
    return [];
  }
};

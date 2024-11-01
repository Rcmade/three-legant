"use server";

import { getAllCartProductApi } from "@/constant/apiRoute";
import { fetcher } from "@/lib/utils/apiUtils";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import { RevalidationType } from "@/types";
import { CartsResponseT } from "@/types/apiResponse";
import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";

export const getAllCart = async (searchParams: string = "") => {
  
  try {
    const data: CartsResponseT = await fetcher(
      `${getBackendUrl(getAllCartProductApi)}${searchParams}`,
      {
        headers: headers(),
        next: {
          revalidate: 60 * 5,
          tags: [getAllCartProductApi],
        },
      },
    );
    return data;
  } catch (error: any) {
    return 
    // throw getAxiosErrorMessage(error);
  }
};

export const revalidateAllCart = async (type: RevalidationType = "tag") => {
  if (type === "tag") {
    revalidateTag(getAllCartProductApi);
  } else {
    revalidatePath("/user/cart");
  }
};

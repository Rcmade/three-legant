import { PageProps } from "@/types";
import { currentUser } from "../currentUser";
import { getProductsAction } from "../productAction";
import { headers } from "next/headers";
import { getAdminProductsApi } from "@/constant/apiRoute";
import { AdminProductResponseT } from "@/types/apiResponse";

export const getAdminProduct = async ({ searchParams, params }: PageProps) => {
  const user = await currentUser();
  if (user?.role !== "ADMIN" && user?.role !== "SELLER") {
    return;
  }

  const products: AdminProductResponseT = await getProductsAction(
    {
      params,
      searchParams: { ...searchParams },
    },
    {
      headers: headers(),
    },
    getAdminProductsApi,
  );

  return products;
};

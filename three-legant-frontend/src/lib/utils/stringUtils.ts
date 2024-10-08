import { PageProps } from "@/types";
import axios from "axios";

export const createQueryString = (
  searchParams: PageProps["searchParams"],
  changeParams?: PageProps["searchParams"],
): string => {
  if (changeParams) {
    searchParams = { ...searchParams, ...changeParams };
  }
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      params.set(key, value.toString());
    }
  });

  if (params.toString() === "") {
    return "";
  }
  return `?${params.toString()}`;
};

export function isValidObjectId(id: string) {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(id);
}

export const stringParamToObj = (
  baseStr: string,
  changeStr?: { key: string; val: string },
) => {
  const searchParams = new URLSearchParams(baseStr);
  if (changeStr) {
    searchParams.set(changeStr.key, changeStr.val);
  }

  return `?${searchParams.toString()}`;
};

export const getBackendUrl = (apiRoute: string) => {
  return `${process.env.NEXT_PUBLIC_API_URL}${apiRoute?.startsWith("/") ? apiRoute : `/${apiRoute}`}`;
};

export function getAxiosErrorMessage(error: any): { error: string } {
  const isObj = typeof error.response?.data === "object";
  // Check if it's an Axios error
  if (axios.isAxiosError(error)) {
    const errStr = String(
      error.response?.data?.error ||
        error.response?.data?.message ||
        error.response?.data,
    );
    const err = {
      ...(isObj ? error.response?.data : {}),
      error: errStr === "undefined" ? undefined : errStr,
    };
    return err;
  }

  return {
    error: String(error?.error || "An error occurred"),
  };
}

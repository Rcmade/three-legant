import {
  adminProductDetailsApi,
  getProductsApi,
  productDetails,
} from "@/constant/apiRoute";
import { fetcher } from "@/lib/utils/apiUtils";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import { PageProps } from "@/types";
import { AdminProductDetailsResponseT, ProductDetailsResponseT, ProductResponseT } from "@/types/apiResponse";
import axios from "axios";

export const getProductsAction = async (
  { searchParams, params: pageParams }: PageProps,
  authorization: RequestInit = {},
  apiPath = getProductsApi,
) => {
  const {
    limit = "10", // Default limit if not provided
    page = "0", // Default page if not provided
    search = "", // Search keyword from query params
    sortBy = "createdAt", // Sorting field, default to createdAt
    priceFilter = "", // Optional price filter
  } = searchParams;
  const category = pageParams.category || ""; // Handle category if missing

  // Build query parameters
  const params = new URLSearchParams({
    limit,
    page,
    search,
    sortBy,
  });

  if (priceFilter) {
    params.append("priceFilter", priceFilter);
  }

  try {
    // Generate backend URL with query params and category
    const url = getBackendUrl(
      `${apiPath}?${params.toString()}&category=${encodeURIComponent(category)}`,
    );
    // Fetch product data from backend
    const response: ProductResponseT = await fetcher(url, {
      next: {
        revalidate: 0,
      },
      ...authorization,
    });

    return response; // Return the fetched response
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products. Please try again.");
  }
};

export const getProductDetails = async (
  productId: string,
  apiPath = productDetails,
) => {
  try {
    const { data } = await axios.get<ProductDetailsResponseT>(
      getBackendUrl(`${apiPath}/${productId}`),
    );
    if (data) {
      return data;
    }
    return null;
  } catch (error: any) {
    return null;
  }
};

export const getAdminProductDetails = async (
  productId: string,
  apiPath = adminProductDetailsApi,
) => {
  try {
    const { data } = await axios.get<AdminProductDetailsResponseT>(
      getBackendUrl(`${apiPath}/${productId}`),
    );
    if (data) {
      return data;
    }
    return null;
  } catch (error: any) {
    return null;
  }
};

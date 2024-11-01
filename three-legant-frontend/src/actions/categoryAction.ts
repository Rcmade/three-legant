import { getCategoriesApi } from "@/constant/apiRoute";
import { fetcher } from "@/lib/utils/apiUtils";
import { getAxiosErrorMessage, getBackendUrl } from "@/lib/utils/stringUtils";
import { GetCategoriesResponseT } from "@/types/apiResponse";

export const getCategories = async (searchParams: string) => {
  try {
    // Send a GET request to the categories API with search parameters
    const response = await fetcher(getBackendUrl(getCategoriesApi), {
      next: {
        revalidate: 60 * 60 * 24,
        tags: [getCategoriesApi],
      },
    });

    // console.log({ response });

    // Parse the JSON response
    const data: GetCategoriesResponseT = response;
    return {
      categories: data.categories,
      pagination: data.pagination,
    };
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    return {
      categories: [],
      pagination: { total: 0, limit: 10, page: 1 },
      error: getAxiosErrorMessage(error).error,
    };
  }
};

import { fetcher } from "@/lib/utils/apiUtils";
import useSWR from "swr";

// Custom hook for fetching authorization data
export const useAuthorization = () => {
  // Use SWR to fetch the Authorization data from the API
  const { data, ...rest } = useSWR<{ Authorization: string }>(
    "/api/session",
    fetcher,
    {
      revalidateOnFocus: false, // Disable revalidation when the page regains focus
      dedupingInterval: 300000, // Cache data for 5 minutes (300,000 ms)
    },
  );

  return {
    authorization: data?.Authorization || null,
    ...rest,
  };
};

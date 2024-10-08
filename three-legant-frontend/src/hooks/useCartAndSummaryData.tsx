import { getAllCartProductApi } from "@/constant/apiRoute";
import { CartsResponseT } from "@/types/apiResponse";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface UseCartAndSummaryDataProps {
  initialCartData?: CartsResponseT;
  queryOptions?: UseQueryOptions<CartsResponseT>;
}

const useCartAndSummaryData = ({
  initialCartData,
  queryOptions,
}: UseCartAndSummaryDataProps = {}) => {
  return useQuery<CartsResponseT>({
    queryKey: [getAllCartProductApi],
    initialData: initialCartData,
    ...queryOptions,
  });
};

export default useCartAndSummaryData;

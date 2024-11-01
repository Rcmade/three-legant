import { getAddressesApi } from "@/constant/apiRoute";
import { fetcher } from "@/lib/utils/apiUtils";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import { GetAddressResponseT } from "@/types/apiResponse";
import useSWR from "swr";
import { useAuthorization } from "./useAuthorization";

interface UseGetAddressesProps {
  isLatestOnly?: boolean;
  isFetch?: boolean;
}
const useGetAddresses = ({ isLatestOnly, isFetch }: UseGetAddressesProps) => {
  const { authorization } = useAuthorization();
  return useSWR<GetAddressResponseT>(
    isFetch &&
      (isLatestOnly
        ? `${getBackendUrl(getAddressesApi)}?isLatest=true`
        : getBackendUrl(getAddressesApi)),
    (url: string) => {
      return fetcher(url, {
        cache: "no-store",
        headers: {
          Authorization: authorization!,
        },
      });
    },
  );
};

export default useGetAddresses;

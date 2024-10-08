import { userBasicInfoApi } from "@/constant/apiRoute";
import { fetcher } from "@/lib/utils/apiUtils";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import { UserBasicInfoResponseT } from "@/types/apiResponse";

export const getUserBasicInfo = async () => {
  const res = await fetcher(getBackendUrl(userBasicInfoApi), {
    next: {
      revalidate: 60,
    },
  });
  const data: UserBasicInfoResponseT = await res.json();
  return data;
};

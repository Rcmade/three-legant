import React from "react";
import SingleCarousel from "./SingleCarousel";
import axios from "axios";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import { heroBannerApi } from "@/constant/apiRoute";
import { BannerResponseT } from "@/types/apiResponse";
const HeroCarousel = async () => {
  const getProductDetails = async () => {
    try {
      const { data } = await axios.get<BannerResponseT>(
        getBackendUrl(`${heroBannerApi}`),
      );
      return data || [];
    } catch (error) {
      return [];
    }
  };

  const data: BannerResponseT = await getProductDetails();

  return (
    <div className="mb-14">
      <SingleCarousel data={data} />
    </div>
  );
};

export default HeroCarousel;

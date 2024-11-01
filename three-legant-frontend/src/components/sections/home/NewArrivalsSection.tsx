import React from "react";
import ProductsWithHeadingSection from "@/components/sections/ProductsWithHeadingSection";
import ProductCard from "@/components/cards/ProductCard";
import axios from "axios";
import {
  getBackendUrl,
  getProductNavigateString,
} from "@/lib/utils/stringUtils";
import { newArrival } from "@/constant/apiRoute";
import { NewArrivalResponseT } from "@/types/apiResponse";

const NewArrivalsSection = async () => {
  const getNewArrival = async (): Promise<NewArrivalResponseT> => {
    try {
      const response = await axios.get(getBackendUrl(newArrival));
      return response.data;
    } catch (error) {
      return [];
    }
  };

  const data = await getNewArrival();
  return (
    data?.length > 0 && (
      <ProductsWithHeadingSection
        sectionTitle={{
          title: "New Arrivals",
          hrefTitle: "More Products",
          href: "/new arrivals",
        }}
      >
        {data?.map((product) => (
          <ProductCard
            key={product.id}
            productId={product.id}
            imageAlt="img"
            imageSrc={product.primaryImage}
            price={product.price}
            productName={product.name}
            title={"New"}
            discountedPrice={product.discountedPrice} // rating={product.rating}
            href={getProductNavigateString(
              product.categoryName || ":",
              product.id,
            )}
          />
        ))}
      </ProductsWithHeadingSection>
    )
  );
};

export default NewArrivalsSection;

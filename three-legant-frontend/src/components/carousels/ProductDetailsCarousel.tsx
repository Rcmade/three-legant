"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ProductDetailsResponseT } from "@/types/apiResponse";

interface ProductDetailsCarouselProps {
  className?: string;
  productImages?: ProductDetailsResponseT["product"]["subImages"]; // Allow undefined or null
  productVariants: ProductDetailsResponseT["variants"];
}

const ProductDetailsCarousel = ({
  className,
  productImages,
  productVariants,
}: ProductDetailsCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentVar, setCurrentVar] = useState(productImages);
  const searchParams = useSearchParams();

  const handleChangeVarient = (varStr: string) => {
    const selectVar = (productVariants || []).find((v) => v?.id === varStr);
    if (selectVar) {
      // setCurrentVar([
      //   { image: selectVar?.primaryImage },
      //   ...(selectVar?.variantImages || []),
      // ]);
    }
  };

  useEffect(() => {
    const searchStr = searchParams?.get("variant");
    if (searchStr) {
      handleChangeVarient(searchStr);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className={className}>
      <Carousel setApi={setApi} className="">
        <CarouselContent className="">
          {(currentVar || []).map(
            (i, index) =>
              i.image && (
                <CarouselItem
                  className="max-h-[32rem] min-h-[28rem] bg-accent pl-0"
                  key={i.image + index}
                >
                  <div className="flex min-h-full py-2 w-full items-center justify-center lg:min-w-96">
                    <Image
                      src={i.image}
                      width={400}
                      height={400}
                      className="max-h-[27rem] object-contain"
                      alt=""
                    />
                  </div>
                </CarouselItem>
              ),
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="scrollbar hidden flex-nowrap gap-6 overflow-x-auto py-6 md:flex">
        {(currentVar || []).map(
          (i, index) =>
            i.image && (
              <div
                onClick={() => api?.scrollTo(index)}
                key={i.image}
                className="flex h-44 min-w-40 max-w-44 cursor-pointer items-center justify-center bg-accent"
              >
                <Image
                  src={i.image}
                  width={130}
                  height={130}
                  className="max-h-full max-w-full object-contain"
                  alt=""
                />
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default ProductDetailsCarousel;

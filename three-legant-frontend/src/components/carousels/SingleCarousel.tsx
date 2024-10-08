"use client";
import React from "react";
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
import { cn } from "@/lib/utils";
import Link from "next/link";

import { BannerResponseT } from "@/types/apiResponse";

interface CarouselProps {
  data: BannerResponseT;
}
const SingleCarousel = ({ data }: CarouselProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div>
      <Carousel
        // plugins={[
        //   Autoplay({
        //     delay: 5000,
        //   }),
        // ]}
        setApi={setApi}
        opts={{
          loop: true,
        }}
        className="relative max-w-full"
      >
        <CarouselContent className="max-h-[30rem]">
          {data.map((i) => (
            <CarouselItem key={i.id} className="">
              <Card className="h-full border-none shadow-none">
                <CardContent className="relative flex max-h-full items-center justify-center overflow-y-hidden p-0">
                  <Link href={i.href} className="h-full w-full">
                    <Image
                      src={i.imageUrl}
                      alt={i?.title || "banner"}
                      width={1120}
                      height={536}
                      className="min-w-full object-contain"
                    />
                  </Link>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-24 hidden sm:flex sm:h-8 sm:w-8 md:h-12 md:w-12 lg:h-14 lg:w-14" />
        <CarouselNext className="mr-24 hidden sm:flex sm:h-8 sm:w-8 md:h-12 md:w-12 lg:h-14 lg:w-14" />
      </Carousel>
      <div className="relative -mt-8 flex justify-center gap-x-4 md:-mt-14">
        {Array.from({ length: (data || []).length }).map((_, index) => (
          <span
            onClick={() => {
              api?.scrollTo(index);
            }}
            key={index}
            className={cn(
              "h-2 w-2 cursor-pointer rounded-full bg-white md:h-3 md:w-3",
              current === index && "w-8 md:w-10",
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default SingleCarousel;

import ProductBreadcrumb from "@/components/breadcrumb/ProductBreadcrumb";
import GridSelectButton from "@/components/buttons/GridSelectButton";
import ProductCard from "@/components/cards/ProductCard";
import GridSelectLayout from "@/components/layout/GridSelectLayout";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ShopFilterSection from "@/components/sections/ShopFilterSection";
import ShopFilterSidebar from "@/components/sidebar/ShopFilterSidebar";
import { Children, PageProps } from "@/types";
const CategoryShopLayout = async ({ params, searchParams }: PageProps) => {
  const list = ["/shop"];
  params?.category
    ? list?.push(decodeURIComponent(`/shop/${params.category}`))
    : list;

  return (
    <div className="space-y-8">
      <div className="relative flex aspect-square items-center justify-center bg-[url(/images/banner/ShopSm.png)] bg-cover bg-right bg-no-repeat sm:aspect-[1120/392] sm:bg-[url(/images/banner/ShopBanner.png)]">
        <div className="flex flex-col items-center justify-center gap-4">
          <ProductBreadcrumb baseUrl="/" list={list} />
          <h1 className="text-2xl font-medium sm:text-5xl">Shop Page</h1>
          <p className="text-center text-lg sm:text-xl">
            Let&apos;s design the place you always imagined.
          </p>
        </div>
      </div>

      <div className="flex gap-6">
        <ShopFilterSection
          searchParams={searchParams}
          params={params}
          className="hidden md:block"
        />
        <div className="mx-auto space-y-8">
          <div className="flex flex-col-reverse justify-between gap-y-4 text-xl font-semibold md:flex-row md:items-center">
            <div className="flex flex-1 items-center justify-between">
              <h1>Living Room</h1>
              <Select>
                <SelectTrigger className="max-w-fit gap-x-2 border-none">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between gap-4 border-y py-4 md:border-none">
              <div className="block md:hidden">
                <ShopFilterSidebar
                  params={params}
                  searchParams={searchParams}
                />
              </div>
              <div className="flex">
                <GridSelectButton />
              </div>
            </div>
          </div>

          <GridSelectLayout>
            <ProductCard
              className="w-auto flex-1"
              imageAlt="img"
              imageSrc="/images/products/camera/Canon EOS 5D Mark IV 30.4 MP Digital SLR Camera (Black) + EF 24-105mm is II USM Lens Kit 2.jpg"
              price={"1999"}
              productName="Loveseat Sofa Loveseat Sofa Loveseat Sofa Loveseat Sofa Loveseat Sofa"
              title="New"
              rating={3}
              href=""
            />

            <ProductCard
              className="w-auto flex-1"
              imageAlt="img"
              imageSrc="/images/products/camera/Canon EOS 5D Mark IV 30.4 MP Digital SLR Camera (Black) + EF 24-105mm is II USM Lens Kit 2.jpg"
              price={"1999"}
              productName="Loveseat Sofa Loveseat Sofa Loveseat Sofa Loveseat Sofa Loveseat Sofa"
              title="New"
              rating={3}
              href=""
            />

            <ProductCard
              className="w-auto flex-1"
              imageAlt="img"
              imageSrc="/images/products/camera/Canon EOS 5D Mark IV 30.4 MP Digital SLR Camera (Black) + EF 24-105mm is II USM Lens Kit 2.jpg"
              price={"1999"}
              productName="Loveseat Sofa Loveseat Sofa Loveseat Sofa Loveseat Sofa Loveseat Sofa"
              title="New"
              rating={3}
              href=""
            />

            <ProductCard
              className="w-auto flex-1"
              imageAlt="img"
              imageSrc="/images/products/camera/Canon EOS 5D Mark IV 30.4 MP Digital SLR Camera (Black) + EF 24-105mm is II USM Lens Kit 2.jpg"
              price={"1999"}
              productName="Loveseat Sofa Loveseat Sofa Loveseat Sofa Loveseat Sofa Loveseat Sofa"
              title="New"
              rating={3}
              href=""
            />

            <ProductCard
              className="w-auto flex-1"
              imageAlt="img"
              imageSrc="/images/products/camera/Canon EOS 5D Mark IV 30.4 MP Digital SLR Camera (Black) + EF 24-105mm is II USM Lens Kit 2.jpg"
              price={"1999"}
              productName="Loveseat Sofa Loveseat Sofa Loveseat Sofa Loveseat Sofa Loveseat Sofa"
              title="New"
              rating={3}
              href=""
            />
          </GridSelectLayout>

          <div className="flex items-center justify-center">
            <Button className="rounded-full px-6" variant="outline">
              See More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryShopLayout;

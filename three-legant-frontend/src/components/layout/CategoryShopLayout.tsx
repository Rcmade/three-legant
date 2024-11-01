import ProductBreadcrumb from "@/components/breadcrumb/ProductBreadcrumb";
import GridSelectButton from "@/components/buttons/GridSelectButton";
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
import { PageProps } from "@/types";
import { getProductsAction } from "@/actions/productAction";
import GridSelectLayout from "./GridSelectLayout";
import ProductCard from "../cards/ProductCard";
import {
  createQueryString,
  getProductNavigateString,
} from "@/lib/utils/stringUtils";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SelectSortBy from "../selects/SelectSortBy";
const CategoryShopLayout = async ({ params, searchParams }: PageProps) => {
  const list = ["/shop"];
  params?.category
    ? list?.push(decodeURIComponent(`/shop/${params.category}`))
    : list;

  const products = await getProductsAction({ params, searchParams });
  const page = isNaN(+searchParams.page) ? 1 : +searchParams.page;

  const totalPages = Math.ceil(
    products.pagination.total / products.pagination.limit,
  );

  const isLastPage = page >= totalPages;
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
        <div className="flex flex-1 flex-col space-y-8">
          <div className="flex flex-col-reverse justify-between gap-y-4 text-xl font-semibold md:flex-row md:items-center">
            <div className="flex flex-1 items-center justify-between">
              <h1>Living Room</h1>
              <SelectSortBy params={params} searchParams={searchParams} />
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
            {products.products?.map((product) => (
              <ProductCard
                key={product.id}
                productId={product.id}
                imageAlt="img"
                imageSrc={product.primaryImage}
                price={product.price}
                productName={product.name}
                title={`${product.categoryName}`}
                discountedPrice={product.discountedPrice} // rating={product.rating}
                href={getProductNavigateString(
                  product.categoryName || ":",
                  product.id,
                )}
              />
            ))}
          </GridSelectLayout>

          <div className="flex items-center justify-center">
            <Button
              showDisableLoaders={false}
              disabled={isLastPage}
              className={cn("rounded-full px-6")}
              asChild
              variant="outline"
            >
              <Link
                href={createQueryString(searchParams, {
                  page: `${page + 1}`,
                })}
              >
                See More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryShopLayout;

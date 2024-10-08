import React from "react";
import { PageProps } from "@/types";

import ProductBreadcrumb from "@/components/breadcrumb/ProductBreadcrumb";
import ProductDetailsCarousel from "@/components/carousels/ProductDetailsCarousel";
import RatingStarButtons from "@/components/buttons/RatingStarButtons";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import AdditionInfo from "@/components/sections/product-details/AdditionInfo";
import Qna from "@/components/sections/product-details/Qna";
import Reviews from "@/components/sections/product-details/Reviews";
import ProductTabs from "@/components/sections/product-details/ProductTabs";
import axios from "axios";
import { productDetails } from "@/constant/apiRoute";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import Link from "next/link";
import { ProductDetailsResponseT } from "@/types/apiResponse";
import WishlistCartQtySection from "@/components/sections/product-details/WishlistCartQtySection";

const tabs = {
  "Additional Info": <AdditionInfo />,
  Questions: <Qna />,
  Reviews: <Reviews />,
};

export const dynamic = "force-static";
export const revalidate = 3600;

const page = async ({ params }: PageProps) => {
  const getProductDetails = async () => {
    try {
      const { data } = await axios.get<ProductDetailsResponseT>(
        getBackendUrl(`${productDetails}/${params.product}`),
      );
      if (data) {
        return data;
      }
      return null;
    } catch (error: any) {
      return null;
    }
  };

  const data: ProductDetailsResponseT | null = await getProductDetails();
  const breadcrumb =
    (data &&
      "product" in data &&
      data?.product.name &&
      Object.values({ product: data?.product.name })) ||
    [];

  const formateBreadcrumb =
    data && "product" in data && data?.product?.category
      ? [data.product.category, ...breadcrumb]
      : breadcrumb;

  return data && "product" in data ? (
    <>
      <ProductBreadcrumb baseUrl="/shop" list={formateBreadcrumb} />

      <div className="flex flex-col gap-4 md:flex-row lg:gap-8">
        <ProductDetailsCarousel
          productVariants={data?.variants.filter((variant) => variant !== null)}
          productImages={[
            { image: data.product.primaryImage! },
            ...(data.product.subImages
              ?.filter((img) => img.image !== null)
              .map((img) => ({ image: img.image || "" })) || []),
          ]}
          className="w-full md:max-w-[50%]"
        />
        <div className="w-full space-y-6 md:max-w-[50%]">
          <div className="flex flex-wrap items-center gap-6">
            <RatingStarButtons rating={+(data.product?.rating || 0)} />
            {/* <p className="h-full">11 Reviews</p> */}
          </div>
          <h1 className="text-4xl font-medium">{data.product.name}</h1>
          <p className="text-muted-foreground">
            {data.product.sortDescription}
          </p>

          <h1 className="flex gap-4 border-b pb-6 text-2xl font-semibold">
            ${data.product.discountedPrice} <del>${data.product.price}</del>
          </h1>
          {Object.keys(data.product?.meta || {}).map((m, i) => (
            <p key={i} className="flex flex-col gap-4 font-semibold capitalize">
              <span className="text-muted-foreground">{m}</span>
              <span>{data.product?.meta?.[m]} </span>
            </p>
          ))}

          <span className="flex items-center gap-2 text-muted-foreground">
            Choose {data.product.currentVariantType}{" "}
            <ChevronRight className="h-5 w-5" />
          </span>

          <div>
            <p>{data.product.currentVariantValue}</p>
            <div className="scrollbar flex max-w-full flex-nowrap gap-4 overflow-auto">
              {(data.variants || []).map((i, index) => {
                return (
                  i?.primaryImage && (
                    <Link
                      shallow
                      href={`/shop/earphones/${i.id}`}
                      scroll={false}
                      replace
                      title={i.variantValue || ""}
                      key={i.primaryImage + index}
                      className="flex max-h-24 max-w-24 cursor-pointer items-center justify-center border border-transparent p-2 transition-all hover:border-primary"
                    >
                      <Image
                        className="max-h-full max-w-full object-contain"
                        src={i.primaryImage}
                        width={80}
                        height={80}
                        alt="Product"
                      />
                    </Link>
                  )
                );
              })}
            </div>
          </div>

          <WishlistCartQtySection
            revalidationType="path"
            product={data.product}
          />
          {/* <div className="flex w-full flex-wrap gap-6">
            <div className="flex gap-2 rounded-md bg-accent">
              <ChangeProductQty
                id={data.product.id}
                stock={data.product.stock}
              />
            </div>
            <AddRemoveWishButton productId={data.product.id} />
          </div>

          <AddToCartButton
            productId={data.product.id}
            className="text-lg font-semibold"
            size={"lg"}
          /> */}
          <div className="border-b p-1"></div>
          <div className="max-w-fit space-y-2 text-sm text-muted-foreground">
            <p className="flex justify-between gap-8">
              <span>Sku</span>
              <span className="text-primary">{data.product.sku}</span>
            </p>
            {data?.product?.category && (
              <p className="flex justify-between gap-8 capitalize">
                <span>Category</span>
                <Link
                  href={`/shop/${data?.product?.category}`}
                  className="text-primary"
                >
                  {data?.product?.category}
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>

      <ProductTabs />
    </>
  ) : (
    <h1 className="text-center text-lg">No Product Found</h1>
  );
};

export default page;

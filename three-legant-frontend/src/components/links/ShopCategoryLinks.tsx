"use client";
import { categoryContent } from "@/content/categoryContent";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import Link from "next/link";
import React from "react";

interface ShopCategoryLinksProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PageProps {}
const ShopCategoryLinks = ({
  className,
  params,
  searchParams,
  ...rest
}: ShopCategoryLinksProps) => {
  return (
    <div {...rest} className={cn("flex", className)}>
      {categoryContent.map((i) => {
        // console.log({ i, params: params.category });
        return (
          <Link
            className={cn(
              "max-w-fit border-b border-transparent hover:border-primary",
              i === decodeURIComponent(params?.category) &&
                "border-b border-primary font-semibold",
            )}
            href={`/shop/${i}`}
            scroll={false}
            key={i}
          >
            {i}
          </Link>
        );
      })}
    </div>
  );
};

export default ShopCategoryLinks;

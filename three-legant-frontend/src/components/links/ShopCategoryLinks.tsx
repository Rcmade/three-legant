import { getCategories } from "@/actions/categoryAction";
import { categoryContent } from "@/content/categoryContent";
import { cn } from "@/lib/utils";
import { createQueryString } from "@/lib/utils/stringUtils";
import { wait } from "@/lib/utils/testUtils";
import { PageProps } from "@/types";
import Link from "next/link";
import React from "react";

interface ShopCategoryLinksProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PageProps {}
const ShopCategoryLinks = async ({
  className,
  params,
  searchParams,
  ...rest
}: ShopCategoryLinksProps) => {
  const searchParamsStr = createQueryString(searchParams);
  const getCategoriesData = await getCategories(searchParamsStr);

  return (
    <div {...rest} className={cn("flex", className)}>
      {(getCategoriesData.categories || []).map((i) => {
        return (
          <Link
            className={cn(
              "max-w-fit border-b border-transparent hover:border-primary",
              i.name === decodeURIComponent(params?.category) &&
                "border-b border-primary font-semibold",
            )}
            href={`/shop/${i.name}`}
            scroll={false}
            key={i.id}
          >
            {i.name}
          </Link>
        );
      })}
    </div>
  );
};

export default ShopCategoryLinks;


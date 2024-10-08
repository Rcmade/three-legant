import FilterIcon from "@/icons/FilterIcon";
import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import ShopCategoryLinks from "@/components/links/ShopCategoryLinks";
import PriceLinkCheckbox from "@/components/checkbox/PriceLinkCheckbox";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { PageProps } from "@/types";

interface ShopFilterSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PageProps {
  baseId?: string;
}

const ShopFilterSection = ({
  className,
  baseId,
  params,
  searchParams,
  ...rest
}: ShopFilterSectionProps) => {
  return (
    <div className={cn("w-96", className)} {...rest}>
      <Button className="flex gap-4 text-xl font-semibold" variant="ghost">
        <FilterIcon /> Filter
      </Button>
      <div className="my-8 space-y-4 px-4">
        <h3 className="text-lg font-medium">Price</h3>
        <Suspense fallback={<Loader className="animate-spin" />}>
          <ShopCategoryLinks
            params={params}
            searchParams={searchParams}
            className="scrollbar max-h-96 flex-col gap-4 overflow-y-auto"
          />
        </Suspense>
      </div>
      <div className="my-8 space-y-4 px-4">
        <h3 className="text-lg font-medium">Category</h3>
        <PriceLinkCheckbox baseId={baseId} className="flex-col gap-4" />
      </div>
    </div>
  );
};

export default ShopFilterSection;

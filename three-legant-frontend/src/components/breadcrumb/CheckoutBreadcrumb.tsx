import React from "react";

import { cn } from "@/lib/utils";
import { checkoutBreadcrumb } from "@/content/checkoutContent";
import { CheckOutBreadcrumb } from "@/types";
import Link from "next/link";
import { Check } from "lucide-react";

interface ProductBreadcrumbProps
  extends React.DetailedHTMLProps<
    React.OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement
  > {
  currentState: CheckOutBreadcrumb;
  baseUrl?: string;
}

const CheckoutBreadcrumb = ({
  className,
  baseUrl = "/",
  currentState,
  ...rest
}: ProductBreadcrumbProps) => {
  const strArr = Object.keys(checkoutBreadcrumb);
  return (
    <div className="no-scrollbar flex max-w-full snap-x snap-mandatory flex-nowrap gap-x-8 overflow-auto">
      {strArr.map((item, i) => {
        const isActive = currentState.href === item;
        const currentIndex = strArr.indexOf(currentState.href); // Find current path index
        const isPrevious = i < currentIndex;
        return (
          <div
            key={item}
            className={cn(
              "md:min-w-auto flex snap-start items-center gap-x-4 whitespace-nowrap pb-4 pr-10 font-semibold",
              {
                "pointer-events-none border-b border-primary": isActive,
                "border-b border-secondary-green": isPrevious,
              },
            )}
          >
            <span
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground",
                {
                  "bg-[#B1B5C3] text-white": !isActive, // Default styling for non-active items
                  "bg-secondary-green text-secondary-green": isPrevious, // Green color for items before the current path
                },
              )}
            >
              {isPrevious ? <Check className="text-white" /> : i + 1}
            </span>
            <span className={isPrevious ? "text-secondary-green" : ""}>
              {
                checkoutBreadcrumb[item as keyof typeof checkoutBreadcrumb]
                  .label
              }
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutBreadcrumb;

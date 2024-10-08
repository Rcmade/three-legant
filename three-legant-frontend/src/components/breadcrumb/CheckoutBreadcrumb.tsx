import React from "react";

import { cn } from "@/lib/utils";
import { checkoutBreadcrumb } from "@/content/checkoutContent";
import { CheckOutBreadcrumb } from "@/types";
import Link from "next/link";

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
  // const pathname = usePathname();
  // const list = Object.values(checkoutBreadcrumb);

  return (
    <div className="no-scrollbar flex max-w-full snap-x snap-mandatory flex-nowrap gap-x-8 overflow-auto">
      {Object.keys(checkoutBreadcrumb).map((item, i) => (
        <Link
          href={item}
          key={item}
          className={cn(
            "md:min-w-auto flex snap-start items-center gap-x-4 whitespace-nowrap pb-4 pr-10 font-semibold",
            {
              "border-b border-primary": currentState.href === item,
            },
          )}
        >
          <span
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground",
              {
                "bg-[#B1B5C3] text-white": currentState.href !== item,
              },
            )}
          >
            {i + 1}
          </span>
          <span>
            {checkoutBreadcrumb[item as keyof typeof checkoutBreadcrumb].label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default CheckoutBreadcrumb;

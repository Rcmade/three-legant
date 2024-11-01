import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

interface ProductBreadcrumbProps
  extends React.DetailedHTMLProps<
    React.OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement
  > {
  list: string[];
  baseUrl?: string;
}

const ProductBreadcrumb = ({
  list,
  className,
  baseUrl = "/",
  ...rest
}: ProductBreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList
        className={cn(
          "no-scrollbar flex max-w-full snap-x snap-mandatory flex-nowrap overflow-x-auto",
          className,
        )}
        {...rest}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {list.map((item, index) => {
          // Extract the last segment for display (e.g., 'mouse' from '/shop/mouse')
          const formattedItem = item.split("/").filter(Boolean).pop();

          // Use the complete path for the href
          const createHref = `${baseUrl}${item}`.replace(/\/{2,}/g, "/");

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {index === list.length - 1 ? (
                  <BreadcrumbPage>{formattedItem}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={createHref}>
                    {formattedItem}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < list.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ProductBreadcrumb;

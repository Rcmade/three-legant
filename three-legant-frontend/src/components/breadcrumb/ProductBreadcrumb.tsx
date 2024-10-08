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
          <BreadcrumbLink href={"/"}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {list.map((item, index) => {
          const formateHref = item?.replaceAll("/", ""); // Removes any slashes from the item

          // Create the href while ensuring no extra slashes appear
          let createHref = baseUrl + "/" + list.slice(0, index + 1).join("/");

          // Replace any occurrence of multiple slashes (e.g., "///") with a single "/"
          createHref = createHref.replace(/\/{2,}/g, "/");
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {list?.length - 1 === index ? (
                  <BreadcrumbPage>{formateHref}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={createHref}>
                    {formateHref}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {list.length - 1 !== index && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ProductBreadcrumb;

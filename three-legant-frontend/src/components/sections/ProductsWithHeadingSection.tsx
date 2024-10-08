import React from "react";
import PageSectionTitleHeading, {
  PageSectionTitleHeadingProps,
} from "@/components/heading/PageSectionTitleHeading";
import TextWithArrow from "@/components/links/TextWithArrow";
import { Children } from "@/types";

interface ProductsWithHeadingSectionProps extends Children {
  sectionTitle: PageSectionTitleHeadingProps;
}
const ProductsWithHeadingSection = ({
  children,
  sectionTitle,
}: ProductsWithHeadingSectionProps) => {
  return (
    <div className="space-y-6 py-6">
      <PageSectionTitleHeading
        title={sectionTitle.title}
        hrefTitle={sectionTitle.hrefTitle}
        href={sectionTitle.href}
      />

      <div className="carousel-wrapper w-full">
        <div className="carousel scrollbar snap-x snap-mandatory space-x-4 overflow-x-auto scroll-smooth whitespace-nowrap pb-8">
          {children}
        </div>
      </div>

      <TextWithArrow
        className="flex md:hidden"
        title={sectionTitle.hrefTitle}
        href={sectionTitle.href || ""}
      />
    </div>
  );
};

export default ProductsWithHeadingSection;

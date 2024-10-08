import React from "react";
import TextWithArrow from "@/components/links/TextWithArrow";

export interface PageSectionTitleHeadingProps {
  title: string;
  href?: string;
  hrefTitle?: string;
  children?: React.ReactNode;
}
const PageSectionTitleHeading = ({
  title,
  href,
  hrefTitle,
}: PageSectionTitleHeadingProps) => {
  return (
    <>
      <div className="flex items-center md:justify-between">
        <h1 className="text-3xl font-medium">{title}</h1>
        {href && hrefTitle && (
          <TextWithArrow
            className="hidden md:flex"
            title={hrefTitle}
            href={href}
          />
        )}
      </div>
    </>
  );
};

export default PageSectionTitleHeading;

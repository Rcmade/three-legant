import React from "react";
import CheckoutBreadcrumb from "../breadcrumb/CheckoutBreadcrumb";
import { CheckOutBreadcrumb } from "@/types";

interface TitleWithBreadcrumbProps {
  currentState: CheckOutBreadcrumb;
  title: string;
}
const TitleWithBreadcrumb = ({
  currentState,
  title,
}: TitleWithBreadcrumbProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-center text-5xl font-medium">{title}</h1>
      <div className="flex justify-center">
        <CheckoutBreadcrumb currentState={currentState} />
      </div>
    </div>
  );
};

export default TitleWithBreadcrumb;

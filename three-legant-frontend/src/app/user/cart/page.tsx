import { getAllCart } from "@/actions/cartAction";
import TitleWithBreadcrumb from "@/components/sections/TitleWithBreadcrumb";
import { cartBreadcrumb } from "@/content/checkoutContent";
import { createQueryString } from "@/lib/utils/stringUtils";
import { PageProps } from "@/types";
import React from "react";
import CartWithSummary from "./CartWithSummary";
import CartProductSection from "@/components/sections/CartProductSection";
import CartSummaryCard from "@/components/cards/CartSummaryCard";

export const revalidate = 3600;

const Page = async ({ searchParams }: PageProps) => {
  const strParams = createQueryString(searchParams);
  const cart = await getAllCart(strParams);

  return (
    <div className="space-y-6">
      <TitleWithBreadcrumb currentState={cartBreadcrumb} title="Cart" />
      <div className="flex flex-col justify-between gap-8 lg:flex-row">
        <CartWithSummary cart={cart} />
        {cart && (
          <>
            <CartProductSection cartData={cart} />
            <CartSummaryCard cartData={cart} />
          </>
        )}
      </div>
    </div>
  );
};

export default Page;

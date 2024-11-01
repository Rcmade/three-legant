import { getAllCart } from "@/actions/cartAction";
import TitleWithBreadcrumb from "@/components/sections/TitleWithBreadcrumb";
import { cartBreadcrumb } from "@/content/checkoutContent";
import { createQueryString } from "@/lib/utils/stringUtils";
import { PageProps } from "@/types";
import React from "react";
import CartProductSection from "@/components/sections/CartProductSection";
import CartSummaryCardSuspense from "@/components/suspense/CartSummaryCardSuspense";
import { webName } from "@/constant";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const revalidate = 3600;

const Page = async ({ searchParams }: PageProps) => {
  const strParams = createQueryString(searchParams);
  const cart = await getAllCart(strParams);

  return (cart?.products?.length ?? 0) > 0 ? (
    <div className="space-y-6">
      <TitleWithBreadcrumb currentState={cartBreadcrumb} title="Cart" />
      <div className="flex flex-col justify-between gap-8 lg:flex-row">
        {cart && (
          <>
            <CartProductSection cartData={cart} />
            <CartSummaryCardSuspense cartData={cart} />
          </>
        )}
      </div>
    </div>
  ) : (
    <div className="text-center">
      <h1 className="text-3xl">Your {webName} Cart is empty.</h1>
      <Button asChild variant="link" className="px-0">
        <Link href="/">Continue Shopping</Link>
      </Button>
    </div>
  );
};

export default Page;

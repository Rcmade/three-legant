import { getLatestAddress } from "@/actions/addressAction";
import { getAllCart } from "@/actions/cartAction";
import {
  getAvailableShipping,
  getSelectedShipping,
} from "@/actions/shippingAction";
import CartProductCard from "@/components/cards/CartProductCard";
import SubtotalCard from "@/components/cards/SubtotalCard";
import CheckoutInfoForm from "@/components/forms/CheckoutInfoForm";
import TitleWithBreadcrumb from "@/components/sections/TitleWithBreadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { shippingSearchParams } from "@/constant";
import { checkoutDetailsBreadcrumb } from "@/content/checkoutContent";
import { createQueryString } from "@/lib/utils/stringUtils";
import { PageProps } from "@/types";
import { GetShippingMethodsResponseT } from "@/types/apiResponse";
import React from "react";
import CheckoutClient from "./CheckoutClient";

const page = async ({ searchParams, ...rest }: PageProps) => {
  const strParams = createQueryString(searchParams);
  const cartP = getAllCart(strParams);
  const latestAddressP = getLatestAddress();

  let currentShippingTypeP = null;
  let availableShippingMethodsP:
    | Promise<GetShippingMethodsResponseT>
    | undefined = undefined;
  if (searchParams?.[shippingSearchParams]) {
    currentShippingTypeP = getSelectedShipping(
      searchParams?.[shippingSearchParams],
    );
  } else {
    availableShippingMethodsP = getAvailableShipping();
  }
  const [cart, lAddress, currentShippingType, availableShippingMethods] =
    await Promise.all([
      cartP,
      latestAddressP,
      currentShippingTypeP,
      availableShippingMethodsP,
    ]);

  const latestAddress = lAddress?.[0]?.id ? lAddress[0] : null;

  return (
    <div className="space-y-6">
      <TitleWithBreadcrumb
        title="Check Out"
        currentState={checkoutDetailsBreadcrumb}
      />
      {cart && (
        <CheckoutClient
          cart={cart}
          cartData={{ subtotal: cart.subtotal, total: cart.total }}
          latestAddress={latestAddress}
          searchParams={searchParams}
          availableShippingMethods={availableShippingMethods}
          currentShippingType={currentShippingType || undefined}
          currentType={currentShippingType || undefined}
          pageProps={{ searchParams, ...rest }}
        />
      )}
      {/* <CheckoutInfoForm
          currentShippingType={currentShippingType || undefined}
          latestAddress={latestAddress}
          cart={cart}
          // availableShippingMethods={availableShippingMethods}
        />
        <Card className="lg:w-[28rem]">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 px-2 sm:px-6">
            small-card class for group class applied in the card components
            <div className="small-card scrollbar group flex max-h-[calc(100%-267px)] flex-col gap-4 overflow-y-auto">
              {(cart?.products || []).map((i) => (
                <CartProductCard
                  key={i.cartId}
                  cartId={i.cartId}
                  productId={i.productId}
                  imageUrl={i.primaryImage}
                  altText={i.name}
                  productName={i.name}
                  originalPrice={+i.price}
                  discountedPrice={+(i.discountedPrice || i.price)}
                  stock={i.stock}
                  qty={i.qty}
                  removeButton
                  category={i.category || undefined}
                />
              ))}
            </div>

            <div>
              {cart && (
                <SubtotalCard
                  key={searchParams?.[shippingSearchParams]}
                  cartData={{ subtotal: cart.subtotal, total: cart.total }}
                  pageProps={{
                    searchParams,
                  }}
                  currentType={currentShippingType || undefined}
                />
              )}
            </div>
          </CardContent>
        </Card> */}
    </div>
  );
};

export default page;

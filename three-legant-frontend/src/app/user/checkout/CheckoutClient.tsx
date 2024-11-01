"use client";
import CartProductCard from "@/components/cards/CartProductCard";
import SubtotalCard, {
  SubtotalCardProps,
} from "@/components/cards/SubtotalCard";
import CheckoutInfoForm, {
  CheckoutInfoFormProps,
} from "@/components/forms/CheckoutInfoForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { shippingSearchParams } from "@/constant";
import { SearchParams } from "@/types";
import React from "react";

interface CheckoutClient extends CheckoutInfoFormProps, SubtotalCardProps {
  searchParams: SearchParams;
}
const CheckoutClient = ({
  cart,
  latestAddress,
  currentShippingType,
  cartData,
  availableShippingMethods,
  currentType,
  pageProps,
  searchParams,
}: CheckoutClient) => {

  
  return (
    <>
      <div className="flex flex-col justify-between gap-8 lg:flex-row">
        <CheckoutInfoForm
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
            {/* small-card class for group class applied in the card components */}
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
        </Card>
      </div>
    </>
  );
};

export default CheckoutClient;

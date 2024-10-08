import CartProductCard from "@/components/cards/CartProductCard";
import CheckoutInfoForm from "@/components/forms/CheckoutInfoForm";
import TitleWithBreadcrumb from "@/components/sections/TitleWithBreadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { checkoutDetailsBreadcrumb } from "@/content/checkoutContent";
import React from "react";

const page = () => {
  return (
    <div className="space-y-6">
      <TitleWithBreadcrumb
        title="Check Out"
        currentState={checkoutDetailsBreadcrumb}
      />
      <div className="flex flex-col justify-between gap-8 lg:flex-row">
        <CheckoutInfoForm />
        <Card className="w-[28rem]">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="">
            {/* small-card class for group class applied in the card components */}
            <div className="small-card group">
              {/* <CartProductCard
                imageUrl="/images/products/camera/Canon EOS 5D Mark IV 30.4 MP Digital SLR Camera (Black) + EF 24-105mm is II USM Lens Kit 1.jpg"
                altText="Canon EOS 5D Camera"
                productName="Canon EOS 5D"
                // productColor="Black"
                originalPrice={20.0}
                discountedPrice={19.0}
                // onRemove={() => console.log("Remove product")}
              />

              <CartProductCard
                imageUrl="/images/products/camera/Canon EOS 5D Mark IV 30.4 MP Digital SLR Camera (Black) + EF 24-105mm is II USM Lens Kit 1.jpg"
                altText="Canon EOS 5D Camera"
                productName="Canon EOS 5D"
                // productColor="Black"
                originalPrice={20.0}
                discountedPrice={19.0}
                // onRemove={() => console.log("Remove product")}
              />

              <CartProductCard
                imageUrl="/images/products/camera/Canon EOS 5D Mark IV 30.4 MP Digital SLR Camera (Black) + EF 24-105mm is II USM Lens Kit 1.jpg"
                altText="Canon EOS 5D Camera"
                productName="Canon EOS 5D"
                // productColor="Black"
                originalPrice={20.0}
                discountedPrice={19.0}
                // onRemove={() => console.log("Remove product")}
              />

              <CartProductCard
                imageUrl="/images/products/camera/Canon EOS 5D Mark IV 30.4 MP Digital SLR Camera (Black) + EF 24-105mm is II USM Lens Kit 1.jpg"
                altText="Canon EOS 5D Camera"
                productName="Canon EOS 5D"
                // productColor="Black"
                originalPrice={20.0}
                discountedPrice={19.0}
                // onRemove={() => console.log("Remove product")}
              /> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;

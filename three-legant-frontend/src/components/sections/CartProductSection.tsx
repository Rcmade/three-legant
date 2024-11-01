"use client";
import { cn } from "@/lib/utils";
import { Children } from "@/types";
import React from "react";
import CartProductCard from "../cards/CartProductCard";
import { CartsResponseT } from "@/types/apiResponse";

interface CartProductSectionProps {
  cartData: CartsResponseT;
}

const CartProductSection = ({ cartData }: CartProductSectionProps) => {
  return (
    <GridFive>
      <GridFive className="col-span-5 hidden border-b border-primary/50 pb-5 text-base font-semibold md:grid">
        <span className="col-span-2">Product</span>
        <span>Quantity</span>
        <span>Price</span>
        <span>Subtotal</span>
      </GridFive>
      <div className="col-span-5">
        {(cartData?.products || []).map((i) => (
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
            category={i.category || undefined}
          />
        ))}
      </div>
    </GridFive>
  );
};

export const GridFive = ({
  children,
  className,
}: Children & { className?: string }) => {
  return (
    <div className={cn("grid auto-rows-max grid-cols-5", className)}>
      {children}
    </div>
  );
};

export default CartProductSection;

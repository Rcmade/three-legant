"use client";
import CartProductSection from "@/components/sections/CartProductSection";
import CartSummaryCardSuspense from "@/components/suspense/CartSummaryCardSuspense";
import { CartsResponseT } from "@/types/apiResponse";
import React, {  } from "react";

interface CartWithSummaryProps {
  cart: CartsResponseT | undefined;
}
const CartWithSummary = ({ cart }: CartWithSummaryProps) => {
  return (
    cart && (
      <>
        <CartProductSection cartData={cart} />
        <CartSummaryCardSuspense cartData={cart} />
      </>
    )
  );
};

export default CartWithSummary;

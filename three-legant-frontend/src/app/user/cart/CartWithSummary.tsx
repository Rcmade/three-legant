"use client";
import { CartsResponseT } from "@/types/apiResponse";
import React, {  } from "react";

interface CartWithSummaryProps {
  cart: CartsResponseT | undefined;
}
const CartWithSummary = ({ cart }: CartWithSummaryProps) => {
  return (
    cart && (
      <>
        {/* <CartProductSection cartData={data} />
        <CartSummaryCard cartData={data} /> */}
      </>
    )
  );
};

export default CartWithSummary;

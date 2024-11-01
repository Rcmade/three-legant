"use client";
import { useChangeProductQty } from "@/hooks/useChangeProductQty";
import React from "react";

interface CartItemSubtotalProps {
  price: number;
  cartId: string;
  qty: number;
}
const CartItemSubtotal = ({ cartId, price, qty }: CartItemSubtotalProps) => {
  const productsQty = useChangeProductQty((s) => s.productsQty[cartId]);

  const currentQty = productsQty || qty;

  return <span>{(+price * +currentQty).toFixed(2)}</span>;
};

export default CartItemSubtotal;

"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartSidebar } from "@/hooks/useCartSidebar";
import CartProductCard from "../cards/CartProductCard";
import { getAllCartProductApi } from "@/constant/apiRoute";
import { getAllCart } from "@/actions/cartAction";
import { CartsResponseT } from "@/types/apiResponse";
import useSWR from "swr";
import { fetcher } from "@/lib/utils/apiUtils";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAuthorization } from "@/hooks/useAuthorization";
const CartSidebar = () => {
  const { isOpen, onClose, onOpen } = useCartSidebar();
  const { authorization } = useAuthorization();
  const { data, mutate } = useSWR<CartsResponseT>(
    isOpen && getBackendUrl(getAllCartProductApi),
    (url: string) =>
      fetcher(url, {
        headers: {
          Authorization: authorization!,
        },
      }),
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="px-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle className="text-2xl">Cart</SheetTitle>
          <SheetDescription className="sr-only">
            Review your selected products before proceeding to checkout.
          </SheetDescription>
        </SheetHeader>
        <div className="flex h-full flex-col justify-between">
          <div className="small-card scrollbar group flex max-h-[calc(100%-267px)] flex-col gap-4 overflow-y-auto px-6">
            {(data?.products || []).map((i) => (
              <CartProductCard
                key={i.cartId}
                cartId={i.cartId}
                productId={i.productId}
                imageUrl={i.primaryImage}
                altText={i.name}
                productName={i.name}
                // productColor="Black"
                originalPrice={+i.price}
                discountedPrice={+(i.discountedPrice || i.price)}
                stock={i.stock}
                qty={i.qty}
                category={i.category || undefined}
              />
            ))}
          </div>

          <div className="flex flex-col justify-center gap-4 px-6 py-4">
            <div className="flex items-center justify-between border-b py-4 text-lg">
              <span>Subtotal</span>
              <span className="font-semibold">${data?.subtotal}</span>
            </div>
            <div className="flex items-center justify-between border-b py-4 text-lg">
              <span>Total</span>
              <span className="font-semibold">${data?.total}</span>
            </div>

            <Button onClick={onClose} asChild className="w-full">
              <Link href="/user/cart">Checkout</Link>
            </Button>

            <Link
              onClick={onClose}
              href="/user/cart"
              className="mx-auto border-b font-bold"
            >
              View Cart
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;

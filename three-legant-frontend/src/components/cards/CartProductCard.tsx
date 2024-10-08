import React from "react";
import ChangeProductQty from "@/components/sections/ChangeProductQty";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import CartItemSubtotal from "../sections/CartItemSubtotal";
import CartRemoveButton from "../buttons/CartRemoveButton";

type CartProductCardProps = {
  imageUrl: string;
  altText: string;
  productName: string;
  originalPrice: number;
  discountedPrice: number;
  stock: number;
  productId: string;
  cartId?: string;
  qty: number;
};

const CartProductCard = ({
  productId,
  cartId,
  imageUrl,
  altText,
  productName,
  discountedPrice,
  stock,
  qty,
  //   onRemove,
}: CartProductCardProps) => {
  return (
    <div className="col-span-5 grid items-end border-b py-4 pb-5 text-base md:auto-rows-auto md:grid-cols-10 group-[.small-card]:md:grid-cols-none">
      <div className="row-start-1 row-end-3 flex aspect-square max-w-fit items-center justify-center self-center bg-accent">
        <Image
          className="bg-accent object-contain"
          alt={altText}
          width={120}
          height={120}
          src={imageUrl}
        />
      </div>
      <div className="col-span-3 col-start-2 row-start-1 row-end-2 !ml-6 self-center">
        <h1 className="font-semibold">{productName}</h1>
        {/* <span className="whitespace-nowrap">Color: {productColor}</span> */}
      </div>
      <div className="col-start-10 self-start group-[.small-card]:self-start md:col-start-auto md:col-end-auto md:row-start-2 md:row-end-3 md:!ml-6 group-[.small-card]:md:col-start-10">
        <CartRemoveButton cartOrProductId={cartId || productId} />
      </div>
      <div className="col-span-2 col-start-2 row-start-2 ml-6 flex max-h-fit max-w-fit self-center rounded-md bg-accent md:col-start-5 md:row-start-1 md:row-end-3 md:ml-0 group-[.small-card]:md:col-span-2 group-[.small-card]:md:col-start-2 group-[.small-card]:md:row-start-2 group-[.small-card]:md:ml-6">
        <ChangeProductQty
          cartItemQty={qty}
          id={cartId || productId}
          stock={stock}
        />
      </div>
      <span className="col-span-2 col-start-7 row-start-1 row-end-3 hidden self-center md:block group-[.small-card]:md:col-span-2 group-[.small-card]:md:col-start-7 group-[.small-card]:md:row-start-1 group-[.small-card]:md:row-end-3 group-[.small-card]:md:hidden">
        {discountedPrice.toFixed(2)}
      </span>
      <span className="col-span-2 col-start-10 row-start-1 row-end-2 self-center font-semibold md:col-start-9 md:row-start-1 md:row-end-3 group-[.small-card]:md:col-span-2 group-[.small-card]:md:col-start-10 group-[.small-card]:md:row-start-1 group-[.small-card]:md:row-end-2">
        <CartItemSubtotal
          qty={qty}
          cartId={cartId || productId}
          price={discountedPrice}
        />
      </span>
    </div>
  );
};

export default CartProductCard;

import React from "react";
import ChangeProductQty from "@/components/sections/ChangeProductQty";
import Image from "next/image";
import CartItemSubtotal from "@/components/sections/CartItemSubtotal";
import CartRemoveButton from "@/components/buttons/CartRemoveButton";
import Link from "next/link";
import { getProductNavigateString } from "@/lib/utils/stringUtils";

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
  removeButton?: boolean;
  category?: string;
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
  removeButton,
  category,
}: CartProductCardProps) => {
  return (
    <div className="col-span-5 grid items-end border-b py-4 pb-5 text-base md:auto-rows-auto md:grid-cols-10 group-[.small-card]:md:grid-cols-none">
      <div className="row-start-1 row-end-3 flex aspect-square max-w-fit items-center justify-center self-center bg-accent p-1 sm:max-h-24">
        <div className="relative">
          <Image
            className="max-h-24 min-w-16 bg-accent object-contain"
            alt={altText}
            width={140}
            height={140}
            src={imageUrl}
          />
          <Link
            href={getProductNavigateString(category || "unknown", productId)}
            className="absolute inset-0"
          ></Link>
        </div>
      </div>
      <div className="col-span-3 col-start-2 row-start-1 row-end-2 !ml-6 self-center">
        <h1 className="font-semibold">{productName}</h1>
        {/* <span className="whitespace-nowrap">Color: {productColor}</span> */}
      </div>
      {!removeButton && (
        <div className="col-start-10 self-start group-[.small-card]:self-start md:col-start-auto md:col-end-auto md:row-start-2 md:row-end-3 md:!ml-6 group-[.small-card]:md:col-start-10">
          <CartRemoveButton cartOrProductId={cartId || productId} />
        </div>
      )}
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
      <span className="col-span-2 col-start-10 row-start-1 row-end-2 self-center font-semibold group-[.small-card]:self-start md:col-start-9 md:row-start-1 md:row-end-3 group-[.small-card]:md:col-span-2 group-[.small-card]:md:col-start-10 group-[.small-card]:md:row-start-1 group-[.small-card]:md:row-end-2">
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

"use client";
import React from "react";
import ChangeProductQty from "../ChangeProductQty";
import AddRemoveWishButton from "@/components/buttons/AddRemoveWishButton";
import AddToCartButton from "@/components/buttons/AddToCartButton";
import { ProductDetailsResponseT } from "@/types/apiResponse";
import { useChangeProductQty } from "@/hooks/useChangeProductQty";
import { RevalidationType } from "@/types";
import { useAuthorization } from "@/hooks/useAuthorization";

interface WishlistCartQtySectionProps {
  product: ProductDetailsResponseT["product"];
  revalidationType: RevalidationType;
}

const WishlistCartQtySection = ({
  product,
  revalidationType,
}: WishlistCartQtySectionProps) => {
  const productsQty = useChangeProductQty((s) => s.productsQty[product?.id]);
  const currentQty = productsQty || 1; // Get the quantity for the specific product

  const { authorization  } = useAuthorization();
  return (
    <>
      <div className="flex w-full flex-wrap gap-6">
        <div className="flex gap-2 rounded-md bg-accent">
          <ChangeProductQty
            id={product.id}
            stock={product.stock}
            cartItemQty={1}
            revalidationType={revalidationType}
            isCartUpdate={false}
          />
        </div>
        {/* <AddRemoveWishButton productId={product.id} /> */}
      </div>

      <AddToCartButton
        productId={product.id}
        className="text-lg font-semibold"
        size={"lg"}
        qty={currentQty}
      />
    </>
  );
};

export default WishlistCartQtySection;

"use client";

import React, { useEffect, useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { addToCart } from "@/query/cart";
import { useCartSidebar } from "@/hooks/useCartSidebar";
import { addCartApi } from "@/constant/apiRoute";
import axios from "axios";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import { AddCartResponseT } from "@/types/apiResponse";

interface AddToCartButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    ButtonProps {
  productId: string;
  qty?: number;
  authorization?: string;
}

const AddToCartButton = ({
  children,
  className,
  productId,
  qty = 1,
  authorization,
  ...rest
}: AddToCartButtonProps) => {
  const pathname = usePathname();
  const onOpen = useCartSidebar((s) => s.onOpen);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // Set the current cart item if data is fetched
    // if (data && "productId" in data && data.productId && !currentCartItem) {
    //   // setCurrentCartItem({
    //   //   productId: data.productId,
    //   //   qty: data.qty,
    //   // });
    // }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleAddToCart = async () => {
    const { data } = await axios.post<AddCartResponseT>(
      getBackendUrl(addCartApi),
      { productId, qty },
      {
        withCredentials: true,
        headers: {
          Authorization: authorization,
        },
      },
    );

    if (data?.id) {
      onOpen();
    }
  };

  return (
    <Button
      // variant={"def"}
      disabled={isLoading}
      size={"lg"}
      // key={data && "productId" in data ? data?.productId : ""}
      className={cn("mx-auto w-full gap-x-4", className)}
      {...rest}
      onClick={() => handleAddToCart()}
      // onClick={() => mutate({ productId, qty })}
      // onClick={currentCartItem ? removeFromCartHandle : handleAddToCart}
    >
      {children ? (
        children
      ) : (
        <>
          <ShoppingCartIcon /> Add to Cart
        </>
      )}
    </Button>
  );
};

export default AddToCartButton;

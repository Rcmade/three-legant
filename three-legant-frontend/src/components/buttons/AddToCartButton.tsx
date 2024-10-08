"use client";

import React, { useEffect } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addToCart } from "@/query/cart";
import { useCartSidebar } from "@/hooks/useCartSidebar";
import { getAllCartProductApi } from "@/constant/apiRoute";
import { getAllCart, revalidateAllCart } from "@/actions/cartAction";

interface AddToCartButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    ButtonProps {
  productId: string;
  qty?: number;
}

const AddToCartButton = ({
  children,
  className,
  productId,
  qty = 1,
  ...rest
}: AddToCartButtonProps) => {
  // const { currentQty } = useChangeProductQty();
  const pathname = usePathname();
  // const { refetch } = useQuery({
  //   queryKey: [getAllCartProductApi],
  //   enabled: false,
  //   queryFn: () => getAllCart(),
  // });
  const onOpen = useCartSidebar((s) => s.onOpen);

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

  const { isPending, mutate } = useMutation({
    mutationFn: addToCart,
    onSettled: async () => {
      onOpen();
    },
  });

  return (
    <Button
      // variant={"def"}
      disabled={isPending}
      size={"lg"}
      // key={data && "productId" in data ? data?.productId : ""}
      className={cn("mx-auto w-full gap-x-4", className)}
      {...rest}
      onClick={() => mutate({ productId, qty })}
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

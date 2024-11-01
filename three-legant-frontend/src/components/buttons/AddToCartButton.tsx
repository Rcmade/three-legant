"use client";

import React, { useEffect, useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCartSidebar } from "@/hooks/useCartSidebar";
import { addCartApi } from "@/constant/apiRoute";
import axios from "axios";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import { AddCartResponseT } from "@/types/apiResponse";
import { useAuthorization } from "@/hooks/useAuthorization";

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
  // authorization,
  ...rest
}: AddToCartButtonProps) => {
  const pathname = usePathname();
  const onOpen = useCartSidebar((s) => s.onOpen);
  const [isLoading, setIsLoading] = useState(false);
  const { authorization } = useAuthorization();
  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
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
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading}
      size={"lg"}
      className={cn("mx-auto w-full gap-x-4", className)}
      {...rest}
      onClick={() => handleAddToCart()}
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

"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChangeProductQtyProps, RevalidationType } from "@/types/index";
import { useChangeProductQty } from "@/hooks/useChangeProductQty";
import { toast } from "sonner";
import { exceedQtyMessage } from "@/constant";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import axios from "axios";
import { getAllCartProductApi, updateCartApi } from "@/constant/apiRoute";
import { UpdateCartResponseT } from "@/types/apiResponse";
import { useDebounce } from "@/hooks/useDebounce"; // Import the custom debounce hook
import { revalidateAllCart } from "@/actions/cartAction";
import { useCartSidebar } from "@/hooks/useCartSidebar";
import { useSWRConfig } from "swr";

interface ChangeProductQtyExtendedProps extends ChangeProductQtyProps {
  revalidationType?: RevalidationType;
  isCartUpdate?: boolean;
}
const ChangeProductQty = ({
  id,
  stock,
  cartItemQty,
  isCartUpdate = true,
}: ChangeProductQtyExtendedProps) => {
  const { productsQty, decreaseQty, increaseQty, setQty } =
    useChangeProductQty();
  const isOpen = useCartSidebar((s) => s.isOpen);
  const currentQty = productsQty[id] || cartItemQty || 1; // Get quantity for the specific product
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (currentQty === stock && stock !== 1) {
      toast.message(exceedQtyMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQty]);

  // API call to update the cart quantity
  const handleUpdateCartQty = async (qty: number) => {
    try {
      const { data } = await axios.put<UpdateCartResponseT>(
        getBackendUrl(updateCartApi) + id,
        { qty },
        {
          withCredentials: true,
        },
      );
      await revalidateAllCart();
      if (isOpen) {
        mutate(getBackendUrl(getAllCartProductApi));
      }
    } catch (error) {
      console.error("Failed to update cart quantity:", error);
      toast.error("Failed to update the cart. Please try again.");
    }
  };

  // Use the custom debounce hook
  const debouncedHandleUpdateCartQty = useDebounce(handleUpdateCartQty, 800);
  return (
    <>
      {/* Decrease Quantity Button */}
      <Button
        onClick={() => {
          decreaseQty({ id, stock, cartItemQty });
          isCartUpdate &&
            debouncedHandleUpdateCartQty(Math.max(currentQty - 1, 1));
        }}
        size="icon"
        variant="ghost"
        className="bg-accent text-primary"
      >
        <Minus />
      </Button>

      {/* Quantity Input Field */}
      <Input
        value={currentQty}
        onChange={(e) => {
          const qty = +e.target.value;
          setQty(qty, { stock, id, cartItemQty });
          isCartUpdate && debouncedHandleUpdateCartQty(Math.min(qty, stock));
        }}
        min={1}
        max={stock}
        type="number"
        className="relative z-10 w-10 border-none bg-transparent px-0 text-center"
      />

      {/* Increase Quantity Button */}
      <Button
        onClick={() => {
          increaseQty({ id, stock, cartItemQty });
          isCartUpdate &&
            debouncedHandleUpdateCartQty(Math.min(currentQty + 1, stock));
        }}
        size="icon"
        variant="ghost"
        className="bg-accent text-primary"
      >
        <Plus />
      </Button>
    </>
  );
};

export default ChangeProductQty;

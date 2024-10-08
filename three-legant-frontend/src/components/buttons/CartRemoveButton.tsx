"use client";
import React from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { revalidateAllCart } from "@/actions/cartAction";
import axios from "axios";
import { getAxiosErrorMessage, getBackendUrl } from "@/lib/utils/stringUtils";
import { deleteCartApi, getAllCartProductApi } from "@/constant/apiRoute";
import { CartsResponseT, DeleteCartResponseT } from "@/types/apiResponse";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useCartSidebar } from "@/hooks/useCartSidebar";
import { CartResponseT } from "@/types/apiTypes/addToCardTypes";
import { useSWRConfig } from "swr";

interface CartRemoveButtonProps {
  cartOrProductId: string;
}
const CartRemoveButton = ({ cartOrProductId }: CartRemoveButtonProps) => {
  const isOpen = useCartSidebar((s) => s.isOpen);
  const { mutate } = useSWRConfig();


  const handleRemove = async () => {
    try {
      const { data } = await axios.delete<DeleteCartResponseT>(
        getBackendUrl(deleteCartApi + cartOrProductId),
        {
          withCredentials: true,
        },
      );

      await revalidateAllCart(isOpen ? "path" : "tag");

      if (isOpen) {
        //   queryClient.setQueryData([getAllCartProductApi], (oldData) => {
        //     if (!oldData) return oldData; // Return if no cache exists
        //     // Filter out the item based on your unique identifier (e.g., `cartOrProductId`)
        //     return oldData.filter((item) => item.id !== cartOrProductId);
        //   });

        // queryClient.setQueryData<CartsResponseT>(
        //   [getAllCartProductApi],
        // //   (old) => {
        // //     if (!old) return old;
        // //     return old?.products.filter(
        // //       (item) => item.cartId !== cartOrProductId,
        // //     );
        // //   },
        // );

        // queryClient.invalidateQueries({
        //   queryKey: [getAllCartProductApi, { type: "done" }],
        // });

        // await queryClient.refetchQueries({
        //   queryKey: ["getAllCartProductApi"],
        //   exact: true,
        //   type: "active",
        // });

        mutate(getBackendUrl(getAllCartProductApi));
      }
    } catch (error) {
      console.log({ error });
      //   toast.error(getAxiosErrorMessage(error).error);
    }
  };
  return (
    <Button
      className="max-w-fit gap-2 font-semibold text-primary/75 md:px-0"
      variant="ghost"
      onClick={handleRemove}
    >
      <X />
      <span className="hidden md:block group-[.small-card]:md:!hidden">
        Remove
      </span>
    </Button>
  );
};

export default CartRemoveButton;

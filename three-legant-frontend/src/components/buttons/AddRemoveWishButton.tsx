"use client";

import React, { useEffect, useState } from "react";
import { Button, ButtonIconProps, ButtonProps } from "@/components/ui/button";
import { Heart, HeartOff } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import useSWR from "swr";
import { getAxiosErrorMessage, getBackendUrl } from "@/lib/utils/stringUtils";
import { addWishApi, getWishlistByIdOrProductIdApi } from "@/constant/apiRoute";
import { toast } from "sonner";
// import { useWishlistStore } from "@/hooks/useWishList";
import { fetcher } from "@/lib/utils/apiUtils";
import { AddWishListResponse } from "@/types/apiResponse";

// interface AddRemoveWishButtonProps
//   extends React.HTMLAttributes<
//     HTMLButtonElement & ButtonProps & ButtonIconProps
//   > {
//   productId: string;
// }

interface AddRemoveWishButtonProps {
  productId: string;
}
// const AddRemoveWishButton = ({
//   children,
//   className,
//   productId,
//   ...rest
// }: AddRemoveWishButtonProps) => {

const AddRemoveWishButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonIconProps & AddRemoveWishButtonProps
>(({ className, children, productId, ...rest }, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  // const {
  //   addToWishlist,
  //   currentWishlistItem,
  //   setCurrentWishlistItem,
  //   removeFromWishlist,
  // } = useWishlistStore();

  // Fetcher function for SWR

  // Use SWR to fetch the wishlist data
  const { data, error, mutate } = useSWR<AddWishListResponse>(
    getBackendUrl(`${getWishlistByIdOrProductIdApi}/${productId}`),
    fetcher,
    {
      revalidateOnFocus: false, // Optional: Prevent revalidation when window gains focus
      dedupingInterval: 3600 * 1000, // Cache for 1 hour
    },
  );

  const handleWishList = async () => {
    try {
      setIsLoading(true);

      // Add the product to the wishlist
      const { data } = await axios.post<AddWishListResponse>(
        getBackendUrl(addWishApi),
        {
          productId,
        },
        {
          withCredentials: true,
        },
      );

      // Update the Zustand store and SWR cache
      if ("productId" in data) {
        // setCurrentWishlistItem({ productId: data.productId });
        // addToWishlist({ productId: data.productId });
        toast.success("Product added to your wishlist!");

        // Mutate SWR to keep the cache in sync with the new data
        mutate(); // Optionally pass new data to mutate if needed
      } else {
        toast.error("Failed to add product to the wishlist. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      toast.error(
        getAxiosErrorMessage(error)?.error ||
          "An error occurred. Please try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const removeWishList = async () => {
    try {
      setIsLoading(true);

      // Remove the product from the wishlist
      await axios.delete(
        getBackendUrl(`${getWishlistByIdOrProductIdApi}/${productId}`),
        {
          withCredentials: true,
        },
      );

      // Update Zustand store and SWR cache
      // removeFromWishlist(productId);
      // setCurrentWishlistItem(null);
      toast.success("Product removed from your wishlist!");

      // Revalidate SWR cache after removal
      mutate();
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      toast.error("Failed to remove product from wishlist. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Set the current wishlist item if data is fetched
    // if (data && "productId" in data && data.productId && !currentWishlistItem) {
    //   // setCurrentWishlistItem({
    //   //   productId: data.productId,
    //   // });
    // }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Button
      // variant={currentWishlistItem ? "destructive-outline" : "outline"}
      disabled={isLoading}
      size={"lg"}
      className={cn("flex-1 gap-6", className)}
      {...rest}
      // onClick={currentWishlistItem ? removeWishList : handleWishList}
    >
      {children ? (
        children
      ) : (
        <>
          {/* {currentWishlistItem ? (
            <>
              <HeartOff /> Remove from Wishlist
            </>
          ) : (
            <>
              <Heart /> Wishlist
            </>
          )} */}
        </>
      )}
    </Button>
  );
});

AddRemoveWishButton.displayName = "AddRemoveWishButton";

export default AddRemoveWishButton;

import { shippingSearchParams } from "@/constant";
import { PageProps } from "@/types";
import {
  CartsResponseT,
  GetShippingMethodsResponseT,
} from "@/types/apiResponse";
import React from "react";

export interface SubtotalCardProps {
  cartData: Omit<CartsResponseT, "products" | "pagination">;
  pageProps?: Partial<PageProps>;
  currentType?: GetShippingMethodsResponseT[0];
  availableShippingMethods?: GetShippingMethodsResponseT;
}
const SubtotalCard = ({
  cartData,
  pageProps,
  currentType,
  // availableShippingMethods,
}: SubtotalCardProps) => {
  const shippingType = currentType;
  return (
    <div className="space-y-6">
      <p className="flex items-center justify-between border-b py-2">
        <span className="">Subtotal</span>
        <span className="font-semibold">${cartData?.subtotal}</span>
      </p>

      <p className="flex items-center justify-between border-b py-2">
        <span className="">Shipping</span>
        <span className="font-semibold">
          {+(shippingType?.cost || 0) ? `$${shippingType?.cost}` : "Free"}
        </span>
      </p>
      <p className="flex items-center justify-between py-2">
        <span className="text-xl font-semibold">Total</span>
        <span className="font-semibold">
          ${cartData?.total + +(shippingType?.cost || 0)}
        </span>
      </p>
    </div>
  );
};

export default SubtotalCard;

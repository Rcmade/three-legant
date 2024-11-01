"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  CartsResponseT,
  GetShippingMethodsResponseT,
} from "@/types/apiResponse";
import Link from "next/link";
import { shippingSearchParams } from "@/constant";
import SubtotalCard from "./SubtotalCard";
import SelectAvailableShippingMethods from "../sections/SelectAvailableShippingMethods";

export interface CartSummaryCardProps {
  cartData: CartsResponseT;
  availableShippingMethods: GetShippingMethodsResponseT;
}

const CartSummaryCard = ({
  cartData,
  availableShippingMethods,
}: CartSummaryCardProps) => {
  const defaultShippingType = availableShippingMethods[0];
  const [shippingType, setShippingType] = useState<
    typeof defaultShippingType | undefined
  >(defaultShippingType);

  return (
    <Card className="max-h-fit border-primary">
      <CardHeader>
        <CardTitle className="whitespace-nowrap font-medium">
          Cart summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SelectAvailableShippingMethods
          availableShippingMethods={availableShippingMethods}
          setState={(e) => setShippingType(e)}
        />
        <SubtotalCard
          cartData={{ subtotal: cartData.subtotal, total: cartData.total }}
          currentType={shippingType}
          availableShippingMethods={availableShippingMethods}
        />
        <Button asChild className="w-full">
          <Link
            href={`/user/checkout?${shippingSearchParams}=${shippingType?.id}`}
          >
            Checkout
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartSummaryCard;

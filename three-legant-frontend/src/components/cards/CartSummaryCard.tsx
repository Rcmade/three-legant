import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { CartsResponseT } from "@/types/apiResponse";

interface CartSummaryCardProps {
  cartData: CartsResponseT;
}

const CartSummaryCard = ({ cartData }: CartSummaryCardProps) => {
  return (
    <Card className="max-h-fit border-primary">
      <CardHeader>
        <CardTitle className="whitespace-nowrap font-medium">
          Cart summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup defaultValue="free-shipping" className="space-y-2">
          <Label
            htmlFor="free-shipping"
            className="flex cursor-pointer items-center gap-2 rounded-md border border-primary p-3 transition-all hover:bg-accent/40 lg:w-72"
          >
            <RadioGroupItem value="free-shipping" id="free-shipping" />
            <span>Free Shipping</span>
          </Label>
          <Label
            htmlFor="express-shipping"
            className="flex cursor-pointer items-center gap-2 rounded-md border border-primary p-3 transition-all hover:bg-accent/40 lg:w-72"
          >
            <RadioGroupItem value="express-shipping" id="express-shipping" />
            <span> Express Shipping</span>
          </Label>

          <Label
            htmlFor="pick-up"
            className="flex cursor-pointer items-center gap-2 rounded-md border border-primary p-3 transition-all hover:bg-accent/40 lg:w-72"
          >
            <RadioGroupItem value="pick-up" id="pick-up" />
            <span> Pick Up</span>
          </Label>
        </RadioGroup>

        <p className="flex items-center justify-between border-b py-2">
          <span className="">Subtotal</span>
          <span className="font-semibold">${cartData?.subtotal}</span>
        </p>
        <p className="flex items-center justify-between py-2">
          <span className="text-xl font-semibold">Total</span>
          <span className="font-semibold">${cartData?.total}</span>
        </p>
        <Button className="w-full">Checkout</Button>
      </CardContent>
    </Card>
  );
};

export default CartSummaryCard;

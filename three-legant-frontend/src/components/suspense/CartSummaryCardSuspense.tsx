import React, { Suspense } from "react";
import CartSummaryCard, {
  CartSummaryCardProps,
} from "../cards/CartSummaryCard";
import { getAvailableShipping } from "@/actions/shippingAction";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface CartSummaryCardSuspenseProps
  extends Omit<CartSummaryCardProps, "availableShippingMethods"> {}
const CartSummaryCardSuspense = ({
  cartData,
}: CartSummaryCardSuspenseProps) => {
  return (
    <Suspense
      fallback={
        <Card className="max-h-fit border-primary lg:w-96">
          <CardHeader>
            <Skeleton className="p-4" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 rounded-md border p-4">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 flex-1" />
            </div>
            <div className="flex items-center gap-4 rounded-md border p-4">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 flex-1" />
            </div>
            <div className="flex items-center gap-4 rounded-md border p-4">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 flex-1" />
            </div>
            <p className="flex items-center justify-between border-b py-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </p>
            <p className="flex items-center justify-between border-b py-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </p>
            <p className="flex items-center justify-between border-b py-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </p>
          </CardContent>
        </Card>
      }
    >
      <CartSummaryPromise cartData={cartData} />
    </Suspense>
  );
};

export default CartSummaryCardSuspense;

const CartSummaryPromise = async ({
  cartData,
}: CartSummaryCardSuspenseProps) => {
  //   await wait(3000);
  const data = await getAvailableShipping();
  return (
    <CartSummaryCard availableShippingMethods={data} cartData={cartData} />
  );
};

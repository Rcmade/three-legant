import { getOrderBySecret } from "@/actions/ordersAction";
import TitleWithBreadcrumb from "@/components/sections/TitleWithBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { orderComplete } from "@/content/checkoutContent";
import { formatCurrency } from "@/lib/utils/currencyUtils";
import { formatDateTime } from "@/lib/utils/dateUtils";
import { PageProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ searchParams }: PageProps) => {
  const orders = await getOrderBySecret(
    searchParams?.payment_intent_client_secret,
  );

  return (
    <div>
      <TitleWithBreadcrumb title="Complete!" currentState={orderComplete} />

      {orders ? (
        <Card className="my-6 flex flex-col items-center space-y-6 border-none px-4 py-8 shadow-xl">
          <CardHeader>
            <CardTitle>Thank you! 🎉</CardTitle>
          </CardHeader>
          <h1 className="text-center text-3xl font-medium">
            Your order has been received
          </h1>
          <div className="mx-auto flex flex-wrap gap-5">
            {(orders.items || []).map((i, index) => (
              <div
                key={index}
                className="relative max-h-fit max-w-fit bg-accent"
              >
                <Image
                  src={i.primaryImage}
                  width={100}
                  height={100}
                  alt="banner"
                  className="object-contain"
                />
                <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  {i.qty}
                </span>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 md:max-w-96 md:flex-row">
              <span className="text-muted-foreground">Order Code:</span>
              <span className="font-medium text-primary">
                {orders.order.id}
              </span>
            </div>
            <div className="flex flex-col justify-between gap-4 md:max-w-96 md:flex-row">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium text-primary">
                {formatDateTime(orders.order.createdAt)}
              </span>
            </div>
            <div className="flex flex-col justify-between gap-4 md:max-w-96 md:flex-row">
              <span className="text-muted-foreground">Total:</span>
              <span className="font-medium text-primary">
                ${formatCurrency(+orders.order.totalAmount)}
              </span>
            </div>
          </div>
          <Button className="rounded-full px-6" asChild>
            <Link href="/user/orders">Purchase History</Link>
          </Button>
        </Card>
      ) : (
        <h1 className="my-6 text-center text-2xl text-destructive">
          No order found
        </h1>
      )}
    </div>
  );
};

export default page;

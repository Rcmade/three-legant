import { getUserOrder } from "@/actions/orderAction";
import OrderPaymentBadge from "@/components/badge/OrderPaymentBadge";
import OrderItemCard from "@/components/cards/OrderItemCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/utils/dateUtils";
import { createQueryString } from "@/lib/utils/stringUtils";
import { PageProps } from "@/types";
import Link from "next/link";
import React from "react";

const Page = async ({ searchParams }: PageProps) => {
  const orders = await getUserOrder(createQueryString(searchParams));

  return (
    <div className="flex flex-col gap-6">
      {(orders?.orders || []).map((order) => (
        <Card key={order.id} className="relative mx-auto w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Order #{order.id}
            </CardTitle>
            <OrderPaymentBadge status={order.status}/>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm">{formatDateTime(order.createdAt)}</div>
              <div className="text-2xl font-bold">
                ${parseFloat(order.totalAmount).toFixed(2)}
              </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
              {order.items.map((item) => (
                <OrderItemCard key={item.orderItemId} item={item} />
              ))}
            </div>
          </CardContent>
          <Link
            href={`/user/orders/${order.id}`}
            className="absolute inset-0"
          ></Link>
        </Card>
      ))}
    </div>
  );
};

export default Page;

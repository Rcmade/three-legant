import React from "react";
import { GetUserOrdersResponseT } from "@/types/apiResponse";
import Image from "next/image";
import Link from "next/link";
import { getProductNavigateString } from "@/lib/utils/stringUtils";

type OrderItem = GetUserOrdersResponseT["orders"][number]["items"][number];

const OrderItemCard = ({ item }: { item: OrderItem }) => (
  <div className="flex items-center space-x-4 border-b py-2 last:border-b-0">
    <div className="relative flex h-[96px] max-h-[98px] min-h-[96px] w-[96px] min-w-[96px] max-w-[98px] items-center justify-center overflow-hidden rounded-md bg-accent">
      <Image src={item.primaryImage} alt={item.name} width={200} height={200} />
      <Link
        className="absolute inset-0 z-10"
        href={getProductNavigateString(":", item.productId)}
      />
    </div>
    <div className="flex-1 space-y-2">
      <p className="flex-1 text-sm font-medium text-primary">{item.name}</p>
      <div className="flex flex-1 flex-wrap justify-between gap-4">
        <p className="text-sm text-primary/80">
          Qty: {item.qty} x ${parseFloat(item.price).toFixed(2)}
        </p>
        <p className="text-sm font-medium">
          ${(item.qty * parseFloat(item.price)).toFixed(2)}
        </p>
      </div>
    </div>
  </div>
);

export default OrderItemCard;

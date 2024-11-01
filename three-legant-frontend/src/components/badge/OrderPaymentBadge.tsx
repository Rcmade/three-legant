import { cn } from "@/lib/utils";
import { GetUserOrdersResponseT } from "@/types/apiResponse";
import React from "react";
import { Badge } from "@/components/ui/badge";

const statusColors = {
  pending: "bg-secondary-orange text-primary hover:bg-secondary-orange/80",
  paid: "bg-secondary-green text-primary hover:bg-secondary-green/80",
  cancel: "bg-secondary-red text-primary hover:bg-secondary-red/80",
  failed: "bg-red-500 text-primary hover:bg-red-500/80",
};

interface OrderPaymentBadgeProps {
  status: GetUserOrdersResponseT["orders"][number]["status"];
}
const OrderPaymentBadge = ({ status }: OrderPaymentBadgeProps) => {
  return (
    <Badge className={cn("min-w-[20px]", statusColors[status])}>{status}</Badge>
  );
};

export default OrderPaymentBadge;

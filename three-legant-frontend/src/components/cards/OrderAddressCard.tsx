import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetOrderByIdResponseT } from "@/types/apiResponse";
import { MapPin } from "lucide-react";

const OrderAddressCard = ({
  address,
}: {
  address: GetOrderByIdResponseT["userShippingAddress"];
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-2xl font-bold">Shipping Address</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-start space-x-4">
        <MapPin className="mt-1 h-5 w-5 flex-shrink-0" />
        <div>
          <p className="font-semibold">
            {address.firstName} {address.lastName}
          </p>
          <p>{address.street}</p>
          <p>
            {address.city}, {address.state} {address.zipCode}
          </p>
          <p>{address.country}</p>
          <p className="mt-2">{address.email}</p>
          <p>{address.phone}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default OrderAddressCard;

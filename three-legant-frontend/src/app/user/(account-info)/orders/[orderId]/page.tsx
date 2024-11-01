import { getUserOrderById } from "@/actions/orderAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/currencyUtils";
import { formatDateTime } from "@/lib/utils/dateUtils";
import OrderItemCard from "@/components/cards/OrderItemCard";
import OrderAddressCard from "@/components/cards/OrderAddressCard";
import OrderPaymentBadge from "@/components/badge/OrderPaymentBadge";

const OrderDetailsPage = async ({
  params,
}: {
  params: { orderId: string };
}) => {
  const { orderId } = params;
  const orderDetails = await getUserOrderById(orderId);

  if (!orderDetails) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold">Order Not Found</h1>
        <p>Sorry, we couldn&apos;t find the order you&apos;re looking for.</p>
      </main>
    );
  }

  const { orders: order, userShippingAddress } = orderDetails;

  return (
    <div className="container mx-auto max-w-3xl space-y-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Order Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <InfoRow label="Date" value={formatDateTime(order.createdAt)} />
          <InfoRow label="Order ID" value={`#${order.id}`} />
          <InfoRow
            label="Total Amount"
            value={`$${formatCurrency(+order.totalAmount)}`}
          />
          <InfoRow
            label="Payment Status"
            value={<OrderPaymentBadge status={order.status} />}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Order Items</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {order.items.map((item) => (
            <OrderItemCard key={item.orderItemId} item={item} />
          ))}
        </CardContent>
      </Card>

      <OrderAddressCard address={userShippingAddress} />
    </div>
  );
};

export default OrderDetailsPage;

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-center justify-between">
    <span className="font-semibold">{label}:</span>
    <span>{value}</span>
  </div>
);

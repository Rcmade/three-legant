import stripe from "stripe";

const stripeCon = new stripe(process.env.STRIPE_SECRET_KEY!);
const calculateOrderAmount = (items: any) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

export async function POST(req: Request) {
  const { items, ...rest } = await req.json();

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripeCon.paymentIntents.create({
    amount: calculateOrderAmount(items),
    shipping: {
      name: "Jenny Rosen",
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
    },
    currency: "usd",
    description: "Software development services",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });
  return Response.json({
    clientSecret: paymentIntent.client_secret,
  });

  //   res.send({
  //     clientSecret: paymentIntent.client_secret,
  //     // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
  //     dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
  //   });
}

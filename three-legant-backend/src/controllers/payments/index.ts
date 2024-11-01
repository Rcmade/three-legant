import stripe from "stripe";
import { db } from "@/db/db";
import { shippingAddress } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getAllCartProducts } from "../user/cart";
import { getAddresses } from "../address";
import { PaymentIntentRequestT } from "@/types";
import { generateHash } from "@/lib/utils/cryptoUtils";
import { convertToCents } from "@/lib/utils/mathUtils";

export const createPaymentIntent = async (
  userId: string,
  data: PaymentIntentRequestT,
  verifyOnly = false
) => {
  const [shippingMethod] = await db
    .select()
    .from(shippingAddress)
    .where(eq(shippingAddress.id, data.shippingMethodId))
    .limit(1)
    .execute();

  if (!shippingMethod) {
    throw new Error("Invalid shipping method.");
  }

  const userCart = await getAllCartProducts(userId, { noLimit: true });

  const hash = generateHash({ userCart, userId, data });

  if (userCart.products.length === 0) {
    throw new Error("Cart is empty.");
  }

  const totalAmount = userCart.total + +(shippingMethod.shippingCost || 0);
  const [userShippingAddress] = await getAddresses(userId, true);

  if (!userShippingAddress) {
    throw new Error("User shipping address not found.");
  }

  const totalAmountInCents = convertToCents(totalAmount);

  if (verifyOnly) {
    return {
      cart: userCart,
      totalAmount,
      totalAmountInCents,
      clientSecret: null,
      id: null,
    };
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    throw new Error("Stripe secret key is not configured.");
  }

  const stripeCon = new stripe(stripeSecretKey);

  const productDescription = userCart.products
    .map((item) => `${item.qty}x ${item.name}`)
    .join(", ");

  const shipping: stripe.PaymentIntentCreateParams.Shipping = {
    name: `${userShippingAddress.firstName} ${userShippingAddress.lastName}`,
    phone: userShippingAddress.phone || "N/A",
    carrier: shippingMethod.title || "Standard Shipping",
    address: {
      line1: userShippingAddress.street,
      postal_code: userShippingAddress.zipCode,
      city: userShippingAddress.city,
      state: userShippingAddress.state,
      country: userShippingAddress.country,
    },
  };

  const metadata: stripe.MetadataParam = {
    userId,
    shippingMethod: shippingMethod.title,
    productCount: userCart.products.length,
    id: hash,
  };

  let paymentIntent: stripe.PaymentIntent;

  if (data.clientSecret) {
    try {
      const intentId = data.clientSecret.split("_secret_")[0];

      if (!intentId) {
        throw new Error("Invalid client secret format.");
      }

      paymentIntent = await stripeCon.paymentIntents.update(intentId, {
        amount: totalAmountInCents,
        description: productDescription,
        shipping,
        metadata,
      });

    } catch (error: any) {
      throw new Error(`Failed to update payment intent: ${error.message}`);
    }
  } else {
    try {
      paymentIntent = await stripeCon.paymentIntents.create({
        amount: totalAmountInCents,
        currency: "usd",
        description: productDescription,
        automatic_payment_methods: { enabled: true },
        shipping,
        metadata,
      });


    } catch (error: any) {
      throw new Error(`Failed to create payment intent: ${error.message}`);
    }
  }

  return {
    clientSecret: paymentIntent.client_secret,
    id: hash,
  };
};

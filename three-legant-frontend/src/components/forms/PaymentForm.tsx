"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import axios from "axios";
import { useAuthorization } from "@/hooks/useAuthorization";
import FormResultMessage from "../alerts/FormResultMessage";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createPaymentIntentApi,
  createTempOrderApi,
} from "@/constant/apiRoute";
import { getAxiosErrorMessage, getBackendUrl } from "@/lib/utils/stringUtils";
import { intentSecretParams } from "@/constant";
import {
  CartsResponseT,
  CreatePaymentIntentRequestT,
  CreatePaymentIntentResponseT,
  CreateTempOrderResponseT,
  GetAddressResponseT,
  GetShippingMethodsResponseT,
} from "@/types/apiResponse";
import { updateSearchParams } from "@/lib/utils/urlUtils";
import { Loader } from "lucide-react";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
  : Promise.reject("Stripe public key is not configured.");

interface PaymentFormProps {
  contactInfo: GetAddressResponseT[0];
  currentShippingType?: GetShippingMethodsResponseT[0];
  cart: CartsResponseT | undefined;
}

const PaymentForm = ({
  contactInfo,
  currentShippingType,
  cart,
}: PaymentFormProps) => {
  const searchParams = useSearchParams();
  const [clientSecret, setClientSecret] = useState<string | null>(
    searchParams.get(intentSecretParams),
  );
  const [error, setError] = useState<string | null>(null);
  const { authorization } = useAuthorization();

  const createPaymentIntent = useCallback(async () => {
    try {
      const { data } = await axios.post<CreatePaymentIntentResponseT>(
        getBackendUrl(createPaymentIntentApi),
        {
          shippingMethodId: currentShippingType?.id,
          clientSecret: clientSecret || undefined,
        } as CreatePaymentIntentRequestT,
        {
          withCredentials: true,
          headers: { Authorization: authorization },
        },
      );
      // const url = new URL(window.location.href);
      // url.searchParams.set(intentSecretParams, data.clientSecret!);
      // window.history.replaceState(null, "", url);
      updateSearchParams(intentSecretParams, data.clientSecret!);
      setClientSecret(data.clientSecret);
    } catch (err: any) {
      console.error(err);
      setError(getAxiosErrorMessage(err).error || "Something went wrong.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentShippingType?.id, authorization]);

  useEffect(() => {
    createPaymentIntent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const options: StripeElementsOptions = {
    clientSecret: clientSecret!,
    appearance: { theme: "stripe" },
  };

  if (!clientSecret) return <p>Loading payment form...</p>;

  return (
    <div>
      {error && <FormResultMessage message={error} variant="destructive" />}
      <Elements key={clientSecret} stripe={stripePromise} options={options}>
        <CheckoutForm
          currentShippingType={currentShippingType}
          clientSecret={clientSecret}
          contactInfo={contactInfo}
          cart={cart}
        />
      </Elements>
    </div>
  );
};

const CheckoutForm = ({
  contactInfo,
  clientSecret,
  currentShippingType,
}: PaymentFormProps & { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const { authorization } = useAuthorization();
  const { replace } = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setLoading(true);
    setPaymentError(null);

    if (!authorization) {
      setPaymentError("Please sign in to complete the payment");
      setLoading(false);
      return;
    }

    try {
      const tempOrderData = {
        shippingId: contactInfo.id,
        clientSecret,
        shippingMethodId: currentShippingType?.id,
      };

      const validate = await elements.submit();
      if (validate.error) {
        setPaymentError(validate.error.message || "");
        return;
      }

      await axios.post<CreateTempOrderResponseT>(
        getBackendUrl(createTempOrderApi),
        tempOrderData,
        {
          headers: { Authorization: authorization },
          withCredentials: true,
        },
      );

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        // confirmParams: {
        //   return_url: `${process.env.NEXT_PUBLIC_URL}/user/order-complete`,
        // },
      });
      
      const redirectUrl = `${process.env.NEXT_PUBLIC_URL}/user/order-complete?payment_intent=${paymentIntent?.id}&payment_intent_client_secret=${paymentIntent?.client_secret}&redirect_status=${paymentIntent?.status}`;
      replace(redirectUrl);

      if (error) {
        setPaymentError(error.message || "Payment failed.");
      } else {
        console.log("Payment successful! Redirecting...");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError(
        getAxiosErrorMessage(error)?.error || "Unexpected error occurred.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {loading && (
        <div className="fixed inset-0 z-50 flex h-screen w-screen cursor-progress items-center justify-center bg-primary/30">
          <Loader className="h-12 w-12 animate-spin" />
        </div>
      )}
      <PaymentElement />
      {paymentError && (
        <FormResultMessage message={paymentError} variant="destructive" />
      )}
      <Button disabled={!stripe || loading} className="w-full">
        {loading ? "Processing..." : "Place Order"}
      </Button>
    </form>
  );
};

export default PaymentForm;

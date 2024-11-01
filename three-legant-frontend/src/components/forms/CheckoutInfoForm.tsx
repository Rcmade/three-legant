"use client";
import React, { useState } from "react";
import PaymentForm from "@/components/forms/PaymentForm";
import ContactInfoSection from "@/components/forms/formSections/ContactInfoSection";
import { useForm } from "react-hook-form";
import { CheckoutPageCurrentFormT, CheckoutSchemaT } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { checkoutSchema } from "@/zodSchema/checkoutSchema";
import ShippingInfoFormSection from "@/components/forms/formSections/ShippingInfoFormSection";
import FormCardWrapper from "@/components/layout/FormCardWrapper";
import axios from "axios";
import { deliveryAddressApi, getAddressesApi } from "@/constant/apiRoute";
import { getAxiosErrorMessage, getBackendUrl } from "@/lib/utils/stringUtils";
import { useAuthorization } from "@/hooks/useAuthorization";
import {
  AddAddressResponseT,
  CartsResponseT,
  GetAddressResponseT,
  GetShippingMethodsResponseT,
} from "@/types/apiResponse";
import { Edit, Plus, X } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils/apiUtils";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

export interface CheckoutInfoFormProps {
  latestAddress: GetAddressResponseT[0] | null;
  currentShippingType?: GetShippingMethodsResponseT[0];
  cart: CartsResponseT | undefined;
}
const CheckoutInfoForm = ({
  latestAddress,
  currentShippingType,
  cart,
}: CheckoutInfoFormProps) => {
  const [currentAddress, setCurrentAddress] = useState(latestAddress);
  const [changeCurrentAddress, setChangeCurrentAddress] =
    useState<typeof latestAddress>();

  const [currentFormState, setCurrentFormState] =
    useState<CheckoutPageCurrentFormT>(
      latestAddress?.id ? "payment" : "contactInfo",
    );
  const form = useForm<CheckoutSchemaT>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      city: "",
      country: "",
      state: "",
      street: "",
      zipCode: "",
    },
  });

  const { authorization } = useAuthorization();

  const { data } = useSWR<GetAddressResponseT>(
    currentAddress ? null : getBackendUrl(getAddressesApi),
    (url: string) => {
      return fetcher(url, {
        cache: "no-store",
        headers: {
          Authorization: authorization!,
        },
      });
    },
  );

  const handleSubmit = async (values: CheckoutSchemaT) => {
    try {
      const { data: resData } = await axios.post<AddAddressResponseT>(
        getBackendUrl(deliveryAddressApi),
        values,
        {
          headers: {
            Authorization: authorization,
          },
        },
      );

      setCurrentAddress(resData);
      setCurrentFormState("payment");
    } catch (error) {
      toast.error(getAxiosErrorMessage(error)?.error);
      console.log({ error });
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <div className="flex flex-1 flex-col gap-6">
      {!currentAddress?.id && currentFormState !== "contactInfo" && (
        <div className="space-y-4">
          <div className="flex w-full justify-between">
            <h3 className="text-lg font-semibold">Your address</h3>
            <Button
              onClick={() =>
                setCurrentAddress(changeCurrentAddress || latestAddress)
              }
              size="sm"
              variant="ghost"
            >
              <X /> Close
            </Button>
          </div>
          <RadioGroup
            className="max-w-full overflow-hidden"
            defaultValue={latestAddress?.id}
          >
            <div className="space-y-2">
              {(data || [])?.map((address) => (
                <div
                  key={address.id}
                  onClick={() => {
                    setChangeCurrentAddress(address);
                  }}
                  className="flex w-full gap-2"
                >
                  <RadioGroupItem value={address?.id} id={address?.id} />
                  <Label htmlFor={address?.id} className="w-full">
                    <div className="flex w-full max-w-full flex-1 flex-col text-sm">
                      <div className="flex max-w-full flex-1 justify-between">
                        <div className="flex max-w-[calc(100%-1rem)] flex-col flex-wrap">
                          <span className="flex flex-wrap whitespace-pre-line">
                            <span className="mr-1"> {address?.firstName}</span>
                            {address?.lastName}
                          </span>
                          <span className="whitespace-nowrap">
                            {address?.phone}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          className="z-10"
                          onClick={(e) => {
                            e.stopPropagation();
                            form.reset(address);
                            setCurrentFormState("contactInfo");
                          }}
                        >
                          <Edit />
                        </Button>
                      </div>
                      <div className="flex flex-row flex-wrap items-start gap-2">
                        <span className="whitespace-nowrap md:whitespace-normal">
                          {address?.street}
                        </span>
                        <span className="whitespace-nowrap md:whitespace-normal">
                          {address?.city}, {address?.state}
                          <span> {address?.zipCode}</span>
                        </span>
                        <span className="whitespace-nowrap md:whitespace-normal">
                          {address?.country}
                        </span>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          <Button
            className="text-primary/80"
            size="sm"
            onClick={() => setCurrentFormState("contactInfo")}
            variant="ghost"
          >
            <Plus /> Add a new address
          </Button>
        </div>
      )}
      {currentAddress?.id && (
        <div className="flex flex-col justify-between md:flex-row">
          <h3 className="text-lg font-semibold">Delivery Address</h3>
          <div className="relative flex items-start">
            <div className="flex max-w-full flex-1 flex-col overflow-hidden text-sm">
              <span>
                {currentAddress?.firstName} {currentAddress?.lastName}
              </span>
              <span className="whitespace-nowrap md:whitespace-normal">
                {currentAddress?.phone}
              </span>
              <div className="flex flex-row md:flex-col">
                <span className="whitespace-nowrap md:whitespace-normal">
                  {currentAddress?.street}
                </span>
                <span className="whitespace-nowrap md:whitespace-normal">
                  {currentAddress?.city}, {currentAddress?.state}
                  {currentAddress?.zipCode}
                </span>
                <span className="whitespace-nowrap md:whitespace-normal">
                  {currentAddress?.country}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => setCurrentAddress(null)}
              className="absolute right-0 max-w-fit px-2 backdrop-blur-sm md:hidden"
            >
              Change
            </Button>
          </div>
          <Button
            variant="ghost"
            onClick={() => setCurrentAddress(null)}
            className="hidden max-w-fit px-2 md:flex"
          >
            Change
          </Button>
        </div>
      )}
      {currentFormState === "contactInfo" && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="relative">
              <div className="sticky top-0 -mb-11 mr-4 flex justify-end sm:-mb-14">
                <Button
                  onClick={() => {
                    setCurrentAddress(latestAddress);
                    setCurrentFormState("payment");
                  }}
                  className="p-2"
                  type="button"
                  variant="ghost"
                >
                  <X />
                </Button>
              </div>
              <ContactInfoSection
                title="Contact Information"
                isLoading={isLoading}
                control={form.control as any}
              />
              <ShippingInfoFormSection
                isLoading={isLoading}
                control={form.control as any}
              />
            </div>

            <Button
              disabled={isLoading}
              type="submit"
              size="lg"
              className="w-full"
            >
              Use this address
            </Button>
          </form>
        </Form>
      )}
      {currentFormState === "payment" && currentAddress && (
        <FormCardWrapper title="Payment Method">
          <PaymentForm
            currentShippingType={currentShippingType}
            contactInfo={currentAddress}
            cart={cart}
          />
        </FormCardWrapper>
      )}
    </div>
  );
};

export default CheckoutInfoForm;

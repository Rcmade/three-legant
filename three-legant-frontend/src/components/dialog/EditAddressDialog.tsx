"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEditAddressDialog } from "@/hooks/useEditAddressDialog";
import { UserAddressSchemaT } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAddressSchema } from "@/zodSchema/addressSchema";
import ContactInfoSection from "@/components/forms/formSections/ContactInfoSection";
import { Form } from "@/components/ui/form";
import { useEffect } from "react";
import ShippingInfoFormSection from "@/components/forms/formSections/ShippingInfoFormSection";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { AddAddressRequestT, AddAddressResponseT } from "@/types/apiResponse";
import { getAxiosErrorMessage, getBackendUrl } from "@/lib/utils/stringUtils";
import { deliveryAddressApi, getAddressesApi } from "@/constant/apiRoute";
import { useAuthorization } from "@/hooks/useAuthorization";
import { clientRevalidate } from "@/actions/clientRevalidate";
import { useFormResponseMessage } from "@/hooks/useFormResponseMessage";
import FormResultMessage from "../alerts/FormResultMessage";

const EditAddressDialog = () => {
  const { isOpen, onClose, address } = useEditAddressDialog();

  const { setResponseMessage, message, type } = useFormResponseMessage();
  const { authorization } = useAuthorization();
  const form = useForm<UserAddressSchemaT>({
    resolver: zodResolver(userAddressSchema),
    defaultValues: {
      email: address?.email,
      firstName: address?.firstName,
      lastName: address?.lastName,
      phone: address?.phone,
      city: address?.city,
      country: address?.country,
      state: address?.state,
      street: address?.street,
      zipCode: address?.zipCode,
    },
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    if (address) {
      form.reset(address);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const handleSubmit = async (values: UserAddressSchemaT) => {
    try {
      const body: AddAddressRequestT = values;
      const { data: resData } = await axios.post<AddAddressResponseT>(
        getBackendUrl(deliveryAddressApi),
        body,
        {
          headers: {
            Authorization: authorization,
          },
        },
      );

      await clientRevalidate(getAddressesApi, "tag");
      onClose();
    } catch (error: any) {
      setResponseMessage(getAxiosErrorMessage(error).error, error.message);
    }
  };

  console.log({ errors: form.formState.errors });
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="scrollbar max-h-[calc(100vh-2rem)] overflow-auto p-2 md:p-6"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit Address</DialogTitle>
          <DialogDescription className="sr-only">
            Edit your address details to save changes .
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <ContactInfoSection
              title="Contact Info"
              control={form.control as any}
              isLoading={isLoading}
              isSubmit={false}
            />

            <ShippingInfoFormSection
              // title=""
              control={form.control as any}
              isLoading={isLoading}
              isSubmit={false}
            />

            <FormResultMessage message={message} variant={type} />

            <Button disabled={isLoading} className="w-full">
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAddressDialog;

"use client";
import React from "react";
import ContactInfoForm from "./ContactInfoForm";
import ShippingInfoForm from "./ShippingInfoForm";
import PaymentForm from "./PaymentForm";

const CheckoutInfoForm = () => {
  return (
    <div className="flex  flex-1 flex-col gap-6">
      <ContactInfoForm />
      <ShippingInfoForm />
      <PaymentForm />
    </div>
  );
};

export default CheckoutInfoForm;

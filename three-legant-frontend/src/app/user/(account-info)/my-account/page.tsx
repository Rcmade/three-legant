import FormCardWrapper from "@/components/layout/FormCardWrapper";
import React from "react";
import AccountDetailsForm from "./_AccountDetailsForm";

const page = () => {
  return (
    <div className="">
      <FormCardWrapper className="border-0" title="Account Details">
        <AccountDetailsForm />
      </FormCardWrapper>
    </div>
  );
};

export default page;

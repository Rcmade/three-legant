import { getUserAddresses } from "@/actions/addressAction";
import AddNewAddressButton from "@/components/buttons/AddNewAddressButton";
import EditAddressButton from "@/components/buttons/EditAddressButton";
import EditAddressDialog from "@/components/dialog/EditAddressDialog";
import FormCardWrapper from "@/components/layout/FormCardWrapper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, Pencil } from "lucide-react";
import React from "react";

const page = async () => {
  const address = await getUserAddresses();
  return (
    <FormCardWrapper
      withTitle={<AddNewAddressButton />}
      className="border-0"
      title="Addresses"
    >
      <div className="flex flex-wrap gap-6">
        {address.map((a) => (
          <Card
            key={a.id}
            className="flex min-w-36 flex-1 flex-col p-4 text-base font-medium"
          >
            <div className="flex justify-between">
              <h1 className="text-lg font-semibold">{a.street}</h1>
              <EditAddressButton data={a} />
            </div>

            <span>{a.phone}</span>

            <span>
              {a.city} , {a.state} , {a.country}, {a.zipCode}
            </span>
          </Card>
        ))}
      </div>
      <EditAddressDialog />
    </FormCardWrapper>
  );
};

export default page;

import FormCardWrapper from "@/components/layout/FormCardWrapper";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AddressInfoT } from "@/types";
import React from "react";
import { Control } from "react-hook-form";

interface ShippingInfoFormSectionProps {
  control: Control<AddressInfoT, any>;
  isSubmit?: boolean;
  isLoading?: boolean;
}
const ShippingInfoFormSection = ({
  control,
  isSubmit,
  isLoading
}: ShippingInfoFormSectionProps) => {
  return (
    <FormCardWrapper title="Shipping">
      <div className="space-y-8">
        <FormField
          control={control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase">Street Address</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="Street Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase">Country</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="Country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase">Town/City</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="Town/City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={control}
            name="state"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="uppercase">State</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="State" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="uppercase">Zip code</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="Zip code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isSubmit && <Button type="submit">Submit</Button>}
      </div>
    </FormCardWrapper>
  );
};

export default ShippingInfoFormSection;

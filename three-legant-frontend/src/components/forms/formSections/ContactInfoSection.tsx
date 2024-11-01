import FormCardWrapper from "@/components/layout/FormCardWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ContactInfoT } from "@/types";
import React from "react";
import { Control } from "react-hook-form";

interface ContactInfoSectionProps {
  control: Control<ContactInfoT, any>;
  isSubmit?: boolean;
  isLoading?: boolean;
  title: string;
className?:string
}
const ContactInfoSection = ({
  control,
  isSubmit,
  isLoading,
  title,
  className
}: ContactInfoSectionProps) => {
  return (
    <FormCardWrapper className={className}title={title}>
      <div className="space-y-8">
        <div className="flex gap-4">
          <FormField
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="uppercase">First Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="First name"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="uppercase">Last Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Last name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase">Phone Number</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Phone number"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase">Email Address</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Your email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {isSubmit && <Button type="submit">Submit</Button>}
    </FormCardWrapper>
  );
};

export default ContactInfoSection;

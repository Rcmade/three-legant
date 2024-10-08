"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { contactInfoSchema } from "@/zodSchema/contactInfoSchema";
import { ContactInfoT, UserInfoSChema } from "@/types";
import { userInfoSchema } from "@/zodSchema/userInfoSchema";

const UserAccountDetailsForm = () => {
  const form = useForm<ContactInfoT>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
    },
  });

  function onSubmit(values: ContactInfoT) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="uppercase">First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="uppercase">Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase">Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase">Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
};

export default UserAccountDetailsForm;

"use client";
import FormCardWrapper from "@/components/layout/FormCardWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ContactInfoT } from "@/types";
import { contactInfoSchema } from "@/zodSchema/contactInfoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Control, useForm } from "react-hook-form";

const AccountDetailsForm = () => {
  const user = useCurrentUser();

  return (
    user && (
      <div className="flex flex-col gap-6">
        <div className="grid w-full gap-3">
          <Label htmlFor="name">Name*</Label>
          <Input
            disabled
            value={user?.name!}
            readOnly
            type="text"
            id="name"
            placeholder="name"
          />
        </div>
        <div className="grid w-full gap-3">
          <Label htmlFor="email">Email Address*</Label>
          <Input
            disabled
            value={user?.email!}
            readOnly
            type="email"
            id="email"
            placeholder="Email"
          />
        </div>

        {/* <div className="grid w-full gap-3">
          <Label htmlFor="email">Phone*</Label>
          <Input
            disabled
            value={user?.phone!}
            readOnly
            type="tel"
            id="email"
            placeholder="Email"
          />
        </div> */}
      </div>
    )
    // <form onSubmit={form.handleSubmit(onSubmit)}>
    //   <Form {...form}>
    //     <div className="space-y-8">
    //       <FormField
    //         control={form.control}
    //         name="firstName"
    //         render={({ field }) => (
    //           <FormItem>
    //             <FormLabel className="font-semibold uppercase text-primary/70">
    //               First Name*
    //             </FormLabel>
    //             <FormControl>
    //               <Input
    //                 disabled={isLoading}
    //                 placeholder="First name"
    //                 {...field}
    //               />
    //             </FormControl>

    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />

    //       <FormField
    //         control={form.control}
    //         name="lastName"
    //         render={({ field }) => (
    //           <FormItem>
    //             <FormLabel className="font-semibold uppercase text-primary/70">
    //               Last Name*
    //             </FormLabel>
    //             <FormControl>
    //               <Input
    //                 disabled={isLoading}
    //                 placeholder="Last name"
    //                 {...field}
    //               />
    //             </FormControl>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />

    //       <FormField
    //         control={form.control}
    //         name="phone"
    //         render={({ field }) => (
    //           <FormItem>
    //             <FormLabel className="font-semibold uppercase text-primary/70">
    //               Phone Number
    //             </FormLabel>
    //             <FormControl>
    //               <Input
    //                 disabled={isLoading}
    //                 placeholder="Phone number"
    //                 {...field}
    //               />
    //             </FormControl>

    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //       <FormField
    //         control={form.control}
    //         name="email"
    //         disabled={true}
    //         render={({ field }) => (
    //           <FormItem>
    //             <FormLabel className="font-semibold uppercase text-primary/70">
    //               Email Address*
    //             </FormLabel>
    //             <FormControl>
    //               <Input
    //                 readOnly
    //                 disabled={isLoading}
    //                 placeholder="Your email"
    //                 {...field}
    //               />
    //             </FormControl>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />

    //       <Button type="submit">Submit</Button>
    //     </div>
    //   </Form>
    // </form>
  );
};

export default AccountDetailsForm;

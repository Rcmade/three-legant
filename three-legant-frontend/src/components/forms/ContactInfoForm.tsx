"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { contactInfoSchema } from "@/zodSchema/contactInfoSchema";
import { ContactInfoT } from "@/types";
import ContactInfoSection from "./formSections/ContactInfoSection";

const ContactInfoForm = () => {
  const form = useForm<ContactInfoT>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: ContactInfoT) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ContactInfoSection
          title="Contact Information"
          control={form.control as any}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ContactInfoForm;

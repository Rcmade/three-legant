import TitleWithBreadcrumb from "@/components/sections/TitleWithBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { orderComplete } from "@/content/checkoutContent";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <TitleWithBreadcrumb title="Complete!" currentState={orderComplete} />

      <Card className="flex flex-col items-center space-y-6 my-6 border-none shadow-xl px-4 py-8">
        <CardHeader>
          <CardTitle>Thank you! 🎉</CardTitle>
        </CardHeader>

        <h1 className="text-3xl font-medium text-center">Your order has been received</h1>

        <div className="mx-auto flex flex-wrap gap-5">
          {Array.from({ length: 2 }).map((i, index) => (
            <div key={index} className="relative max-h-fit max-w-fit bg-accent">
              <Image
                src={
                  "/images/products/earphones/boAt TRebel Rockerz 235 V2 1.webp"
                }
                width={100}
                height={100}
                alt="banner"
                className="object-contain"
              />
              <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                3
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 md:max-w-96 md:flex-row">
            <span className="text-muted-foreground">Order Code:</span>
            <span className="font-medium text-primary">kk o eoe iow ioe w</span>
          </div>
          <div className="flex flex-col justify-between gap-4 md:max-w-96 md:flex-row">
            <span className="text-muted-foreground">Order Code:</span>
            <span className="font-medium text-primary">kk o eoe iow ioe w</span>
          </div>
          <div className="flex flex-col justify-between gap-4 md:max-w-96 md:flex-row">
            <span className="text-muted-foreground">Order Code:</span>
            <span className="font-medium text-primary">kk o eoe iow ioe w</span>
          </div>
          <div className="flex flex-col justify-between gap-4 md:max-w-96 md:flex-row">
            <span className="text-muted-foreground">Order Code:</span>
            <span className="font-medium text-primary">kk o eoe iow ioe w</span>
          </div>
        </div>

        <Button className="rounded-full px-6" asChild>
          <Link href="/user/orders">Purchase History</Link>
        </Button>
      </Card>
    </div>
  );
};

export default page;

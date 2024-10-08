"use client";
import { accountInfoContent } from "@/content/accountInfoContent";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

interface AccountInfoHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  heading?: string;
}
const AccountInfoHeading = ({
  heading,
  className,
  ...rest
}: AccountInfoHeadingProps) => {
  const pathname = usePathname();

  return (
    <h1 className={cn("text-5xl font-medium", className)} {...rest}>
      {heading ||
        accountInfoContent[
          (pathname as keyof typeof accountInfoContent) || "/user/my-account"
        ]}
    </h1>
  );
};

export default AccountInfoHeading;

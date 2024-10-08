import { webName } from "@/constant";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const LogoButton = ({
  className,
  ...rest
}: React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => {
  return (
    <Link
      {...rest}
      href="/"
      className={cn("text-xl font-semibold md:text-2xl", className)}
    >
      {webName}
    </Link>
  );
};

export default LogoButton;

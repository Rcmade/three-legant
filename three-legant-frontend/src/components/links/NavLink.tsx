import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface NavLinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  href: string;
  name: string;
  pathName: string;
  activeClassName?: string;
}
const NavLink = ({
  href,
  name,
  pathName,
  children,
  onClick,
  className,
  activeClassName,
}: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-between border-b py-4 text-lg font-semibold text-muted-foreground transition-all hover:text-primary md:border-none md:py-0 md:text-base",
        href === pathName ? "text-primary" : "",
        className,
        href === pathName && activeClassName ? activeClassName : "",
      )}
      key={href}
      onClick={onClick}
    >
      <span> {name}</span>
      {children}
    </Link>
  );
};

export default NavLink;

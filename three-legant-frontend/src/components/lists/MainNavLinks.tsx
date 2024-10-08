"use client";
import { mainNavContent } from "@/content/navContent";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import NavLink from "../links/NavLink";

interface MainNavLinksProps {
  onClick?: () => void;
  className?: string;
  activeClassName?: string;
}
const MainNavLinks = ({
  onClick,
  className,
  activeClassName,
}: MainNavLinksProps) => {
  const pathName = usePathname();
  return (
    <>
      {mainNavContent.map((i) => (
        <NavLink
          onClick={onClick}
          href={i.href}
          name={i.name}
          pathName={pathName}
          key={i.href}
          className={className}
          activeClassName={activeClassName}
        />
      ))}
    </>
  );
};

export default MainNavLinks;

"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Heart, Menu, X } from "lucide-react";
import LogoButton from "../buttons/LogoButton";
import Link from "next/link";
import { mainNavContent } from "@/content/navContent";
import { usePathname } from "next/navigation";
import NavLink from "../links/NavLink";
import IconWithCircle from "@/icons/IconWithCircle";
import SearchInput from "../Inputs/SearchInput";
import CartLink from "../links/CartLink";

const MainSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size="sm" className="px-1 py-1 md:hidden" variant="ghost">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        showX={false}
        side="left"
        className="flex flex-col space-y-4 overflow-y-auto"
      >
        <SheetHeader className="space-y-6">
          <SheetTitle className="flex items-center justify-between">
            <LogoButton className="text-3xl" />
            <SheetClose className="cursor-pointer" asChild>
              <Button variant="ghost" size="sm">
                <X />
              </Button>
            </SheetClose>
          </SheetTitle>
          <SheetDescription asChild className="relative">
            <SearchInput />
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-2">
          {mainNavContent.map((i) => (
            <NavLink
              onClick={() => setIsOpen(false)}
              href={i.href}
              name={i.name}
              pathName={pathName}
              key={i.href}
            />
          ))}
        </div>
        <SheetFooter className="mt-auto sm:flex-col">
          <CartLink pathName={pathName} varient="sidebar" />
          <NavLink
            onClick={() => setIsOpen(false)}
            href={"/user/wishlist"}
            name={"Wishlist"}
            pathName={pathName}
          >
            <IconWithCircle Icon={Heart} text={0} />
          </NavLink>

          <Button className="mt-6 w-full text-lg font-thin" asChild size="lg">
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MainSidebar;

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FilterIcon from "@/icons/FilterIcon";
import ShopFilterSection from "../sections/ShopFilterSection";
import LogoButton from "../buttons/LogoButton";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { PageProps } from "@/types";

const ShopFilterSidebar = (props:PageProps) => {
  return (
    <Sheet>
      <SheetTrigger className="flex items-center gap-4 text-xl font-semibold">
        <FilterIcon /> Filter
      </SheetTrigger>
      <SheetContent showX={false}>
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <LogoButton className="text-3xl" />
            <SheetClose className="cursor-pointer" asChild>
              <Button variant="ghost" size="sm">
                <X />
              </Button>
            </SheetClose>
          </SheetTitle>
          <SheetDescription className="text-start">
            Filter your search results by category, price, and more.
          </SheetDescription>
        </SheetHeader>

        <ShopFilterSection
          {...props}
          baseId="sidebar"
          className="w-auto md:w-96"
        />
      </SheetContent>
    </Sheet>
  );
};

export default ShopFilterSidebar;

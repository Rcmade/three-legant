"use client";
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SearchInput = () => {
  const pathname = usePathname();

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search..."
        className={cn(
          "border-black py-5 pl-10 text-lg",
          pathname == "/search" && "focus-visible:ring-0",
        )}
        autoFocus
      />
      <Search className="absolute left-3 top-2" />
    </div>
  );
};

export default SearchInput;

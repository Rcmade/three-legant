"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createQueryString } from "@/lib/utils/stringUtils";
import { PageProps } from "@/types";
import { useRouter } from "next/navigation";

const SelectSortBy = ({ searchParams }: PageProps) => {
  const { push } = useRouter();
  return (
    <Select
      onValueChange={(e) => {
        push(
          createQueryString(searchParams, {
            sortBy: e,
          }),
        );
      }}
    >
      <SelectTrigger className="max-w-fit gap-x-2 border-none">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {/* <SelectItem value="light">Light</SelectItem> */}
        {/* <SelectItem value="dark">Dark</SelectItem> */}
        <SelectItem value="createdAt">Newest</SelectItem>
        <SelectItem value="discountedPrice">Price</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectSortBy;

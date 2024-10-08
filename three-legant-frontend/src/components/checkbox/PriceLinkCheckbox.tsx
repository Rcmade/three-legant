import { cn } from "@/lib/utils";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { priceContent } from "@/content/priceContent";

interface PriceLinkCheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
  baseId?: string;
}

const PriceLinkCheckbox = ({
  className,
  baseId,
  ...rest
}: PriceLinkCheckboxProps) => {
  return (
    <div {...rest} className={cn("flex", className)}>
      {priceContent.map((i) => (
        <div className="flex items-center justify-between space-x-2" key={i}>
          <label
            htmlFor={`${baseId}-${i}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {i}
          </label>
          <Checkbox id={`${baseId}-${i}`} />
        </div>
      ))}
    </div>
  );
};

export default PriceLinkCheckbox;

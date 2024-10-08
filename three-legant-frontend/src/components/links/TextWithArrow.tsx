import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface TextWithArrowProps {
  href: string;
  title?: string;
  className?: string;
}
const TextWithArrow = ({
  href,
  title,
  className,
}: TextWithArrowProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 border-b max-w-fit border-primary",
        className,
      )}
    >
      {title || "More Products"} <ArrowRight className="h-6 w-6" />
    </Link>
  );
};

export default TextWithArrow;

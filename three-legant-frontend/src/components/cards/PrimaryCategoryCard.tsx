import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CategoryCardProps } from "@/types";

const PrimaryCategoryCard: React.FC<
  React.HTMLAttributes<HTMLDivElement> & CategoryCardProps
> = ({ href, src, title, className, ...rest }) => {
  return (
    <div
      className={cn("flex flex-col justify-between bg-accent gap-4 p-4", className)}
      {...rest}
    >
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold"> {title}</h1>
        <Link
          href={href}
          className="flex max-w-fit items-center gap-x-4 border-b border-primary text-base font-semibold"
        >
          See all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg">
        <Image
          src={src}
          width={600}
          height={600}
          className="mx-auto object-contain"
          alt={title}
        />
      </div>
    </div>
  );
};

export default PrimaryCategoryCard;

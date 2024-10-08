import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CategoryCardProps } from "@/types";

const SecondaryCategoryCard: React.FC<
  React.HTMLAttributes<HTMLDivElement> & CategoryCardProps
> = ({ href, src, title, className, ...rest }) => {
  return (
    <div
      className={cn(
        "xs:flex-row flex flex-1 flex-col items-center justify-between gap-x-2 bg-accent px-6",
        className,
      )}
      {...rest}
    >
      <div className="flex h-full items-end py-6">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold"> {title}</h1>
          <Link
            href={href}
            className="flex max-w-fit items-center gap-x-4 border-b border-primary text-base font-semibold"
          >
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center overflow-hidden rounded-lg py-2 md:max-h-[calc(100%-1rem)]">
        <Image
          src={src}
          width={350}
          height={350}
          className="max-h-full object-contain"
          alt={title}
        />
      </div>
    </div>
  );
};

export default SecondaryCategoryCard;

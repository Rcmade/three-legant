import { webName } from "@/constant";
import React from "react";

const SimpleUniqueHeader = () => {
  return (
    <div className="mb-8 mt-[86px] flex flex-col items-center justify-between gap-2 sm:flex-row">
      <h1 className="xs:text-4xl xs:tracking-widest flex flex-col gap-y-2 text-3xl font-semibold sm:text-5xl sm:font-medium md:tracking-normal lg:text-7xl">
        <span className="whitespace-nowrap">
          Simply Unique<span className="text-primary/80">/</span>
        </span>
        <span className="whitespace-nowrap">
          Simply Better <span className="text-primary/80">.</span>
        </span>
      </h1>

      <p className="xs:px-6 text-base sm:px-4">
        <strong>{webName}</strong> is a gift & decorations store based in HCMC,
        Vietnam. Est since 2019.
      </p>
    </div>
  );
};

export default SimpleUniqueHeader;

"use client";
import { useGridSelect } from "@/hooks/useGridSelect";
import { cn } from "@/lib/utils";
import { Children } from "@/types";
import { GridSelectE } from "@/types/enum";
import React from "react";

const GridSelectLayout = ({ children }: Children) => {
  const { type } = useGridSelect();

  return (
    <div>
      <div
        className={cn("grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3", {
          "grid-cols-3 md:grid-cols-3 lg:grid-cols-3":
            type === GridSelectE.Three,
          "grid-cols-2 md:grid-cols-2 lg:grid-cols-2": type === GridSelectE.Two,
          "grid-cols-1 md:grid-cols-1 lg:grid-cols-1": type === GridSelectE.One,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default GridSelectLayout;

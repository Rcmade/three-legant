"use client";
import GridOneIcon from "@/icons/GridOneIcon";
import GridThreeIcon from "@/icons/GridThreeIcon";
import GridTwoIcon from "@/icons/GridTwoIcon";
import { GridSelectE } from "@/types/enum";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useGridSelect } from "@/hooks/useGridSelect";

const GridSelectButton = () => {
  const { type, setGrid } = useGridSelect();
  return (
    <>
      <Button
        onClick={() => setGrid(GridSelectE.Three)}
        variant="ghost"
        className={cn(
          "hidden md:flex",
          type === GridSelectE.Three && "bg-accent",
        )}
      >
        <GridThreeIcon className="h-6 w-6" />
      </Button>
      <Button
        onClick={() => setGrid(GridSelectE.Two)}
        variant="ghost"
        className={cn(type === GridSelectE.Two && "bg-accent")}
      >
        <GridTwoIcon className="h-6 w-6" />
      </Button>
      <Button
        onClick={() => setGrid(GridSelectE.One)}
        variant="ghost"
        className={cn(type === GridSelectE.One && "bg-accent")}
      >
        <GridOneIcon className="h-6 w-6" />
      </Button>
    </>
  );
};

export default GridSelectButton;

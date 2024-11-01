"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { GetAddressResponseT } from "@/types/apiResponse";
import { useEditAddressDialog } from "@/hooks/useEditAddressDialog";

interface EditAddressButtonProps {
  data: GetAddressResponseT[number];
}
const EditAddressButton = ({ data }: EditAddressButtonProps) => {
  const onOpen = useEditAddressDialog((s) => s.onOpen);
  
  return (
    <Button
      onClick={() => onOpen(data)}
      variant="ghost"
      className="items-center text-lg text-primary/60"
    >
      <Pencil className="mr-1 h-4 w-4 border-b-2" /> Edit
    </Button>
  );
};

export default EditAddressButton;

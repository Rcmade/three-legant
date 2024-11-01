"use client";
import React from "react";
import { Button } from "../ui/button";
import { useEditAddressDialog } from "@/hooks/useEditAddressDialog";

const AddNewAddressButton = () => {
  const onOpen = useEditAddressDialog((s) => s.onOpen);
  return <Button onClick={() => onOpen()}>+ Add</Button>;
};

export default AddNewAddressButton;

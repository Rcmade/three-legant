import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { GetShippingMethodsResponseT } from "@/types/apiResponse";

interface SelectAvailableShippingMethodsProps {
  availableShippingMethods: GetShippingMethodsResponseT;
  setState: React.Dispatch<GetShippingMethodsResponseT[number] | undefined>;
}
const SelectAvailableShippingMethods = ({
  availableShippingMethods,
  setState,
}: SelectAvailableShippingMethodsProps) => {
  const defaultShippingType = availableShippingMethods[0];

  return (
    <RadioGroup
      onValueChange={(e) => {
        const type = (availableShippingMethods || []).find((s) => s.id === e)!;
        setState(type);
      }}
      defaultValue={defaultShippingType?.id}
      className="space-y-2"
    >
      {availableShippingMethods.map((s) => (
        <Label
          key={s.id}
          htmlFor={s.id}
          className="flex cursor-pointer items-center gap-2 rounded-md border border-primary p-3 transition-all hover:bg-accent/40 lg:w-72"
        >
          <RadioGroupItem value={s.id} id={s.id} />
          <span>{s.title}</span>
        </Label>
      ))}
    </RadioGroup>
  );
};

export default SelectAvailableShippingMethods;

import { LucideIcon } from "lucide-react";
import React from "react";

interface IconWithCircleProps {
  Icon: LucideIcon | React.FC;
  text?: string | number;
}
const IconWithCircle = ({ Icon, text }: IconWithCircleProps) => {
  return (
    <>
      <span className="flex items-center">
        <Icon className="h-7 w-7" />
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
          {text}
        </span>
      </span>
    </>
  );
};

export default IconWithCircle;

import { Children } from "@/types";
import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface FormCardWrapperProps extends Children {
  title: string;
  className?: string;
  withTitle?: ReactNode;
}
const FormCardWrapper = ({
  children,
  title,
  className,
  withTitle,
}: FormCardWrapperProps) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between p-2 pb-0 sm:p-6">
        <CardTitle className="text-xl">{title}</CardTitle>
        {withTitle}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default FormCardWrapper;

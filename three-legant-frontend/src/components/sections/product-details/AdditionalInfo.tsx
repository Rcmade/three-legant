import { ProductCommonAdditionalInfoT } from "@/types";
import React from "react";

interface AdditionalInfoProps extends Partial<ProductCommonAdditionalInfoT> {}
const AdditionalInfo = ({ description }: AdditionalInfoProps) => {
  return (
    <div>
      <p>{description}</p>
    </div>
  );
};

export default AdditionalInfo;

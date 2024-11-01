import { Input } from "@/components/ui/input";
import { ProductCommonAdditionalInfoT } from "@/types";
import { Search } from "lucide-react";
import React from "react";

interface QnaProps extends Partial<ProductCommonAdditionalInfoT> {}

const Qna = ({}: QnaProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl">Looking for specific info?</h1>
      <div className="relative">
        <Input className="pl-8" placeholder="Search in review, Q&A..." />
        <Search className="pointer-events-none absolute left-2 top-2" />
      </div>
    </div>
  );
};

export default Qna;

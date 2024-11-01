import {
  getAdminProductDetails,
  getProductDetails,
} from "@/actions/productAction";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { adminProductDetailsApi } from "@/constant/apiRoute";
import { PageProps } from "@/types";
import React from "react";
import ProductUpdateForm from "./ProductUpdateForm";
import { Editor } from "@/components/RichText";
import EditorInput from "@/components/RichText/editor-input";

const ProductIdPage = async ({ params }: PageProps) => {
  const product = await getAdminProductDetails(
    params.productId,
    adminProductDetailsApi,
  );
  return product ? (
    <div className="py-4">
      <ProductUpdateForm {...product} />
    </div>
  ) : (
    <h1 className="text-center text-lg">No Product Found</h1>
  );
};

export default ProductIdPage;

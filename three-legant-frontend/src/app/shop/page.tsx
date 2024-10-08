import React from "react";

import CategoryShopLayout from "@/components/layout/CategoryShopLayout";
import { PageProps } from "@/types";
const page = (props: PageProps) => {
  return <CategoryShopLayout {...props} />;
};

export default page;

import { getAdminProduct } from "@/actions/admin/productAction";
import { currentUser } from "@/actions/currentUser";
import AdminProductCard from "@/components/cards/AdminCards/AdminProductCard";
import GridSelectLayout from "@/components/layout/GridSelectLayout";
import { getAdminProductNavigateString } from "@/lib/utils/stringUtils";
import { PageProps } from "@/types";
import React from "react";

const ProductsPage = async (props: PageProps) => {
  const products = await getAdminProduct(props);

  return (
    <GridSelectLayout>
      {(products?.products || [])?.map((product) => (
        <AdminProductCard
          key={product.id}
          productId={product.id}
          imageAlt="img"
          imageSrc={product.primaryImage}
          price={product.price}
          productName={product.name}
          title={""}
          discountedPrice={product.discountedPrice}
          href={getAdminProductNavigateString(product.id)}
        />
      ))}
    </GridSelectLayout>
  );
};

export default ProductsPage;

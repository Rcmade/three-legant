export type ProductMeta = {
  [key: string]: string;
};

export type SubImage = {
  image: string;
};

export type Product = {
  id: string;
  name: string;
  sortDescription: string;
  description: string | null;
  sku: string;
  price: string;
  rating: string | null;
  discountedPrice: string | null;
  currentVariantType: string | null;
  currentVariantValue: string | null;
  stock: number;
  primaryImage: string | null;
  brand: string | null;
  isAvailable: boolean | null;
  category: string;
  subImages: SubImage[];
  meta: ProductMeta;
};

export type ProductVariant = {
  id?: string | undefined;
  name?: string | undefined;
  primaryImage?: string | undefined;
  stock?: number | undefined;
  price?: string | undefined;
  discountedPrice?: string | null | undefined;
  variantValue?: string | null | undefined;
};

export type ProductDetailsT = {
  product: Product;
  variants: ProductVariant[];
};

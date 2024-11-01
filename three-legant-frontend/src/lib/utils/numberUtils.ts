export const calculateDiscountPercentage = ({
  price,
  discountedPrice,
}: {
  price: string;
  discountedPrice: string;
}): number => {
  const mrp = parseFloat(price);
  if (price === discountedPrice) return mrp;
  const sellingPrice = parseFloat(discountedPrice);

  if (mrp <= sellingPrice) {
    return 0;
  }

  const discountPercentage = ((mrp - sellingPrice) / mrp) * 100;

  return parseFloat(discountPercentage.toFixed(2)); // Rounded to 2 decimal places
};

export function getProperNumber(num: number | string | null): number {
  return typeof num === "number" ? num : num ? +num : 0;
}

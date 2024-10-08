import Image from "next/image";
import AddToCartButton from "../buttons/AddToCartButton";
import Link from "next/link";
import RatingStarButtons from "../buttons/RatingStarButtons";
import { cn } from "@/lib/utils";
import { calculateDiscountPercentage } from "@/lib/utils/numberUtils";

type ProductCardProps = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  productName: string;
  price: string;
  discountedPrice?: string | null;
  rating?: number;
  href: string;
};

const ProductCard: React.FC<
  ProductCardProps & React.HTMLAttributes<HTMLDivElement>
> = ({
  title,
  imageSrc,
  imageAlt,
  productName,
  price,
  discountedPrice,
  rating = 0,
  className,
  href,
  ...rest
}) => {
  const disPrice = discountedPrice || price;
  const disPercentage = calculateDiscountPercentage({
    price: price,
    discountedPrice: disPrice,
  });
  return (
    <div
      {...rest}
      className={cn(
        "carousel-item group relative inline-block w-80 snap-center space-y-2",
        className,
      )}
    >
      <div className="relative space-y-4 overflow-hidden bg-accent p-4">
        <div className="absolute z-10 flex flex-col gap-y-2">
          <h1 className="max-w-fit rounded-md bg-card px-3 font-medium">
            {title}
          </h1>
          {disPercentage > 0 && (
            <p className="rounded-md bg-secondary-green px-3 font-medium text-white">
              {`-${disPercentage}%`}
            </p>
          )}
        </div>

        <div className="h-60">
          <Image
            src={imageSrc}
            className="mx-auto mt-4 min-h-full rounded-lg object-contain mix-blend-multiply dark:mix-blend-normal"
            width={350}
            height={350}
            alt={imageAlt}
          />
        </div>
        {/* <AddToCartButton
        productId=
          className="relative z-10 opacity-0 transition-all duration-500 group-hover:opacity-100"
          id={title}
        /> */}
      </div>

      <div className="space-y-2 whitespace-normal">
        <RatingStarButtons rating={rating} />
        <h1 className="max-w-full truncate whitespace-nowrap font-semibold">
          {productName}
        </h1>
        <h2 className="flex gap-x-2 font-semibold">
          ${discountedPrice}
          {price && (
            <del className="font-normal text-accent-foreground">${price}</del>
          )}
        </h2>
      </div>

      <Link href={href} className="absolute inset-0"></Link>
    </div>
  );
};

export default ProductCard;

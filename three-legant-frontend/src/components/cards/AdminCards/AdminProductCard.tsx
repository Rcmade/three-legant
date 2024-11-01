import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { calculateDiscountPercentage } from "@/lib/utils/numberUtils";

type AdminProductCardProps = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  productName: string;
  price: string;
  discountedPrice?: string | null;
  href: string;
  productId: string;
  authorization?: string;
};

const AdminProductCard: React.FC<
  AdminProductCardProps & React.HTMLAttributes<HTMLDivElement>
> = ({
  title,
  imageSrc,
  imageAlt,
  productName,
  price,
  discountedPrice,
  className,
  href,
  productId,
  ...rest
}) => {
  const disPrice = discountedPrice || price;
  const disPercentage = calculateDiscountPercentage({
    price: price,
    discountedPrice: disPrice,
  });
  return (
    <div
      // {...rest}
      className={cn(
        "carousel-item group relative inline-block w-80 snap-center space-y-2",
        className,
      )}
    >
      <div className="relative flex items-center justify-center overflow-hidden bg-accent p-4">
        <div className="absolute left-4 top-4 z-10 flex flex-col gap-y-2">
          <h1 className="max-w-fit rounded-md bg-card px-3 font-medium">
            {title}
          </h1>
          {disPercentage > 0 && (
            <p className="max-w-fit rounded-md bg-secondary-green px-3 font-medium text-white">
              {`-${disPercentage?.toFixed()}%`}
            </p>
          )}
        </div>

        <div className="flex h-64 items-center justify-center">
          <Image
            src={imageSrc}
            className="mx-auto max-h-full rounded-lg object-contain mix-blend-multiply dark:mix-blend-normal"
            width={350}
            height={350}
            alt={imageAlt}
          />
        </div>
      </div>

      <div className="space-y-2 whitespace-normal">
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

export default AdminProductCard;

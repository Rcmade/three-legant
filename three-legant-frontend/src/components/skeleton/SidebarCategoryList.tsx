import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function SidebarCategoryListSkeleton({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn("flex flex-col gap-4 overflow-x-auto py-2", className)}
    >
      {[...Array(5)].map((_, index) => (
        <Skeleton key={index} className="h-6 w-4/5 max-w-full rounded-full" />
      ))}
    </div>
  );
}

import { and, eq, gte, lte } from "drizzle-orm";
import { db } from "@/db/db";
import { banners } from "@/db/schema/bannerSchema";

export const getBannersByType = async (type: string) => {
  const result = await db
    .select({
      id: banners.id,
      imageUrl: banners.imageUrl,
      href: banners.link,
      title: banners.title,
    })
    .from(banners)
    .where(
      and(
        eq(banners.bannerType, type),
        eq(banners.isActive, true),
        lte(banners.startDate, new Date()),
        gte(banners.endDate, new Date())
      )
    )
    .orderBy(banners.priority)
    .limit(10)
    .execute();

  return result;
};

import { and, eq, gte, lte } from "drizzle-orm";
import { db } from "@/db/db";
import { banners } from "@/db/schema/bannerSchema";
import { Context } from "hono";

export const getBannersByType = async (type: string,c:Context) => {
  const result = await db(c)
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

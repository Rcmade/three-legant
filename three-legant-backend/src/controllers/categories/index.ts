import { db } from "@/db/db";
import { categories } from "@/db/schema";
import { PaginationParams } from "@/types";
import { and, count, eq, sql, lte } from "drizzle-orm"; // Import necessary query helpers

export const getCategories = async (
  paginationParams: PaginationParams & {
    sortBy?: keyof typeof categories;
    parentCategoryId?: string;
  }
) => {
  const {
    limit = 10,
    page = 1,
    search = "",
    sortBy = "createdAt",
    parentCategoryId,
  } = paginationParams;

  const similarityThreshold = 0.3;

  // Construct search query for name and description similarity
  const searchQuery = search
    ? sql`(similarity(${categories.name}, ${search}) > ${similarityThreshold} 
        OR similarity(${categories.description}, ${search}) > ${similarityThreshold})`
    : undefined;

  // Optional parent category filter
  const parentCategoryFilter = parentCategoryId
    ? eq(categories.parentCategoryId, parentCategoryId)
    : undefined;

  // Build the WHERE clause using optional filters
  const whereClause = and(searchQuery, parentCategoryFilter);

  // Fetch categories with pagination and sorting
  const categoryList = await db
    .select({
      id: categories.id,
      name: categories.name,
      description: categories.description,
      createdAt: categories.createdAt,
    })
    .from(categories)
    .where(whereClause)
    .limit(limit)

    .offset(Math.max(page - 1, 0) * limit)
    .orderBy((categories[sortBy] || categories.name) as any); // Sort by specified field

  // Fetch the total count of matching categories for pagination metadata
  const totalCategories = await db
    .select({ count: count() })
    .from(categories)
    .where(whereClause);

  return {
    categories: categoryList,
    pagination: {
      total: totalCategories[0].count, // Total number of matching categories
      limit,
      page,
    },
  };
};

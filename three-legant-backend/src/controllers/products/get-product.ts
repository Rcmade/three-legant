import { db } from "@/db/db";
import { products } from "@/db/schema";
import { PaginationParams } from "@/types";
import { and, count, eq, lte, sql } from "drizzle-orm"; // Import necessary query helpers
import { Context } from "hono";

export const getProducts = async (
  paginationParams: PaginationParams & { sortBy?: keyof typeof products },
  c: Context
) => {
  const {
    limit = 10,
    offset = 0,
    search = "",
    priceFilter,
    sortBy = "createdAt",
  } = paginationParams;

  const similarityThreshold = 0.3;
  const searchQuery = search
    ? sql`(similarity(${products.name}, ${search}) > ${similarityThreshold} OR similarity(${products.description}, ${search}) > ${similarityThreshold})`
    : undefined;

  // Build where clause with optional filters
  const whereClause = and(
    searchQuery, // Full-text search on name and description
    priceFilter ? lte(products.price, priceFilter?.toString()) : undefined // Filter by price (<=)
  );
  // Fetch products with limit, offset, and sorting
  const productList = await db(c)
    .select()
    .from(products)
    .where(whereClause)
    .limit(limit)
    .offset(offset)
    .orderBy((products[sortBy] || products.name) as any); // Sort by the specified field
  // Optionally, get the total number of products for pagination metadata
  const totalProducts = await db(c)
    .select({ count: count() })
    .from(products)
    .where(whereClause);

  return {
    products: productList,
    pagination: {
      total: totalProducts[0].count, // total number of products
      limit,
      offset,
    },
  };
};

export const getProductById = async (id: string, c: Context) => {
  const product = await db(c)
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  if (product.length === 0) {
    throw new Error("Product not found");
  }

  return product[0];
};

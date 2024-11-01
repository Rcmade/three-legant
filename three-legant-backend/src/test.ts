import { eq, or, sql } from "drizzle-orm";
import { db } from "./db/db";
import { productImages, products } from "./db/schema";

const d = async () => {
  //   const result = await db
  //     .select()
  //     .from(productVariants)
  //     .where(eq(productVariants.productId, "l1WZsIiSUtZQ"));

  // const va = await db.select({ id: productVariants.id }).from(productVariants);

  // const a: any = [];
  // for (const v of va) {
  //   const [result] = await db
  //     .select()
  //     .from(variantImages)
  //     .where(eq(variantImages.variantId, v.id));
  //   if (result?.imageUrl) {
  //     a.push(result?.imageUrl);
  //   }
  // }

  // const b = await db.select().from(variantImages).where(eq(variantImages.variantId, "l1WZsIiSUtZQ"));

  // const a = await db
  //   .select()
  //   .from(productVariants)
  //   .where(eq(productVariants.id, "-bCCpLFLP8Sf"));

  // const a = await db
  //   .select()
  //   .from(productImages)
  //   .where(eq(productImages.productId, "R2aq7tH1Q394"));

  //   const title = "steel";

  //  const res =  await db
  //     .select()
  //     .from(products)
  //     .where(
  //       sql`to_tsvector('english', ${products.name}) @@ websearch_to_tsquery('english', ${title})`
  //     );

  const userProduct = await db
    .select()
    .from(products)
    .where(eq(products.userId, "XSTaAGma3Kw"));

  console.dir(userProduct, {
    colors: true,
    depth: Infinity,
  });
};

d();

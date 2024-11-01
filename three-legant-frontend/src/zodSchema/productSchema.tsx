import { z } from "zod";

export const productSchema = z.object({
  id: z.string().optional(), // Assuming `id` is generated with a default function
  name: z.string().min(1).max(255),
  description: z.string().min(1),
  sku: z.string().min(1).max(50), // Unique and not null
  categoryId: z.string().nullable().optional(),
  categoryName: z.string().max(255).optional(),
//   userId: z.string().min(1), // Not null
  isAvailable: z.boolean().default(true),
  currentVariantType: z.string().max(50).optional(),
  currentVariantValue: z.string().max(50).optional(),
  brand: z.string().max(100).optional(),
  primaryImage: z.string().min(1),
  stock: z.number().int().min(0).default(0), // Not null
  price: z
    .number()
    .positive()
    .refine(
      (val) => parseFloat(val.toFixed(2)) === val,
      "Price can only have up to 2 decimal places",
    ),
  discountedPrice: z
    .number()
    .positive()
    .optional()
    .refine(
      (val) => parseFloat((val || 0).toFixed(2)) === val,
      "Discounted price can only have up to 2 decimal places",
    ),
  sortDescription: z.string().min(20).max(255),
  meta: z.record(z.any()).optional(), // JSON for product-specific attributes
});

export default productSchema;

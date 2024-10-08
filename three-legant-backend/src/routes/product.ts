import { Hono } from "hono";
import { insertProductSchema } from "@/zodSchema/productSchema";
import UploadService from "@/services/uploadService";
import { getProducts } from "@/controllers/products/get-product";
import { getNewARrival } from "@/controllers/products/home-api/new-arrival";
import { getProductDetails } from "@/controllers/products/product-details";
import { HTTPException } from "hono/http-exception";

const product = new Hono()
  .get("/home-api/new-arrival", async (c) => {
    const newArrival = await getNewARrival();
    return c.json(newArrival);
  })
  .get("/", async (c) => {
    const params = c.req.query();
    const product = await getProducts({
      limit: 10,
      offset: 0,
      priceFilter: +params.priceFilter,
      search: params.search,
      sortBy: params.sortBy as any,
    });
    return c.json(product);
  })
  .get("/product-details/:id", async (c) => {
    const params = c.req.param("id") || "";
    const product = await getProductDetails(params);
    if (!product) {
      throw new HTTPException(401, { message: "Product not found" });
    }

    return c.json(product);
  })
  .post("/", async (c) => {
    const formData = await c.req.parseBody({ all: true });
    const validationResult = insertProductSchema.safeParse(formData);
    if (!validationResult.success) {
      return c.json({ errors: validationResult.error.errors }, 400);
    }
    const files = formData.files as File[];
    if (!files || files.length === 0) {
      return c.json({ error: "At least one file is required" }, 400);
    }

    const savedFiles = await UploadService.uploadFiles(files);

    if ("error" in savedFiles) {
      return c.json({ error: savedFiles.error }, 400);
    }

    return c.json({
      message: "Product created successfully",
      data: validationResult.data,
      uploadedFiles: savedFiles,
    });
  })
  .post("/delete", async (c) => {
    return c.json({ message: "File deleted successfully" });
  });

export default product;

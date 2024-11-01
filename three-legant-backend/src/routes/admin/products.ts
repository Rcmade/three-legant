import { Hono } from "hono";
import insertProductS from "@/zodSchema/productSchema2";
import UploadService from "@/services/uploadService";
import { getNewARrival } from "@/controllers/products/home-api/new-arrival";
import { getProductDetails } from "@/controllers/products/product-details";
import { HTTPException } from "hono/http-exception";
import { handleProductFetch } from "@/lib/utils/handleProductFetch";
import { verifyAuth } from "@/lib/utils/middlewareUtils";

const adminProducts = new Hono()

  .get(
    "/",
    (c, next) => verifyAuth(c, next, "", "ADMIN"),
    async (c) => {
      try {
        const params = c.req.query();
        const auth = c.get("authUser");
        const userId = auth?.token?.sub!;
        const product = await handleProductFetch(params, userId);
        return c.json(product);
      } catch (error) {
        console.error("Product fetch error: ", error);
        throw new HTTPException(401, { message: "Something went wrong!" });
      }
    }
  )
  .get("/product-details/:id", async (c) => {
    const paramsId = c.req.param("id") || "";
    const product = await getProductDetails(paramsId);
    if (!product) {
      throw new HTTPException(401, { message: "Product not found" });
    }

    return c.json(product);
  })
  .post("/", async (c) => {
    const formData = await c.req.parseBody({ all: true });
    const validationResult = insertProductS.safeParse(formData);
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

export default adminProducts;

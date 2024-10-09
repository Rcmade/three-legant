// import "dotenv/config";
import { config } from "dotenv";
config({ path: ".dev.vars" });

import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/index.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: false || process.env.NODE_ENV === "development",
  strict: true,
});

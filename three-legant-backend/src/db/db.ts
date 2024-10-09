// import "dotenv/config";
// import { env } from "node:process";
// import { config } from "dotenv";

// // import { drizzle } from "drizzle-orm/postgres-js";
// import fs from "fs";
// import * as schema from "./schema/index";
// // import postgres from "postgres";

// // import { drizzle } from "drizzle-orm/vercel-postgres";
// import { drizzle } from "drizzle-orm/neon-http";

// // import { sql } from "@vercel/postgres";
// import { neon } from "@neondatabase/serverless";

// // const queryClient = postgres(process.env.DATABASE_URL!);
// // export const db = drizzle(queryClient, {
// //   schema,
// //   // logger: process.env.NODE_ENV !== "production",
// // });

// // fs.writeFileSync("tst.txt", JSON.stringify(process.env));
// // console.log(process.env);

// // config({ path: ".dev.vars" });
// // const sql = neon(process.env.DATABASE_URL!);

// // export const db = drizzle(sql);

import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { Context } from "hono";

export const db = (c: Context) => {
  const client = new Pool({ connectionString: c.env.DATABASE_URL });
  return drizzle(client);
};

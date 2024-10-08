import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
import { nId } from "@/lib/utils/dbUtils";

export const userRole = pgEnum("UserRole", ["ADMIN", "USER"]);

export const users = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(nId),
  role: userRole("role").notNull().default("USER"),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  isTwoFactorEnabled: boolean("isTwoFactorEnabled").default(false),
  password: text("password"),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date())
    .defaultNow(),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const oAuthProjectConfig = pgTable("oAuthProjectConfig", {
  id: text("id").primaryKey().$defaultFn(nId),
  projectName: text("name").notNull(),
  image: text("image"),
  clientId: text("clientId").notNull(),
  clientSecret: text("clientSecret").notNull(),
  redirectUri: text("redirectUri").array().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date())
    .defaultNow(),
  userId: text("userId")
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
});

export const authorizationCodes = pgTable("authorizationCodes", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nId(20)),
  code: varchar("code", { length: 255 })
    .$defaultFn(() => nId(20))
    .notNull()
    .unique(), // The authorization code
  userId: text("userId")
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  // .$defaultFn(
  //   () =>
  //     new Date(Date.now() + DEFAULT_OAUTH_AUTHORIZATION_CODE_EXPIRES_IN_MIN)
  // ), // Expiry time of the code
});

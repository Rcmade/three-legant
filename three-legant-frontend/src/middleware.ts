import {
  LOGIN_REDIRECT,
  adminPrefixRoutes,
  apiAuthPrefix,
  apiPrefixRoutes,
  authRoutes,
  publicRoutes,
} from "./config/routesConfig";
import { getToken } from "next-auth/jwt";
import authProvidersConfig from "@/config/authProvidersConfig";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
const { auth } = NextAuth(authProvidersConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAPiRoute = nextUrl.pathname.startsWith(apiPrefixRoutes);
  console.log("---------------run middle ------------", nextUrl.pathname);

  if (isAPiRoute) {
    return;
  }

  if (isApiAuthRoute) {
    return;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  const isAdmin = nextUrl.pathname.startsWith(adminPrefixRoutes);
  if (isAdmin) {
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
    });
    if (token?.role !== "ADMIN") {
      return NextResponse.rewrite(new URL("/unauthorize", nextUrl));
    }
  }
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  return;
});

export const config = {
  matcher: [
    // "/((?!^/$|^/favicon\\.ico$|shop|_next|.*\\.[\\w]+$).*)", // Exclude root `/`, `/favicon.ico`, `/shop`, `_next`, and static files
    "/((?!^/$|^/favicon\\.ico$|shop|_next|__nextjs|.*\\.[\\w]+$).*)",
    "/(api|trpc)(.*)",
  ],
};

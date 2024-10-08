import {
  LOGIN_REDIRECT,
  apiAuthPrefix,
  apiPrefixRoutes,
  authRoutes,
  publicRoutes,
} from "./config/routesConfig";
import authProvidersConfig from "@/config/authProvidersConfig";
import NextAuth from "next-auth";
const { auth } = NextAuth(authProvidersConfig);

export default auth((req) => {
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

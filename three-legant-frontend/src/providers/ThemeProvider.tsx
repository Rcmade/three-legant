"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { SessionProvider } from "next-auth/react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  });

  return (
    <NextThemesProvider
      {...props}
      defaultTheme="dark"
      attribute="class"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <ProgressBar
          height="2px"
          color="hsl(var(--primary))"
          options={{ showSpinner: false }}
          shallowRouting
        />
        <Toaster position="top-center" />
      </SessionProvider>
    </NextThemesProvider>
  );
}

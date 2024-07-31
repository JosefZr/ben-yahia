"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/providers";
import ActiveSectionContextProvider from "@/context/activeSection";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function ClientProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
        <ActiveSectionContextProvider>
          <NextUIProvider>
            {children}
          </NextUIProvider>
        </ActiveSectionContextProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "wheat",
            color: "black",
          },
        }}
      />
    </QueryClientProvider>
  );
}

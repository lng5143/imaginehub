"use client"

import NavigationBar from "@/components/nav/nav-bar";
import JotaiProvider from "@/components/jotai-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function CreateLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col h-screen">
        <NavigationBar />
        <JotaiProvider>
          {children}
        </JotaiProvider>
      </div>
    </QueryClientProvider>
  );
}
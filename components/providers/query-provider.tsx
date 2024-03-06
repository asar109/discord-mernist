"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());



  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools buttonPosition="top-right" initialIsOpen={false} />
      )} */}
    </QueryClientProvider>
  );
};

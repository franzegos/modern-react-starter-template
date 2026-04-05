import { QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import { queryClient } from "@/lib/queryClient";
import { ThemeRoot } from "@/lib/providers/ThemeRoot";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeRoot />
      {children}
      <Toaster position="bottom-right" richColors />
      <Analytics />
    </QueryClientProvider>
  );
}

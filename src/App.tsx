import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AppProviders } from "@/lib/providers/AppProviders";
import { HomePage } from "@/pages/HomePage";

export default function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <HomePage />
      </AppProviders>
    </ErrorBoundary>
  );
}

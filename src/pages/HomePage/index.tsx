import { Monitor, Moon, Sun } from "lucide-react";
import { useDemoPost } from "@/api/queries/use-demo";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCounterStore } from "@/lib/stores/counterStore";
import { type ThemePreference, useThemeStore } from "@/lib/stores/themeStore";
import { DemoErrorTrigger } from "./DemoErrorTrigger";
import { toast } from "sonner";

const themeOptions: {
  value: ThemePreference;
  label: string;
  icon: typeof Sun;
}[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function HomePage() {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  const count = useCounterStore((s) => s.count);
  const increment = useCounterStore((s) => s.increment);
  const decrement = useCounterStore((s) => s.decrement);
  const reset = useCounterStore((s) => s.reset);

  const { data, isPending, isError, error, refetch, isFetching } =
    useDemoPost();

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-8">
        <div className="flex justify-end">
          <div
            className="bg-muted/60 inline-flex rounded-lg border p-0.5"
            role="group"
            aria-label="Theme"
          >
            {themeOptions.map(({ value, label, icon: Icon }) => (
              <Button
                key={value}
                type="button"
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 gap-1 px-2 shadow-none",
                  theme === value && "bg-background text-foreground",
                )}
                onClick={() => setTheme(value)}
                title={label}
                aria-pressed={theme === value}
              >
                <Icon className="size-3.5" aria-hidden />
                <span className="hidden sm:inline">{label}</span>
              </Button>
            ))}
          </div>
        </div>

        <header className="space-y-3 text-center">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            my-starter-template
          </h1>
          <p className="text-muted-foreground mx-auto max-w-lg text-sm sm:text-base">
            Vite, React, Tailwind CSS v4, shadcn/ui, TanStack Query, Zustand,
            Axios, Sonner, Vercel Analytics.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Zustand — counter</h2>
          <p className="text-muted-foreground text-sm">
            Client state in{" "}
            <code className="bg-muted rounded px-1 py-0.5">counterStore.ts</code>
            .
          </p>
          <div className="bg-card flex flex-wrap items-center gap-3 rounded-xl border p-4">
            <span className="text-2xl font-semibold tabular-nums">{count}</span>
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={() => increment()}>
                +1
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => decrement()}
              >
                −1
              </Button>
              <Button type="button" variant="outline" onClick={() => reset()}>
                Reset
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  toast.message("From Zustand", {
                    description: `Count is ${useCounterStore.getState().count}`,
                  })
                }
              >
                Toast count
              </Button>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">
            TanStack Query — sample request
          </h2>
          <p className="text-muted-foreground text-sm">
            Axios GET via shared client (set{" "}
            <code className="bg-muted rounded px-1 py-0.5">VITE_API_URL</code>{" "}
            e.g. <code className="bg-muted rounded px-1 py-0.5">
              https://jsonplaceholder.typicode.com
            </code>
            ). Query + key in{" "}
            <code className="bg-muted rounded px-1 py-0.5">use-demo.ts</code>
            .
          </p>
          <div className="bg-card space-y-3 rounded-xl border p-4">
            {isPending && (
              <p className="text-muted-foreground text-sm">Loading post…</p>
            )}
            {isError && (
              <div className="space-y-2">
                <p className="text-destructive text-sm">{error.message}</p>
                <Button type="button" size="sm" onClick={() => refetch()}>
                  Retry
                </Button>
              </div>
            )}
            {data && (
              <div className="space-y-2">
                <p className="text-sm font-medium">{data.title}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {data.body}
                </p>
              </div>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isFetching}
              onClick={() => refetch()}
            >
              {isFetching ? "Refetching…" : "Refetch"}
            </Button>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Error boundary</h2>
          <p className="text-muted-foreground text-sm">
            Errors below are contained so the rest of the page keeps running.
          </p>
          <ErrorBoundary layout="embedded">
            <DemoErrorTrigger />
          </ErrorBoundary>
        </section>
      </div>
    </div>
  );
}

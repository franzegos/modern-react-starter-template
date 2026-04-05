# my-starter-template

Starter for React apps: Vite, TypeScript, Tailwind CSS v4, shadcn/ui (new-york), TanStack Query, Zustand, Axios, Sonner, and Vercel Analytics.

**Author:** Franz

## What you get

- **Single page** — Hero plus Zustand counter, TanStack Query demo, Sonner, embedded error boundary, theme toggle (light / dark / system, persisted).
- **Providers** — `QueryClientProvider`, theme sync, Sonner, Vercel Analytics (`src/lib/providers/`).
- **Tests** — Vitest + Testing Library; example in `src/lib/stores/counterStore.test.ts`.

## Folder layout (naming conventions)

```
src/
  api/
    client.ts
    queries/use-demo.ts    # query key + hook (e.g. useDemoPost)
    services/demo.ts
    types/demo.types.ts
  components/
    ErrorBoundary.tsx
    ui/                       # shadcn — kebab-case filenames
  lib/
    hooks/                    # app hooks (use*.ts), when you add them
    providers/AppProviders.tsx, ThemeRoot.tsx
    stores/themeStore.ts, counterStore.ts
    utils/cn.ts, index.ts     # @/lib/utils → cn()
  pages/HomePage/
    index.tsx
    DemoErrorTrigger.tsx
```

## Setup

1. `pnpm install`
2. `cp .env.example .env` — set `VITE_API_URL` (e.g. `https://jsonplaceholder.typicode.com` for the demo `/posts/1` request).
3. `pnpm dev`

Add UI with `pnpm dlx shadcn@latest add …` — see `components.json` (hooks alias: `@/lib/hooks`).

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `pnpm dev`      | Vite dev server              |
| `pnpm build`    | Typecheck + production build |
| `pnpm preview`  | Preview production build     |
| `pnpm lint`     | ESLint                       |
| `pnpm test`     | Vitest (watch)               |
| `pnpm test:run` | Vitest once                  |

## Stack

React 19, Vite 7, TypeScript, Tailwind v4, TanStack Query, Zustand, Axios, Sonner, `@vercel/analytics`.

Node **20+** (see `engines` and `.nvmrc`).

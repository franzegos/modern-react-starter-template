import { useEffect, useState, useSyncExternalStore } from "react";
import { useThemeStore } from "@/lib/stores/themeStore";

function subscribeSystemTheme(cb: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getSystemDarkSnapshot() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function isDark(theme: "light" | "dark" | "system", systemDark: boolean) {
  if (theme === "dark") return true;
  if (theme === "light") return false;
  return systemDark;
}

/**
 * Syncs theme from Zustand persist to `<html class="dark">`.
 * Runs after rehydration from localStorage (`my-starter-template-theme`).
 */
export function ThemeRoot() {
  const theme = useThemeStore((s) => s.theme);
  const [hydrated, setHydrated] = useState(() =>
    useThemeStore.persist.hasHydrated(),
  );

  const systemDark = useSyncExternalStore(
    subscribeSystemTheme,
    getSystemDarkSnapshot,
    () => false,
  );

  useEffect(() => {
    if (hydrated) return;
    const unsub = useThemeStore.persist.onFinishHydration(() =>
      setHydrated(true),
    );
    void useThemeStore.persist.rehydrate();
    return unsub;
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle(
      "dark",
      isDark(theme, systemDark),
    );
  }, [hydrated, theme, systemDark]);

  return null;
}

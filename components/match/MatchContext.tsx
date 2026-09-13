"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { UserPreferences } from "@/lib/types";
import { defaultPreferences } from "@/lib/matchEngine";

const STORAGE_KEY = "westproperties-match-preferences";

interface MatchContextValue {
  preferences: UserPreferences | null;
  setPreferences: (prefs: UserPreferences) => void;
  clearPreferences: () => void;
  hasSetPreferences: boolean;
}

const MatchContext = createContext<MatchContextValue | null>(null);

export function MatchPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferencesState] = useState<UserPreferences | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setPreferencesState(JSON.parse(stored));
    } catch {
      // localStorage unavailable (private browsing, etc.) — quiz just won't persist across reloads
    }
    setHydrated(true);
  }, []);

  const setPreferences = (prefs: UserPreferences) => {
    setPreferencesState(prefs);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // ignore
    }
  };

  const clearPreferences = () => {
    setPreferencesState(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  if (!hydrated) return <>{children}</>;

  return (
    <MatchContext.Provider
      value={{
        preferences,
        setPreferences,
        clearPreferences,
        hasSetPreferences: preferences !== null,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
}

export function useMatchPreferences() {
  const ctx = useContext(MatchContext);
  if (!ctx) {
    // Provider not mounted (shouldn't happen once wired into layout) — safe default
    return {
      preferences: null,
      setPreferences: () => {},
      clearPreferences: () => {},
      hasSetPreferences: false,
    } satisfies MatchContextValue;
  }
  return ctx;
}

export { defaultPreferences };

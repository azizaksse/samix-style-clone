import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export interface AppSettings {
  unitPrice: number;
  oldUnitPrice: number;
  googleSheetUrl: string;
  bannerEnabled: boolean;
  bannerMessage: string;
  facebookPixelId: string;
  tiktokPixelId: string;
}

const DEFAULTS: AppSettings = {
  unitPrice: 3200,
  oldUnitPrice: 3900,
  googleSheetUrl: "",
  bannerEnabled: true,
  bannerMessage: "التوصيل متوفر إلى",
  facebookPixelId: "",
  tiktokPixelId: "",
};

const KEY = "rova_settings";

function load(): AppSettings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {}
  return DEFAULTS;
}

interface SettingsContextValue {
  settings: AppSettings;
  update: (patch: Partial<AppSettings>) => void;
  reset: () => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [settings, setSettings] = useState<AppSettings>(load);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(settings));
  }, [settings]);

  const update = useCallback((patch: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => {
    setSettings(DEFAULTS);
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, update, reset }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be inside <SettingsProvider>");
  return ctx;
}

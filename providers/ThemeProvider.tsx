import { getDirection } from "@/helpers/getDirection";
import { getThemeOptions } from "@/helpers/theme/themeOptions";
import { useCurrentLocale } from "@/locales/client";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import {
  createTheme,
  CssBaseline,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { AdapterMomentJalaali } from "@mui/x-date-pickers/AdapterMomentJalaali";
import { faIR } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Open_Sans, Vazirmatn } from "next/font/google";
import { SnackbarProvider } from "notistack";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { useAppSettings } from "./AppSettingsProvider";
const openSans = Open_Sans({ subsets: ["latin"], display: "swap" });
const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin-ext"],
  display: "swap",
});

interface ThemeSettings {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
}

const ThemeSettingsContext = createContext<ThemeSettings | null>(null);

export const useThemeSettings = () => {
  const context = useContext(ThemeSettingsContext);
  if (!context) {
    throw new Error("useThemeSettings must be used within a ThemeProvider");
  }
  return context;
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("theme-mode");
      if (savedMode === "light" || savedMode === "dark") {
        return savedMode;
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "dark";
  });

  const handleModeChange = (newMode: "light" | "dark") => {
    setMode(newMode);
    localStorage.setItem("theme-mode", newMode);
  };

  const { dateFormat } = useAppSettings();
  const locale = useCurrentLocale();

  const theme = useMemo(
    () =>
      createTheme(
        {
          ...getThemeOptions(mode),
          typography: {
            fontFamily:
              getDirection(locale) === "ltr"
                ? openSans.style.fontFamily
                : vazirmatn.style.fontFamily,
          },
          direction: getDirection(locale),
        },
        faIR
      ),
    [locale, mode]
  );

  const cacheRtl = useMemo(
    () =>
      createCache({
        key: "muirtl",
        stylisPlugins: [prefixer, rtlPlugin],
      }),
    []
  );

  const cacheLtr = useMemo(
    () =>
      createCache({
        key: "muiltr",
        stylisPlugins: [prefixer],
      }),
    []
  );

  useEffect(() => {
    document.documentElement.style.backgroundColor =
      theme.palette.background.default;
  }, [theme]);

  const DateAdapter = useMemo(() => {
    if (dateFormat === "jalali") {
      return AdapterMomentJalaali;
    }
    return AdapterMoment;
  }, [dateFormat]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const storedMode = localStorage.getItem("theme-mode");

    const handleChange = (e: MediaQueryListEvent) => {
      if (!storedMode) {
        setMode(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeSettingsContext.Provider value={{ mode, setMode: handleModeChange }}>
      <CacheProvider
        value={getDirection(locale) === "ltr" ? cacheLtr : cacheRtl}
      >
        <MUIThemeProvider theme={{ ...theme }}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={DateAdapter}>
            <SnackbarProvider autoHideDuration={4000}>
              {children}
            </SnackbarProvider>
          </LocalizationProvider>
        </MUIThemeProvider>
      </CacheProvider>
    </ThemeSettingsContext.Provider>
  );
};
export default ThemeProvider;

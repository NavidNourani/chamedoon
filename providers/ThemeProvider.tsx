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
import { Inter, Vazirmatn } from "next/font/google";
import { SnackbarProvider } from "notistack";
import { useEffect, useMemo } from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { useAppSettings } from "./AppSettingsProvider";
const inter = Inter({ subsets: ["latin"], display: "swap" });
const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin-ext"],
  display: "swap",
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { dateFormat } = useAppSettings();
  const locale = useCurrentLocale();
  const theme = useMemo(
    () =>
      createTheme(
        {
          ...getThemeOptions("dark"),
          typography: {
            fontFamily:
              getDirection(locale) === "ltr"
                ? inter.style.fontFamily
                : vazirmatn.style.fontFamily,
          },
          direction: getDirection(locale),
        },
        faIR
      ),
    [locale]
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

  return (
    <CacheProvider value={getDirection(locale) === "ltr" ? cacheLtr : cacheRtl}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={DateAdapter}>
          <SnackbarProvider autoHideDuration={4000}>
            {children}
          </SnackbarProvider>
        </LocalizationProvider>
      </MUIThemeProvider>
    </CacheProvider>
  );
};

export default ThemeProvider;

"use client";
import { getDirection } from "@/helpers/getDirection";
import { getThemeOptions } from "@/helpers/theme/themeOptions";
import { I18nProviderClient, useCurrentLocale } from "@/locales/client";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Inter, Vazirmatn } from "next/font/google";
import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useMemo,
} from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin-ext"],
  display: "swap",
});

const queryClient = new QueryClient();

const ClientSideProviders: FunctionComponent<
  PropsWithChildren<{ session: Session }>
> = ({ children, session }) => {
  const locale = useCurrentLocale();

  const theme = useMemo(
    () =>
      createTheme({
        ...getThemeOptions("dark"),
        typography: {
          fontFamily:
            getDirection(locale) === "ltr"
              ? inter.style.fontFamily
              : vazirmatn.style.fontFamily,
        },
        direction: getDirection(locale),
      }),
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

  return (
    <I18nProviderClient locale={locale}>
      <SessionProvider session={session}>
        <CacheProvider
          value={getDirection(locale) === "ltr" ? cacheLtr : cacheRtl}
        >
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <>{children}</>
              </LocalizationProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </CacheProvider>
      </SessionProvider>
    </I18nProviderClient>
  );
};

export default ClientSideProviders;

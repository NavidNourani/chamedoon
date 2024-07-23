"use client";
import { getDirection } from "@/helpers/getDirection";
import { themeOptions } from "@/helpers/theme/themeOptions";
import { I18nProviderClient, useCurrentLocale } from "@/locales/client";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { FunctionComponent, PropsWithChildren, useMemo } from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

const ClientSideProviders: FunctionComponent<
  PropsWithChildren<{ session: Session }>
> = ({ children, session }) => {
  const locale = useCurrentLocale();

  const theme = useMemo(
    () =>
      createTheme({
        ...themeOptions,
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

  return (
    <I18nProviderClient locale={locale}>
      <SessionProvider session={session}>
        <CacheProvider
          value={getDirection(locale) === "ltr" ? cacheLtr : cacheRtl}
        >
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <>{children}</>
            </LocalizationProvider>
          </ThemeProvider>
        </CacheProvider>
      </SessionProvider>
    </I18nProviderClient>
  );
};

export default ClientSideProviders;

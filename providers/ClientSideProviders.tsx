"use client";
import { getDirection } from "@/helpers/getDirection";
import { themeOptions } from "@/helpers/theme/themeOptions";
import { useCurrentLocale } from "@/locales/client";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FunctionComponent, PropsWithChildren } from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

const ClientSideProviders: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const locale = useCurrentLocale();
  const theme = createTheme({
    ...themeOptions,
    direction: getDirection(locale),
  });
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const cacheLtr = createCache({
    key: "muiltr",
    stylisPlugins: [prefixer],
  });
  return (
    <CacheProvider value={getDirection(locale) === "ltr" ? cacheLtr : cacheRtl}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default ClientSideProviders;

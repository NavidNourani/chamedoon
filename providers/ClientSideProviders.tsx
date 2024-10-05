"use client";
import { I18nProviderClient, useCurrentLocale } from "@/locales/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { FunctionComponent, PropsWithChildren } from "react";
import ThemeProvider from "./ThemeProvider";

const queryClient = new QueryClient();

const ClientSideProviders: FunctionComponent<
  PropsWithChildren<{ session: Session }>
> = ({ children, session }) => {
  const locale = useCurrentLocale();

  return (
    <I18nProviderClient locale={locale}>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryClientProvider>
      </SessionProvider>
    </I18nProviderClient>
  );
};

export default ClientSideProviders;

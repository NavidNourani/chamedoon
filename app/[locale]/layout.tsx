import { getDirection } from "@/helpers/getDirection";
import { getScopedI18n } from "@/locales/server";
import AppSettingsProvider from "@/providers/AppSettingsProvider";
import ClientSideProviders from "@/providers/ClientSideProviders";
import { Stack } from "@mui/material";
import { getSession } from "next-auth/react";
import GoogleAnalytics from "../components/GoogleAnalytics";
import "./globals.css";

export async function generateMetadata() {
  const t = await getScopedI18n("metaData");
  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: "/logo.svg",
      shortcut: "/logo.svg",
    },
  };
}
export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const session = await getSession();
  const direction = getDirection(locale);
  return (
    <html lang={locale} dir={direction}>
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body>
        <GoogleAnalytics />
        <AppSettingsProvider>
          <ClientSideProviders session={session!}>
            <Stack width="100%" height="100%" overflow="hidden">
              {children}
            </Stack>
          </ClientSideProviders>
        </AppSettingsProvider>
      </body>
    </html>
  );
}

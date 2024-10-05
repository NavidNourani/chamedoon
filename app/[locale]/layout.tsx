import { getDirection } from "@/helpers/getDirection";
import { APP_NAME } from "@/locales/en";
import AppSettingsProvider from "@/providers/AppSettingsProvider";
import ClientSideProviders from "@/providers/ClientSideProviders";
import { Stack } from "@mui/material";
import type { Metadata } from "next";
import { getSession } from "next-auth/react";
import { Inter, Vazirmatn } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: APP_NAME,
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const session = await getSession();
  const direction = getDirection(locale);
  const fontClass = direction === "ltr" ? inter.className : vazirmatn.className;
  return (
    <html lang={locale} dir={direction}>
      <body className={fontClass}>
        <AppSettingsProvider>
          <ClientSideProviders session={session!}>
            <Stack width="100%" height="100%">
              {children}
            </Stack>
          </ClientSideProviders>
        </AppSettingsProvider>
      </body>
    </html>
  );
}

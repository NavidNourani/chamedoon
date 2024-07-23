import HeaderUnauthenticated from "@/components/organisms/HeaderUnauthenticated";
import { getDirection } from "@/helpers/getDirection";
import ClientSideProviders from "@/providers/ClientSideProviders";
import type { Metadata } from "next";
import { getSession } from "next-auth/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const session = await getSession();

  return (
    <html lang={locale} dir={getDirection(locale)}>
      <body>
        <ClientSideProviders session={session!}>
          <HeaderUnauthenticated />
          {children}
        </ClientSideProviders>
      </body>
    </html>
  );
}
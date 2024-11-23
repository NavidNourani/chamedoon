import { authOptions } from "@/helpers/authOptions";
import { getDirection } from "@/helpers/getDirection";
import { getScopedI18n } from "@/locales/server";
import AppSettingsProvider from "@/providers/AppSettingsProvider";
import ClientSideProviders from "@/providers/ClientSideProviders";
import { Stack } from "@mui/material";
import { getServerSession } from "next-auth";
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
  const session = await getServerSession(authOptions);
  const direction = getDirection(locale);
  return (
    <html lang={locale} dir={direction}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5NR6VKSN');
            `,
          }}
        />
        {/* End Google Tag Manager */}
        <link rel="icon" href="/logo.svg" />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5NR6VKSN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
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

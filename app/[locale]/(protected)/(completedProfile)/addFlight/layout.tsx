import { TranslationProvider } from "@/components/providers/TranslationProvider";
import { getScopedI18n } from "@/locales/server";

export default function RootLayout({
  params: { locale },
  children,
}: Readonly<{
  params: { locale: string };
  children: React.ReactNode;
}>) {
  return <TranslationProvider>{children}</TranslationProvider>;
}

export async function generateMetadata() {
  const tPageTitle = await getScopedI18n("pageTitle");
  return {
    title: tPageTitle("addFlight"),
  };
}

import { TranslationProvider } from "@/components/providers/TranslationProvider";
import { generatePageMetadata } from "@/helpers/metadata";

export default function RootLayout({
  params: { locale },
  children,
}: Readonly<{
  params: { locale: string };
  children: React.ReactNode;
}>) {
  return <TranslationProvider>{children}</TranslationProvider>;
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return generatePageMetadata("addFlight", locale);
}

import { TranslationProvider } from "@/components/providers/TranslationProvider";

export default function RootLayout({
  params: { locale },
  children,
}: Readonly<{
  params: { locale: string };
  children: React.ReactNode;
}>) {
  return <TranslationProvider>{children}</TranslationProvider>;
}

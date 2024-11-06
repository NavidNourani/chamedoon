import { generatePageMetadata } from "@/helpers/metadata";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return generatePageMetadata("login", locale);
}

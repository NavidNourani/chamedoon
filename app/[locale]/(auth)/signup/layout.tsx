import { getScopedI18n } from "@/locales/server";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export async function generateMetadata() {
  const tPageTitle = await getScopedI18n("pageTitle");
  return {
    title: tPageTitle("signup"),
  };
}

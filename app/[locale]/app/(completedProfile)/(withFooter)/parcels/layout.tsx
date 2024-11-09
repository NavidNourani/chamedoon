import { generatePageMetadata } from "@/helpers/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return generatePageMetadata("parcels", locale);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

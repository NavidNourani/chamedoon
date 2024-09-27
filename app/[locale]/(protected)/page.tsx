// import { setStaticParamsLocale } from 'next-international/server';
import Link from "@/components/atoms/Link";
import { getScopedI18n } from "@/locales/server";
import { Button, Container } from "@mui/material";

// Uncomment to test Static Generation on this page only
// export function generateStaticParams() {
//   return getStaticParams();
// }

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getScopedI18n("home");
  return (
    <Container>
      <Link href="/addCargo">
        <Button variant="contained">{t("add_new_cargo")}</Button>
      </Link>
    </Container>
  );
}

// import { setStaticParamsLocale } from 'next-international/server';
import PaginatedParcelsList from "@/app/components/atomic/organisms/PaginatedParcelsList";
import { getScopedI18n } from "@/locales/server";
import { Container } from "@mui/material";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getScopedI18n("home");
  return (
    <Container>
      <PaginatedParcelsList />
    </Container>
  );
}

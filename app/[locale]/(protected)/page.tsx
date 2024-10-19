// import { setStaticParamsLocale } from 'next-international/server';
import { getScopedI18n } from "@/locales/server";
import { Container, Stack } from "@mui/material";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getScopedI18n("home");
  return (
    <Container sx={{ height: "100%", overflow: "auto" }}>
      <Stack direction="row" gap={2} width="100%">
        {/* <PaginatedParcelsList />   */}
      </Stack>
    </Container>
  );
}

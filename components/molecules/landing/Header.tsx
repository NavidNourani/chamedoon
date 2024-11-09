import ChangeLanguageButton from "@/components/atoms/ChangeLanguageButton";
import ThemeToggleButton from "@/components/atoms/ThemeToggleButton";
import { getScopedI18n } from "@/locales/server";
import { Box, Button, Container, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default async function Header() {
  const t = await getScopedI18n("authorization");

  return (
    <Box
      component="header"
      sx={{
        py: 2,
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <Image
              src="/logo-type.svg"
              alt="OrbitPax"
              width={150}
              height={30}
              style={{
                filter: "brightness(0) invert(var(--logo-invert))",
              }}
              priority
            />
          </Link>

          <Stack direction="row" spacing={2} alignItems="center">
            <ChangeLanguageButton />
            <ThemeToggleButton />
            <Button
              component={Link}
              href="/login"
              variant="contained"
              color="primary"
            >
              {t("login")}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

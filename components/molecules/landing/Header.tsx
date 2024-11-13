import ChangeLanguageButton from "@/components/atoms/ChangeLanguageButton";
import ThemeToggleButton from "@/components/atoms/ThemeToggleButton";
import { authOptions } from "@/helpers/authOptions";
import { getScopedI18n } from "@/locales/server";
import { Box, Button, Container, Stack } from "@mui/material";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import MobileHeader from "./MobileHeader";

export default async function Header() {
  const t = await getScopedI18n("authorization");
  const session = await getServerSession(authOptions);

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
              priority
            />
          </Link>

          <Stack direction="row" spacing={2} alignItems="center">
            <MobileHeader />
            <ChangeLanguageButton
              sx={{ display: { xs: "none", md: "block" } }}
            />
            <ThemeToggleButton sx={{ display: { xs: "none", md: "block" } }} />
            <Button
              component={Link}
              href={session ? "/app" : "/login"}
              variant="contained"
              color="primary"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              {session?.user ? t("dashboard") : t("login")}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

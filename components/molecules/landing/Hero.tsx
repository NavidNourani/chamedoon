import { getScopedI18n } from "@/locales/server";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default async function Hero() {
  const t = await getScopedI18n("landing.hero");

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, sm: 8, lg: 10 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: "center",
            gap: { lg: 8 },
          }}
        >
          <Box sx={{ flex: 1, maxWidth: { xs: "100%", lg: "50%" } }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3.75rem" },
                fontWeight: "bold",
                mb: 3,
                color: "text.primary",
              }}
            >
              {t("title")}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "1.125rem", mb: 4, color: "text.secondary" }}
            >
              {t("description")}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                component={Link}
                href="/login"
                variant="contained"
                size="large"
                color="primary"
              >
                {t("getStarted")}
              </Button>
              <Button
                component={Link}
                href="/how-it-works"
                variant="text"
                size="large"
                sx={{ color: "text.primary" }}
              >
                {t("learnMore")} →
              </Button>
            </Stack>
          </Box>
          <Box
            sx={{
              flex: 1,
              mt: { xs: 4, lg: 0 },
              width: "100%",
              maxWidth: { xs: "100%", lg: "50%" },
            }}
          >
            <Image
              src="/images/landing/hero.png"
              alt="OrbitPax Platform Preview"
              width={615}
              height={500}
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
              priority
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

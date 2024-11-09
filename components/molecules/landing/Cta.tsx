import { getScopedI18n } from "@/locales/server";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default async function Cta() {
  const t = await getScopedI18n("landing.cta");

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, sm: 8 } }}>
        <Box
          sx={{
            bgcolor: "grey.900",
            borderRadius: { sm: "24px" },
            p: { xs: 4, sm: 6 },
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "common.white",
              fontSize: { xs: "1.875rem", sm: "2.25rem" },
              fontWeight: "bold",
              mb: 2,
              maxWidth: "md",
              mx: "auto",
            }}
          >
            {t("title")}
          </Typography>
          <Typography
            sx={{
              color: "grey.300",
              maxWidth: "sm",
              mx: "auto",
              mb: 4,
            }}
          >
            {t("description")}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              component={Link}
              href="/register"
              variant="contained"
              color="inherit"
              sx={{ color: "grey.900" }}
            >
              {t("getStarted")}
            </Button>
            <Button
              component={Link}
              href="/contact"
              variant="text"
              sx={{ color: "common.white" }}
            >
              {t("contactUs")} →
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

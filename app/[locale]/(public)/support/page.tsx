import { getScopedI18n } from "@/locales/server";
import { Telegram } from "@mui/icons-material";
import { Box, Container, Link, Typography } from "@mui/material";

export default async function SupportPage() {
  const t = await getScopedI18n("support");

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          {t("title")}
        </Typography>

        <Typography variant="body1" paragraph>
          {t("welcome_message")}
        </Typography>

        <Typography variant="h5" gutterBottom>
          {t("contact_info")}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            backgroundColor: {
              light: "primary.light",
              dark: "primary.dark",
            },
            padding: 2,
            borderRadius: 1,
          }}
          dir="ltr"
        >
          <Telegram color="primary" />
          <Typography variant="body1">
            Telegram:{" "}
            <Link
              href="https://t.me/nouraninavid"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: "none" }}
            >
              @nouraninavid
            </Link>
          </Typography>
        </Box>

        {/* <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          {t("common_questions")}
        </Typography>

        <Box sx={{ width: "100%" }}>
          <Typography variant="h6" gutterBottom>
            {t("track_parcel_title")}
          </Typography>
          <Typography variant="body1" paragraph>
            {t("track_parcel_desc")}
          </Typography>

          <Typography variant="h6" gutterBottom>
            {t("modify_flight_title")}
          </Typography>
          <Typography variant="body1" paragraph>
            {t("modify_flight_desc")}
          </Typography>
        </Box> */}

        <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
          {t("response_time")}
        </Typography>
      </Box>
    </Container>
  );
}

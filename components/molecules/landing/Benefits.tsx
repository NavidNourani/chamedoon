import { getScopedI18n } from "@/locales/server";
import { Box, Container, Grid, Typography } from "@mui/material";
import { benefitKeys } from "./data";

export default async function Benefits() {
  const t = await getScopedI18n("landing.benefits");

  return (
    <Box sx={{ bgcolor: "background.default", py: { xs: 6, sm: 8, lg: 10 } }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: "md", mx: "auto", textAlign: { lg: "center" } }}>
          <Typography
            component="h2"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              fontSize: "0.875rem",
              mb: 2,
            }}
          >
            {t("title")}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.875rem", sm: "2.25rem" },
              fontWeight: "bold",
              mb: 2,
              color: "text.primary",
            }}
          >
            {t("subtitle")}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 6 }}>
            {t("description")}
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {benefitKeys.map((benefit) => (
            <Grid item xs={12} md={4} key={benefit.key}>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  p: 3,
                  borderRadius: 2,
                  height: "100%",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <Typography component="span" sx={{ fontSize: "1.5rem" }}>
                    {benefit.icon}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "text.primary" }}
                  >
                    {t(`items.${benefit.key}.name` as any)}
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                  {t(`items.${benefit.key}.description` as any)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

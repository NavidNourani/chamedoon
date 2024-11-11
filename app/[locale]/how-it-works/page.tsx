import Header from "@/components/molecules/landing/Header";
import { getScopedI18n } from "@/locales/server";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

export default async function HowItWorksPage() {
  const t = await getScopedI18n("how_it_works");

  return (
    <Box sx={{ overflow: "auto" }}>
      <Header />
      <main>
        <Container sx={{ py: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            {t("title")}
          </Typography>
          <Typography variant="body1" paragraph>
            {t("intro")}
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {t("for_senders.title")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t("for_senders.description")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {t("for_travelers.title")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t("for_travelers.description")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Box mt={4}>
            <Typography variant="h6" component="h3">
              {t("safety_tips.title")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("safety_tips.description")}
            </Typography>
          </Box>
        </Container>
      </main>
    </Box>
  );
}

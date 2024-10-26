"use client";
import { useScopedI18n } from "@/locales/client";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box, Container, IconButton, Link, Typography } from "@mui/material";
import { FunctionComponent } from "react";

const Footer: FunctionComponent = () => {
  const t = useScopedI18n("footer");

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        py: 6,
        mt: "32px",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          {t("company_name")}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {t("company_description")}
        </Typography>
        <Box mt={4} display="flex" justifyContent="center">
          <IconButton aria-label="Facebook" color="primary">
            <Facebook />
          </IconButton>
          <IconButton aria-label="Twitter" color="primary">
            <Twitter />
          </IconButton>
          <IconButton aria-label="Instagram" color="primary">
            <Instagram />
          </IconButton>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          mt={2}
        >
          {"© "}
          <Link color="inherit" href="https://your-website.com/">
            {t("company_name")}
          </Link>{" "}
          {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

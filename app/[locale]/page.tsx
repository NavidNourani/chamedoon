import Benefits from "@/components/molecules/landing/Benefits";
import Cta from "@/components/molecules/landing/Cta";
import Header from "@/components/molecules/landing/Header";
import Hero from "@/components/molecules/landing/Hero";
import { Box } from "@mui/material";

export default function LandingPage() {
  return (
    <Box sx={{ overflow: "auto" }}>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Cta />
      </main>
    </Box>
  );
}

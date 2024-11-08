"use client";
import ChangeLanguageButton from "@/components/atoms/ChangeLanguageButton";
import ThemeToggleButton from "@/components/atoms/ThemeToggleButton";
import { introSlides } from "@/config/introSlides";
import { useScopedI18n } from "@/locales/client";
import {
  Box,
  Button,
  MobileStepper,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";

export default function IntroPage() {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const t = useScopedI18n("intro");
  const router = useRouter();
  const maxSteps = introSlides.length;

  const handleNext = () => {
    if (activeStep === maxSteps - 1) {
      router.push("/login");
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleSkip = () => {
    router.push("/login");
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: theme.palette.background.default,
      }}
    >
      {/* Theme and Language Controls */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <ChangeLanguageButton />
        <ThemeToggleButton />
      </Stack>

      {/* Slides */}
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        style={{ flex: 1 }}
      >
        {introSlides.map((slide, index) => (
          <Box
            key={slide.titleKey}
            sx={{
              height: "100%",
              position: "relative",
              display: index === activeStep ? "block" : "none",
            }}
          >
            <Image
              src={slide.image}
              alt={t(slide.titleKey as any)}
              fill
              style={{ objectFit: "cover" }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(10px)",
                color: "white",
                p: 4,
                textAlign: "center",
              }}
            >
              <Typography variant="h4" gutterBottom fontWeight="bold">
                {t(slide.titleKey as any)}
              </Typography>
              <Typography variant="body1">
                {t(slide.descriptionKey as any)}
              </Typography>
            </Box>
          </Box>
        ))}
      </SwipeableViews>

      {/* Navigation */}
      <Paper
        square
        elevation={0}
        sx={{
          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(0, 0, 0, 0.5)"
              : "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(10px)",
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {activeStep !== maxSteps - 1 ? (
          <Button onClick={handleSkip}>{t("skip")}</Button>
        ) : (
          <div />
        )}
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{
            bgcolor: "transparent",
            "& .MuiMobileStepper-dot": {
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.3)"
                  : "rgba(0, 0, 0, 0.3)",
            },
            "& .MuiMobileStepper-dotActive": {
              bgcolor: theme.palette.primary.main,
            },
          }}
          nextButton={
            <Button onClick={handleNext}>
              {activeStep === maxSteps - 1 ? t("get_started") : t("next")}
            </Button>
          }
          backButton={<Box width={64} />}
        />
      </Paper>
    </Box>
  );
}

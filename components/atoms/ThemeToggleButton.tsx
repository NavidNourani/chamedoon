"use client";
import { useScopedI18n } from "@/locales/client";
import { useThemeSettings } from "@/providers/ThemeProvider";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton, Tooltip } from "@mui/material";

const ThemeToggleButton = () => {
  const { mode, setMode } = useThemeSettings();
  const t = useScopedI18n("theme");

  return (
    <Tooltip title={mode === "light" ? t("dark_mode") : t("light_mode")}>
      <IconButton
        color="inherit"
        onClick={() => setMode(mode === "light" ? "dark" : "light")}
      >
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;

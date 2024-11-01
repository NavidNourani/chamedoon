import { PaletteMode } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";

const lightPalette = {
  mode: "light" as PaletteMode,
  background: {
    default: "#ffffff", // Light background color
    paper: "#f5f5f5", // Slightly darker light color for paper elements
  },
  // Add other light mode colors here
};

const darkPalette = {
  mode: "dark" as PaletteMode,
  background: {
    default: "#121212", // Dark background color
    paper: "#1e1e1e", // Slightly lighter dark color for paper elements
  },
  // Add other dark mode colors here
};

export const getThemeOptions = (mode: PaletteMode): ThemeOptions => ({
  palette: mode === "light" ? lightPalette : darkPalette,

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFeatureSettings: '"ss02"',
          backgroundColor:
            mode === "light"
              ? lightPalette.background.default
              : darkPalette.background.default,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        color: "inherit",
        lineHeight: "unset",
      },
      styleOverrides: {
        root: {
          textDecoration: "unset",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: "46px",
          fontWeight: 900,
        },
      },
    },
  },
});

import { ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
  },
  components: {
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
  },
};

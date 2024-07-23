import { ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
  },
  components: {
    MuiLink: {
      defaultProps: {
        color: "inherit",
      },
      styleOverrides: {
        root: {
          textDecoration: "unset",
        },
      },
    },
  },
};

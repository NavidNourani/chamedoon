"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  const theme = useTheme();
  const isRTL = theme.direction === "rtl";

  return (
    <IconButton color="inherit" onClick={() => router.back()} sx={{ mr: 2 }}>
      {isRTL ? <ArrowForwardIcon /> : <ArrowBackIcon />}
    </IconButton>
  );
};

export default BackButton;

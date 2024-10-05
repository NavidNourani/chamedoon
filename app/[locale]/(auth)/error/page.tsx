"use client";
import { useScopedI18n } from "@/locales/client";
import { Alert, Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ErrorPage = () => {
  const t = useScopedI18n("errorPage");
  const router = useRouter();
  const searchParams = useSearchParams();

  const [error, setError] = useState("");

  useEffect(() => {
    const signInError = searchParams.get("error");
    if (signInError) {
      setError(signInError);
    }
  }, [searchParams]);

  return (
    <Box
      sx={{
        width: "80%",
        maxWidth: "500px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ margin: "20px" }}>
        {t("errorTitle")}
      </Typography>
      <Alert severity="error" sx={{ margin: "20px" }}>
        {error}
      </Alert>
      <Link href="/login">
        <Button variant="contained" color="primary" sx={{ margin: "10px" }}>
          {t("signInAgain")}
        </Button>
      </Link>
    </Box>
  );
};

export default ErrorPage;

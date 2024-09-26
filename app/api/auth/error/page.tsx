"use client";
import { useScopedI18n } from "@/locales/client";
import { Alert, Box, Button, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, SignInResponse } from "next-auth/react";
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
  }, [router.query]);

  const handleSignIn = async () => {
    const res = await signIn("credentials", { redirect: false });
    if (res?.ok) {
      router.push("/");
    }
  };

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
      <Button
        variant="contained"
        color="primary"
        sx={{ margin: "10px" }}
        onClick={handleSignIn}
      >
        {t("signInAgain")}
      </Button>
    </Box>
  );
};

export default ErrorPage;

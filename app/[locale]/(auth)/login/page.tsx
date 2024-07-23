"use client";
import { useScopedI18n } from "@/locales/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { User } from "@prisma/client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

// Define the validation schema for the form fields
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

// Define the initial values for the form fields
const defaultValues = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<User, "username" | "password">>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const t = useScopedI18n("loginForm");

  // Use state to store the login error message
  const [loginError, setLoginError] = useState("");

  // Define the function to handle the form submission
  const onSubmit = async (data: Pick<User, "username" | "password">) => {
    const res = await signIn("credentials", {
      ...data,
      redirect: true,
      callbackUrl: "/",
    });
  };

  // Return the JSX code for rendering the form
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
        {t("formTitle")}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t("username")}
              variant="outlined"
              fullWidth
              sx={{ margin: "10px" }}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t("password")}
              type="password"
              variant="outlined"
              fullWidth
              sx={{ margin: "10px" }}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ margin: "10px" }}
        >
          {t("login")}
        </Button>
      </form>
      {loginError && (
        <Alert severity="error" sx={{ margin: "10px" }}>
          {loginError}
        </Alert>
      )}
    </Box>
  );
};

export default LoginForm;
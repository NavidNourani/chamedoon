"use client";
import { useI18n, useScopedI18n } from "@/locales/client";
import { addUser } from "@/serverActions/user/addUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { User } from "@prisma/client";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useState } from "react";

// Define the validation schema for the form fields
const schema = yup.object().shape({
  username: yup
    .string()
    .required("signupForm.usernameRequired")
    .min(3, "signupForm.usernameLength")
    .max(20, "signupForm.usernameLength")
    .matches(/^[a-zA-Z0-9_]+$/, "signupForm.usernameFormat"),
  name: yup.string().optional(),
  email: yup.string().email("signupForm.emailFormat").optional(),
  family: yup.string().optional(),
  phone: yup
    .string()
    .required("signupForm.phoneRequired")
    .matches(/^\+?\d+$/, "signupForm.phoneFormat"),
  password: yup
    .string()
    .required("signupForm.passwordRequired")
    .min(8, "signupForm.passwordLength"),
  repeatPassword: yup
    .string()
    .required("signupForm.repeatPasswordRequired")
    .oneOf([yup.ref("password")], "signupForm.passwordsMustMatch"),
  telegramID: yup.string().optional(),
  whatsappnumber: yup.string().optional(),
});

// Define the initial values for the form fields
const defaultValues = {
  username: "",
  name: "",
  family: "",
  phone: "",
  password: "",
  repeatPassword: "",
  telegramID: "",
  whatsappnumber: "",
};

// Define the component for the signup form
const SignupForm = () => {
  const t2 = useI18n();
  const t = useScopedI18n("signupForm");

  // Use react hook form to handle the form state and validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof schema>>({
    defaultValues,
    resolver: yupResolver(schema) as any,
  });

  // Define the function to handle the form submission
  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      const userData = {
        username: data.username,
        name: data.name ?? null,
        family: data.family ?? null,
        phone: data.phone ?? null,
        password: data.password,
        telegramID: data.telegramID ?? null,
        email: data.email ?? null,
        whatsappnumber: data.whatsappnumber ?? null,
      };
      await addUser(userData);
      alert(t("registrationSuccess"));
    } catch (e) {
      alert(t("registrationError"));
    }
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
              helperText={errors.username && t(errors.username.message as any)}
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t("name")}
              variant="outlined"
              fullWidth
              sx={{ margin: "10px" }}
              error={!!errors.name}
              helperText={errors.name && t(errors.name.message as any)}
            />
          )}
        />
        <Controller
          name="family"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t("family")}
              variant="outlined"
              fullWidth
              sx={{ margin: "10px" }}
              error={!!errors.family}
              helperText={errors.family && t(errors.family.message as any)}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t("phone")}
              variant="outlined"
              fullWidth
              sx={{ margin: "10px" }}
              error={!!errors.phone}
              helperText={errors.phone && t(errors.phone.message as any)}
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
              helperText={errors.password && t(errors.password.message as any)}
            />
          )}
        />
        <Controller
          name="repeatPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t("repeatPassword")}
              type="password"
              variant="outlined"
              fullWidth
              sx={{ margin: "10px" }}
              error={!!errors.repeatPassword}
              helperText={
                errors.repeatPassword && t(errors.repeatPassword.message as any)
              }
            />
          )}
        />
        <Controller
          name="telegramID"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t("telegramID")}
              variant="outlined"
              fullWidth
              sx={{ margin: "10px" }}
              error={!!errors.telegramID}
              helperText={
                errors.telegramID && t(errors.telegramID.message as any)
              }
            />
          )}
        />
        <Controller
          name="whatsappnumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t("whatsappNumber")}
              variant="outlined"
              fullWidth
              sx={{ margin: "10px" }}
              error={!!errors.whatsappnumber}
              helperText={
                errors.whatsappnumber && t(errors.whatsappnumber.message as any)
              }
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ margin: "10px" }}
        >
          {t("signup")}
        </Button>
        <Stack direction="row" alignItems="center">
          <Typography>{t("alreadyHaveAccount")}</Typography>
          <Link href="/login">
            <Button variant="outlined" color="primary" sx={{ margin: "10px" }}>
              {t("loginButton")}
            </Button>
          </Link>
        </Stack>
      </form>
    </Box>
  );
};

export default SignupForm;

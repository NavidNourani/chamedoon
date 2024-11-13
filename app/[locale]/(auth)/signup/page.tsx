"use client";
import { useScopedI18n } from "@/locales/client";
import { addUser } from "@/serverActions/user/addUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { CurrencyTypeType, DateSystemType } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

// Define the validation schema for the form fields
const signupSchema = yup
  .object()
  .shape({
    username: yup
      .string()
      .optional()
      .min(3, "usernameLength")
      .max(20, "usernameLength")
      .matches(/^[a-zA-Z0-9_]+$/, "usernameFormat"),
    email: yup.string().email("Invalid email format"),
    phone: yup.string().matches(/^\+?\d+$/, "Invalid phone format"),
    password: yup
      .string()
      .required("passwordRequired")
      .min(8, "At least 8 characters"),
    repeatPassword: yup
      .string()
      .required("repeatPasswordRequired")
      .oneOf([yup.ref("password")], "passwordsMustMatch"),
    name: yup.string().optional(),
    family: yup.string().optional(),
    telegramID: yup.string().optional(),
    whatsappnumber: yup.string().optional(),
  })
  .test(
    "at-least-one-contact",
    "Either email or phone is required",
    function (value) {
      return Boolean(value.email || value.phone);
    }
  );

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
  const tSignup = useScopedI18n("signupForm");
  const tPageTitle = useScopedI18n("pageTitle");
  const { enqueueSnackbar } = useSnackbar();

  // Use react hook form to handle the form state and validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof signupSchema>>({
    defaultValues,
    resolver: yupResolver(signupSchema) as any,
  });

  // Define the function to handle the form submission
  const onSubmit = async (data: yup.InferType<typeof signupSchema>) => {
    try {
      const userData = {
        username: data.username ?? null,
        name: data.name ?? null,
        family: data.family ?? null,
        phone: data.phone ?? null,
        password: data.password,
        telegramID: data.telegramID ?? null,
        email: data.email ?? null,
        whatsappnumber: data.whatsappnumber ?? null,
        currencyType: "USD" as CurrencyTypeType,
        preferredDateSystem: "JALALI" as DateSystemType,
        countryCode: null,
        photo: null,
        createdAt: new Date(),
      };
      await addUser(userData);
      enqueueSnackbar(tSignup("registrationSuccess"), {
        variant: "success",
      });
    } catch (e) {
      enqueueSnackbar(tSignup("registrationError"), {
        variant: "error",
      });
    }
  };
  // Return the JSX code for rendering the form
  return (
    <>
      <Head>
        <title>{tPageTitle("signup")}</title>
      </Head>
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
          {tSignup("formTitle")}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={tSignup("username")}
                variant="outlined"
                fullWidth
                sx={{ margin: "10px" }}
                error={!!errors.username}
                helperText={
                  errors.username && tSignup(errors.username.message as any)
                }
              />
            )}
          />
          {/* <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={tSignup("name")}
                variant="outlined"
                fullWidth
                sx={{ margin: "10px" }}
                error={!!errors.name}
                helperText={errors.name && tSignup(errors.name.message as any)}
              />
            )}
          /> */}
          {/* <Controller
            name="family"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={tSignup("family")}
                variant="outlined"
                fullWidth
                sx={{ margin: "10px" }}
                error={!!errors.family}
                helperText={
                  errors.family && tSignup(errors.family.message as any)
                }
              />
            )}
          /> */}
          {/* <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={tSignup("phone")}
                variant="outlined"
                fullWidth
                sx={{ margin: "10px" }}
                error={!!errors.phone}
                helperText={
                  errors.phone && tSignup(errors.phone.message as any)
                }
              />
            )}
          /> */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={tSignup("password")}
                type="password"
                variant="outlined"
                fullWidth
                sx={{ margin: "10px" }}
                error={!!errors.password}
                helperText={
                  errors.password && tSignup(errors.password.message as any)
                }
              />
            )}
          />
          <Controller
            name="repeatPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={tSignup("repeatPassword")}
                type="password"
                variant="outlined"
                fullWidth
                sx={{ margin: "10px" }}
                error={!!errors.repeatPassword}
                helperText={
                  errors.repeatPassword &&
                  tSignup(errors.repeatPassword.message as any)
                }
              />
            )}
          />
          {/* <Controller
            name="telegramID"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={tSignup("telegramID")}
                variant="outlined"
                fullWidth
                sx={{ margin: "10px" }}
                error={!!errors.telegramID}
                helperText={
                  errors.telegramID && tSignup(errors.telegramID.message as any)
                }
              />
            )}
          /> */}
          {/* <Controller
            name="whatsappnumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={tSignup("whatsappNumber")}
                variant="outlined"
                fullWidth
                sx={{ margin: "10px" }}
                error={!!errors.whatsappnumber}
                helperText={
                  errors.whatsappnumber &&
                  tSignup(errors.whatsappnumber.message as any)
                }
              />
            )}
          /> */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ margin: "10px" }}
          >
            {tSignup("signup")}
          </Button>
          <Stack direction="row" alignItems="center">
            <Typography>{tSignup("alreadyHaveAccount")}</Typography>
            <Link href="/login">
              <Button
                variant="outlined"
                color="primary"
                sx={{ margin: "10px" }}
              >
                {tSignup("loginButton")}
              </Button>
            </Link>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default SignupForm;

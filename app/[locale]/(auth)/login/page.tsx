"use client";
import RHFTextField from "@/components/shared/RHF/RHFTextField";
import { useScopedI18n } from "@/locales/client";
import { addUser } from "@/serverActions/user/addUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { CurrencyTypeType, DateSystemType } from "@prisma/client";
import { signIn, SignInResponse } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";

// Define the validation schema for the login form fields
const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

// Define the validation schema for the signup form fields
const signupSchema = yup.object().shape({
  username: yup
    .string()
    .required("usernameRequired")
    .min(3, "usernameLength")
    .max(20, "usernameLength")
    .matches(/^[a-zA-Z0-9_]+$/, "usernameFormat"),
  password: yup
    .string()
    .required("passwordRequired")
    .min(8, "At least 8 characters"),
  repeatPassword: yup
    .string()
    .required("repeatPasswordRequired")
    .oneOf([yup.ref("password")], "passwordsMustMatch"),
});

const AuthForm = () => {
  const router = useRouter();
  const tLogin = useScopedI18n("loginForm");
  const tSignup = useScopedI18n("signupForm");
  const [isLogin, setIsLogin] = useState(true);
  const [loginError, setLoginError] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    defaultValues: isLogin
      ? { username: "", password: "" }
      : { username: "", password: "", repeatPassword: "" },
    resolver: yupResolver(isLogin ? loginSchema : signupSchema),
  });
  const { reset, setError } = methods;

  const onSubmit = async (
    data: yup.InferType<typeof loginSchema> | yup.InferType<typeof signupSchema>
  ) => {
    if (isLogin) {
      loginHandler(() =>
        signIn("credentials", {
          ...data,
          callbackUrl: "/",
          redirect: false,
        })
      );
    } else {
      try {
        const userData = {
          username: data.username,
          password: data.password,
          email: null,
          name: null,
          family: null,
          phone: null,
          telegramID: null,
          whatsappnumber: null,
          photo: null,
          currencyType: "USD" as CurrencyTypeType,
          preferredDateSystem: "GREGORIAN" as DateSystemType,
          createdAt: new Date(),
        };
        await addUser(userData);
        enqueueSnackbar(tSignup("registrationSuccess"), {
          variant: "success",
        });
        setIsLogin(true);
        reset({ username: "", password: "" });
      } catch (e) {
        try {
          const error = JSON.parse(e as any);
          if (error.fields) {
            Object.keys(error.fields).forEach((key) => {
              setError(key as any, { message: error.fields[key] });
            });
          }
        } catch (e) {}
        enqueueSnackbar(tSignup("registrationError"), {
          variant: "error",
        });
      }
    }
  };

  const handleGoogleSignIn = () => {
    loginHandler(() => signIn("google", { callbackUrl: "/" }));
  };

  const loginHandler = async (
    func: () => Promise<SignInResponse | undefined>
  ) => {
    const res = await func();
    if (res?.ok) {
      router.push("/");
    }
    if (res?.error) {
      setLoginError(res.error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: boolean) => {
    setIsLogin(newValue);
    reset();
    setLoginError("");
  };

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Box
        sx={{
          flex: 1,
          position: "relative",
          display: { xs: "none", md: "block" },
        }}
      >
        <Image
          src="/images/passenger.jpg"
          alt="Capturing Moments, Creating Memories"
          layout="fill"
          objectFit="cover"
        />
        <Box
          sx={{ position: "absolute", bottom: 40, left: 40, color: "white" }}
        >
          {/* TODO: change this text */}
          <Typography variant="h4" fontWeight="bold">
            Capturing Moments ,
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            Creating Memories
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          color: "white",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <Tabs value={isLogin} onChange={handleTabChange} sx={{ mb: 2 }}>
            <Tab label={tLogin("login")} value={true} />
            <Tab label={tSignup("signup")} value={false} />
          </Tabs>
          <FormProvider {...methods}>
            <Box
              component="form"
              onSubmit={methods.handleSubmit(onSubmit)}
              sx={{ width: "100%" }}
            >
              <RHFTextField
                name="username"
                label={tLogin("username")}
                sx={{ mb: 2 }}
              />
              <RHFTextField
                label={tLogin("password")}
                type="password"
                name="password"
                sx={{ mb: 2 }}
              />
              {!isLogin && (
                <>
                  <RHFTextField
                    name="repeatPassword"
                    label={tSignup("repeatPassword")}
                    type="password"
                    sx={{ mb: 2 }}
                  />
                  {/* <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={tSignup("email")}
                      type="email"
                      variant="outlined"
                      fullWidth
                       margin="normal"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      InputLabelProps={{ style: { color: "gray" } }}
                      InputProps={{ style: { color: "white" } }}
                      sx={{ bgcolor: "#2b2b2b", mb: 2 }}
                    />
                  )}
                /> */}
                </>
              )}
              {loginError && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {loginError}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mb: 2,
                  bgcolor: "#8b5cf6",
                  "&:hover": { bgcolor: "#7c3aed" },
                }}
              >
                {isLogin ? tLogin("login") : tSignup("signup")}
              </Button>
            </Box>
          </FormProvider>
          <Typography variant="body2" align="center" mb={2}>
            {tLogin("orLoginWith")}
          </Typography>
          <Button
            onClick={handleGoogleSignIn}
            variant="outlined"
            startIcon={<FcGoogle />}
            fullWidth
            sx={{ mb: 2, color: "white", borderColor: "gray" }}
          >
            {tLogin("signInWithGoogle")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthForm;

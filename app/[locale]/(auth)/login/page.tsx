"use client";
import ChangeLanguageButton from "@/components/atoms/ChangeLanguageButton";
import ThemeToggleButton from "@/components/atoms/ThemeToggleButton";
import LoadingButton from "@/components/shared/LoadingButton";
import { RHFSelect } from "@/components/shared/RHF/RHFSelect";
import RHFTextField from "@/components/shared/RHF/RHFTextField";
import { useScopedI18n } from "@/locales/client";
import { addUser } from "@/serverActions/user/addUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { CurrencyTypeType, DateSystemType } from "@prisma/client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";

// Define the form types
type LoginFormValues = {
  countryCode: string;
  phone: string;
  password: string;
};

type SignupFormValues = {
  countryCode: string;
  phone: string;
  password: string;
  repeatPassword: string;
};

// Login schema without email
const loginSchema = yup.object().shape({
  countryCode: yup
    .string()
    .required("countryCodeRequired")
    .matches(/^\+\d{1,4}$/, "Invalid country code"),
  phone: yup
    .string()
    .required("phoneRequired")
    .matches(/^[1-9]\d*$/, "Phone number cannot start with 0"),
  password: yup.string().required("passwordRequired"),
});

// Signup schema without email
const signupSchema = yup.object().shape({
  countryCode: yup
    .string()
    .required("countryCodeRequired")
    .matches(/^\+\d{1,4}$/, "Invalid country code"),
  phone: yup
    .string()
    .required("phoneRequired")
    .matches(/^[1-9]\d*$/, "Phone number cannot start with 0"),
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
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const theme = useTheme();
  const tTheme = useScopedI18n("theme");

  const methods = useForm<LoginFormValues | SignupFormValues>({
    defaultValues: isLogin
      ? { countryCode: "+98", phone: "", password: "" }
      : { countryCode: "+98", phone: "", password: "", repeatPassword: "" },
    resolver: yupResolver(isLogin ? loginSchema : signupSchema),
  });

  const { reset } = methods;

  const onSubmit = async (data: LoginFormValues | SignupFormValues) => {
    if (isLogin) {
      const loginData = data as LoginFormValues;
      methods.clearErrors();
      await loginHandler(() =>
        signIn("credentials", {
          countryCode: loginData.countryCode,
          phone: loginData.phone,
          password: loginData.password,
          callbackUrl: "/app",
          redirect: false,
        })
      );
    } else {
      methods.clearErrors();
      const userData = {
        username: null,
        password: data.password,
        email: null,
        name: null,
        family: null,
        countryCode: data.countryCode,
        phone: data.phone,
        telegramID: null,
        whatsappnumber: null,
        photo: null,
        currencyType: "USD" as CurrencyTypeType,
        preferredDateSystem: "JALALI" as DateSystemType,
        createdAt: new Date(),
      };
      const res = await addUser(userData);

      if (res.success) {
        enqueueSnackbar(tSignup("signupSuccess"), { variant: "success" });
        // Automatically sign in after successful registration
        await loginHandler(() =>
          signIn("credentials", {
            countryCode: data.countryCode,
            phone: data.phone,
            password: data.password,
            callbackUrl: "/app",
            redirect: false,
          })
        );
      } else {
        if (res.error === "userAlreadyExists") {
          methods.setError("phone", {
            message: "phoneAlreadyExists",
          });
        } else {
          enqueueSnackbar(tSignup("registrationError"), {
            variant: "error",
          });
        }
      }
    }
  };

  const handleGoogleSignIn = () => {
    loginHandler(() => signIn("google", { callbackUrl: "/app" }));
  };

  const loginHandler = async (func: () => Promise<any>) => {
    const res = await func();
    if (res?.ok) {
      enqueueSnackbar(tLogin("loginSuccess"), { variant: "success" });
      router.replace("/app");
    }
    if (res?.error) {
      setLoginError(res.error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setIsLogin(newValue === "login");
    reset();
    setLoginError("");
  };

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleRepeatPassword = () =>
    setShowRepeatPassword((prev) => !prev);

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 1,
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        <ChangeLanguageButton />
        <ThemeToggleButton />
      </Box>
      <Box
        sx={{
          flex: 1,
          position: "relative",
          display: { xs: "none", md: "block" },
        }}
      >
        <Image
          src="/images/passenger.jpg"
          alt={`${tTheme("connect_travel")} ${tTheme("your_parcels")}`}
          layout="fill"
          objectFit="cover"
        />
        <Box
          sx={{ position: "absolute", bottom: 40, left: 40, color: "white" }}
        >
          <Typography variant="h4" fontWeight="bold">
            {tTheme("connect_travel")}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {tTheme("your_parcels")}
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
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <Tabs
            value={isLogin ? "login" : "signup"}
            onChange={handleTabChange}
            sx={{ mb: 2 }}
            textColor="primary"
          >
            <Tab label={tLogin("login")} value="login" />
            <Tab label={tSignup("signup")} value="signup" />
          </Tabs>
          <FormProvider {...methods}>
            <Box
              component="form"
              onSubmit={methods.handleSubmit(onSubmit)}
              sx={{ width: "100%" }}
            >
              {isLogin ? (
                <Box sx={{ display: "flex", gap: 1, mb: 2 }} dir="ltr">
                  <RHFSelect
                    name="countryCode"
                    label={tLogin("countryCode")}
                    sx={{ width: "30%", mb: 2 }}
                  >
                    <MenuItem value="+971">+971 UAE</MenuItem>
                    <MenuItem value="+98">+98 Iran</MenuItem>
                    <MenuItem value="+44">+44 UK</MenuItem>
                  </RHFSelect>
                  <RHFTextField
                    name="phone"
                    label={tLogin("phone")}
                    placeholder="1234567890"
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[1-9][0-9]*",
                    }}
                    onKeyDown={(e) => {
                      // Allow: backspace, delete, tab, escape, enter
                      if (
                        [
                          "Backspace",
                          "Delete",
                          "Tab",
                          "Escape",
                          "Enter",
                        ].includes(e.key)
                      ) {
                        return;
                      }
                      const isNumber = /[0-9]/.test(e.key);
                      const isFirstChar =
                        (e.target as HTMLInputElement).value.length === 0;
                      if (!isNumber || (isFirstChar && e.key === "0")) {
                        e.preventDefault();
                      }
                    }}
                    sx={{ flex: 1 }}
                  />
                </Box>
              ) : (
                <Box sx={{ display: "flex", gap: 1, mb: 2 }} dir="ltr">
                  <RHFSelect
                    name="countryCode"
                    label={tSignup("countryCode")}
                    sx={{ width: "30%", mb: 2 }}
                  >
                    <MenuItem value="+971">+971 UAE</MenuItem>
                    <MenuItem value="+98">+98 Iran</MenuItem>
                    <MenuItem value="+44">+44 UK</MenuItem>
                  </RHFSelect>
                  <RHFTextField
                    name="phone"
                    label={tSignup("phone")}
                    placeholder="9123456789"
                    sx={{ flex: 1 }}
                  />
                </Box>
              )}
              <RHFTextField
                label={tLogin("password")}
                type={showPassword ? "text" : "password"}
                name="password"
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {!isLogin && (
                <RHFTextField
                  name="repeatPassword"
                  label={tSignup("repeatPassword")}
                  type={showRepeatPassword ? "text" : "password"}
                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleToggleRepeatPassword}
                          edge="end"
                        >
                          {showRepeatPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              {loginError && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {tLogin(`errors.${loginError}` as any) ||
                    tLogin("errors.default")}
                </Typography>
              )}
              <LoadingButton
                type="submit"
                variant="contained"
                fullWidth
                loading={methods.formState.isSubmitting}
                sx={{
                  mb: 2,
                  bgcolor: "#8b5cf6",
                  "&:hover": { bgcolor: "#7c3aed" },
                }}
              >
                {isLogin ? tLogin("login") : tSignup("signup")}
              </LoadingButton>
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
            sx={{
              mb: 2,
              color: theme.palette.text.primary,
              borderColor: theme.palette.divider,
              height: 48,
              "&:hover": {
                borderColor: theme.palette.primary.main,
                bgcolor: theme.palette.action.hover,
              },
            }}
          >
            {tLogin("signInWithGoogle")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthForm;

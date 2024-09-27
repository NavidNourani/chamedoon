"use client";
import { useScopedI18n } from "@/locales/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { User } from "@prisma/client";
import { signIn, SignInResponse } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
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
  const tPageTitle = useScopedI18n("pageTitle");
  const tLogin = useScopedI18n("loginForm");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof schema>>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  // Use state to store the login error message
  const [loginError, setLoginError] = useState("");

  // Define the function to handle the form submission
  const onSubmit = async (data: Pick<User, "username" | "password">) => {
    loginHandler(() =>
      signIn("credentials", {
        ...data,
        callbackUrl: "/",
        redirect: true,
      })
    );
  };

  const handleGoogleSignIn = async () => {
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

  // Return the JSX code for rendering the form
  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "100%",
        }}
      >
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
            sx={{
              position: "absolute",
              bottom: 40,
              left: 40,
              color: "white",
            }}
          >
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
            <Typography variant="h4" fontWeight="bold" mb={4}>
              {tLogin("login")}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={tLogin("username")}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: "gray" } }}
                    InputProps={{ style: { color: "white" } }}
                    sx={{ bgcolor: "#2b2b2b", mb: 2 }}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={tLogin("password")}
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: "gray" } }}
                    InputProps={{ style: { color: "white" } }}
                    sx={{ bgcolor: "#2b2b2b", mb: 2 }}
                  />
                )}
              />
              {/* <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "gray",
                      "&.Mui-checked": { color: "primary.main" },
                    }}
                  />
                }
                label={tLogin("rememberMe")}
                sx={{ mb: 2 }}
              /> */}
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
                {tLogin("login")}
              </Button>
            </form>
            <Typography variant="body2" align="center" mb={2}>
              {tLogin("orLoginWith")}
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Button
                onClick={handleGoogleSignIn}
                variant="outlined"
                startIcon={<FcGoogle />}
                sx={{ flex: 1, mr: 1, color: "white", borderColor: "gray" }}
              >
                {tLogin("signInWithGoogle")}
              </Button>
              {/* <Button
                variant="outlined"
                sx={{ flex: 1, ml: 1, color: "white", borderColor: "gray" }}
              >
                Apple
              </Button> */}
            </Box>
            <Typography variant="body2" align="center">
              {tLogin("dontHaveAccount")}{" "}
              <Link href="/signup" style={{ color: "#8b5cf6" }}>
                {tLogin("signUp")}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LoginForm;

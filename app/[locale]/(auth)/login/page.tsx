"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { User } from "@prisma/client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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

// Define the component for the login form
const LoginForm = () => {
  const router = useRouter();
  // Use react hook form to handle the form state and validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<User, "username" | "password">>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  // Use state to store the login error message
  const [loginError, setLoginError] = useState("");

  // Define the function to handle the form submission
  const onSubmit = async (data: Pick<User, "username" | "password">) => {
    const res = await signIn("credentials", { ...data, redirect: false });
    if (res?.error) {
      alert("There was an error on login, try again");
    }
    if (res?.ok) {
      alert("Logged in successfully");
      router.replace("/");
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
        Login Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Username"
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
              label="Password"
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
          Login
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

"use client";
import { addUser } from "@/serverActions/user/addUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { User } from "@prisma/client";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

// Define the validation schema for the form fields
const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username must contain only alphanumeric characters and underscores"
    ),
  name: yup.string().optional(),
  family: yup.string().optional(),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^\+?\d+$/,
      "Phone number must contain only digits and optional plus sign"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
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
  telegramID: "",
  whatsappnumber: "",
};

// Define the component for the signup form
const SignupForm = () => {
  // Use react hook form to handle the form state and validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues,
    resolver: yupResolver(schema) as any,
  });

  // Define the function to handle the form submission
  const onSubmit = async (data: User) => {
    // Here you can send the data to your backend or do whatever you want with it
    try {
      await addUser(data);
    } catch (e) {
      alert("There was an error on sign up, try again");
    }
    alert("Registered successfully, you can login now!");
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
        Signup Form
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
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              variant="outlined"
              fullWidth
              sx={{ margin: "10px" }}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="family"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Family"
              variant="outlined"
              fullWidth
              sx={{ margin: "10px" }}
              error={!!errors.family}
              helperText={errors.family?.message}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone (with country code)"
              variant="outlined"
              fullWidth
              sx={{ margin: "10px" }}
              error={!!errors.phone}
              helperText={errors.phone?.message}
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
        <Controller
          name="telegramID"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Telegram ID"
              variant="outlined"
              fullWidth
              sx={{ margin: "10px" }}
              error={!!errors.telegramID}
              helperText={errors.telegramID?.message}
            />
          )}
        />
        <Controller
          name="whatsappnumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="WhatsApp number"
              variant="outlined"
              fullWidth
              sx={{ margin: "10px" }}
              error={!!errors.whatsappnumber}
              helperText={errors.whatsappnumber?.message}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ margin: "10px" }}
        >
          Sign up
        </Button>
        <Stack direction="row" alignItems="center">
          <Typography>Already have an account?</Typography>
          <Link href="/login">
            <Button variant="outlined" color="primary" sx={{ margin: "10px" }}>
              Login
            </Button>
          </Link>
        </Stack>
      </form>
    </Box>
  );
};

export default SignupForm;

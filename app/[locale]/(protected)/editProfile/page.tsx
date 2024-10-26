"use client";

import { uploadUserPhoto } from "@/app/@user/actions/uploadUserPhoto";
import { RHFSelect } from "@/components/shared/RHF/RHFSelect";
import RHFTextField from "@/components/shared/RHF/RHFTextField";
import { handlePrismaError } from "@/helpers/prismaErrorHandler";
import { useScopedI18n } from "@/locales/client";
import { getCurrentUser } from "@/serverActions/getCurrentUser";
import { updateUser } from "@/serverActions/updateUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Box, Button, MenuItem, Typography } from "@mui/material";
import { CurrencyType, DateSystem } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

// Define the validation schema for the edit profile form fields
const editProfileSchema = yup.object().shape({
  username: yup
    .string()
    .required("usernameRequired")
    .min(3, "usernameLength")
    .max(20, "usernameLength")
    .matches(/^[a-zA-Z0-9_]+$/, "usernameFormat"),
  email: yup.string().email("Invalid email").nullable(),
  name: yup.string().nullable(),
  family: yup.string().nullable(),
  phone: yup.string().nullable(),
  telegramID: yup.string().nullable(),
  whatsappnumber: yup.string().nullable(),
  currencyType: yup.string().oneOf(Object.values(CurrencyType)).required(),
  preferredDateSystem: yup.string().oneOf(Object.values(DateSystem)).required(),
});

const EditProfileForm = () => {
  const router = useRouter();
  const commonT = useScopedI18n("common");
  const editProfileT = useScopedI18n("editProfileForm");
  const formErrorsT = useScopedI18n("formErrors");
  const currencyT = useScopedI18n("currency");
  const dateSystemT = useScopedI18n("dateSystem");
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const [photoUrl, setPhotoUrl] = useState("");

  const methods = useForm({
    defaultValues: {
      username: "",
      email: "",
      name: "",
      family: "",
      phone: "",
      telegramID: "",
      whatsappnumber: "",
      currencyType: "IRT",
      preferredDateSystem: "GREGORIAN",
    },
    resolver: yupResolver(editProfileSchema),
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser();
        methods.reset(userData);
        setPhotoUrl(userData.photo || "");
      } catch (error) {
        enqueueSnackbar(editProfileT("fetchError"), { variant: "error" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [methods, enqueueSnackbar, editProfileT]);

  const onSubmit = async (data: yup.InferType<typeof editProfileSchema>) => {
    try {
      const result = await updateUser(data);
      if (result.success) {
        enqueueSnackbar(editProfileT("updateSuccess"), { variant: "success" });
        router.push("/");
      } else {
        // Handle specific errors returned by updateUser
        if (typeof result.error === "object") {
          for (const [field, message] of Object.entries(result.error)) {
            if (message === "Unique constraint failed") {
              methods.setError(field as keyof typeof data, {
                type: "manual",
                message: formErrorsT("uniqueConstraintFailed", { field }),
              });
            }
          }
        } else {
          enqueueSnackbar(editProfileT("updateError"), { variant: "error" });
        }
      }
    } catch (error: any) {
      const prismaError = handlePrismaError(error);
      if (typeof prismaError.error === "object") {
        for (const [field, message] of Object.entries(prismaError.error)) {
          methods.setError(field as keyof typeof data, {
            type: "manual",
            message: formErrorsT("uniqueConstraintFailed", { field }),
          });
        }
      } else {
        enqueueSnackbar(editProfileT("updateError"), { variant: "error" });
      }
    }
  };

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadUserPhoto(file.name, file.type);
      if (result.success) {
        await fetch(result.signedUrl!, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });
        setPhotoUrl(result.photoUrl!);
        enqueueSnackbar(editProfileT("photoUploadSuccess"), {
          variant: "success",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      enqueueSnackbar(editProfileT("photoUploadError"), { variant: "error" });
    }
  };

  if (isLoading) {
    return <Typography>{editProfileT("loading")}</Typography>;
  }

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          inset: "0",
          display: { xs: "block", md: "none" },
        }}
      >
        <Image
          src="/images/parcels-on-luggages.jpeg"
          alt="Edit Your Profile"
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          overflow: "hidden",
          boxShadow: 3,
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
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
            src="/images/parcels-on-luggages.jpeg"
            alt="Edit Your Profile"
            layout="fill"
            objectFit="cover"
          />
          <Box
            sx={{ position: "absolute", bottom: 40, left: 40, color: "white" }}
          >
            <Typography variant="h4" fontWeight="bold">
              {editProfileT("editProfileTitle")}
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {editProfileT("editProfileSubtitle")}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            p: 4,
            color: "white",
            overflow: "auto",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 400 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              mb={4}
              textAlign="center"
            >
              {editProfileT("editYourProfile")}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              <Avatar src={photoUrl} alt="User Photo" />
            </Box>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mb: 4 }}
            >
              {editProfileT("uploadPhoto")}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </Button>
            <FormProvider {...methods}>
              <Box
                component="form"
                onSubmit={methods.handleSubmit(onSubmit)}
                sx={{ width: "100%" }}
              >
                <RHFTextField
                  name="username"
                  label={editProfileT("username")}
                  sx={{ mb: 2 }}
                />
                <RHFTextField
                  name="email"
                  label={editProfileT("email")}
                  sx={{ mb: 2 }}
                />
                <RHFTextField
                  name="name"
                  label={editProfileT("name")}
                  sx={{ mb: 2 }}
                />
                <RHFTextField
                  name="family"
                  label={editProfileT("family")}
                  sx={{ mb: 2 }}
                />
                <RHFTextField
                  name="phone"
                  label={editProfileT("phone")}
                  sx={{ mb: 2 }}
                />
                <RHFSelect
                  name="currencyType"
                  label={commonT("currencyType")}
                  sx={{ mb: 2 }}
                >
                  {Object.values(CurrencyType).map((currency) => (
                    <MenuItem key={currency} value={currency}>
                      {currencyT(`${currency}` as any)}
                    </MenuItem>
                  ))}
                </RHFSelect>
                <RHFSelect
                  name="preferredDateSystem"
                  label={commonT("preferredDateSystem")}
                  sx={{ mb: 2 }}
                >
                  {Object.values(DateSystem).map((dateSystem) => (
                    <MenuItem key={dateSystem} value={dateSystem}>
                      {dateSystemT(`${dateSystem}` as any)}
                    </MenuItem>
                  ))}
                </RHFSelect>
                <RHFTextField
                  name="telegramID"
                  label={editProfileT("telegramID")}
                  sx={{ mb: 2 }}
                />
                <RHFTextField
                  name="whatsappnumber"
                  label={editProfileT("whatsappNumber")}
                  sx={{ mb: 2 }}
                />
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
                  {editProfileT("updateProfile")}
                </Button>
              </Box>
            </FormProvider>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EditProfileForm;

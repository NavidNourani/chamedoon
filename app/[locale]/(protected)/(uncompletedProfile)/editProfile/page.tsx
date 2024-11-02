"use client";

import { uploadUserPhoto } from "@/app/@user/actions/uploadUserPhoto";
import LoadingButton from "@/components/shared/LoadingButton";
import { RHFSelect } from "@/components/shared/RHF/RHFSelect";
import RHFTextField from "@/components/shared/RHF/RHFTextField";
import { calculateProfileCompletion } from "@/helpers/calculateProfileCompletion";
import { handlePrismaError } from "@/helpers/prismaErrorHandler";
import { useScopedI18n } from "@/locales/client";
import { getCurrentUser } from "@/serverActions/getCurrentUser";
import { updateUser } from "@/serverActions/updateUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { Person } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  LinearProgress,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { CurrencyTypeType, DateSystemType } from "@prisma/client";
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
    .nullable()
    .transform((value) => value || null)
    .matches(/^[a-zA-Z0-9_]+$/, "usernameFormat")
    .min(3, "usernameLength")
    .max(20, "usernameLength"),
  email: yup.string().email("Invalid email").nullable(),
  name: yup.string().required("nameRequired"),
  family: yup.string().required("familyRequired"),
  countryCode: yup.string().required("countryCodeRequired"),
  phone: yup.string().required("phoneRequired"),
  telegramID: yup.string().nullable(),
  whatsappnumber: yup.string().nullable(),
  currencyType: yup.string().oneOf(Object.values(CurrencyTypeType)).required(),
  preferredDateSystem: yup
    .string()
    .oneOf(Object.values(DateSystemType))
    .required(),
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
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [missingRequiredFields, setMissingRequiredFields] = useState<string[]>(
    []
  );

  const methods = useForm({
    defaultValues: {
      username: "",
      email: "",
      name: "",
      family: "",
      phone: "",
      countryCode: "",
      telegramID: "",
      whatsappnumber: "",
      currencyType: "IRT",
      preferredDateSystem: "GREGORIAN",
    },
    resolver: yupResolver(editProfileSchema),
  });

  const checkRequiredFields = (data: any) => {
    const requiredFields = ["name", "family", "countryCode", "phone"];
    const missingFields = requiredFields.filter((field) => !data[field]);
    setMissingRequiredFields(missingFields);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser();
        const transformedData = {
          ...userData,
          name: userData.name || "",
          family: userData.family || "",
          countryCode: userData.countryCode || "",
          phone: userData.phone || "",
        };
        methods.reset(transformedData);
        setPhotoUrl(userData.photo || "");
        setProfileCompletion(calculateProfileCompletion(userData));
        checkRequiredFields(transformedData);
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
    return (
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
            gap: "2rem",
          }}
        >
          <Stack sx={{ width: "100%", maxWidth: 400 }}>
            <Skeleton
              variant="text"
              width="80%"
              height={60}
              sx={{ mb: 4, alignSelf: "center" }}
            />

            <Stack sx={{ alignItems: "center", mb: 4, gap: 2 }}>
              <Skeleton variant="rectangular" width="100%" height={10} />
              <Skeleton variant="text" width={200} />
            </Stack>

            <Skeleton
              variant="circular"
              width={60}
              height={60}
              sx={{ alignSelf: "center", mb: 4 }}
            />

            <Skeleton
              variant="rectangular"
              width="100%"
              height={40}
              sx={{ mb: 4 }}
            />

            {/* Form field skeletons */}
            {[...Array(10)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width="100%"
                height={56}
                sx={{ mb: 2 }}
              />
            ))}

            <Skeleton
              variant="rectangular"
              width="100%"
              height={40}
              sx={{ mb: 2 }}
            />
          </Stack>
        </Box>
      </Box>
    );
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
            gap: "2rem",
          }}
        >
          {missingRequiredFields.length > 0 && (
            <Alert
              severity="warning"
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                width: "100%",
              }}
            >
              <AlertTitle fontSize="1.2rem" fontWeight="bold">
                {editProfileT("completeProfileTitle")}
              </AlertTitle>
              <Typography>
                {editProfileT("completeProfile")}:{" "}
                {missingRequiredFields
                  .map((field) => editProfileT(`${field}` as any))
                  .join(", ")}
              </Typography>
            </Alert>
          )}
          <Stack sx={{ width: "100%", maxWidth: 400 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              marginBottom={4}
            >
              {editProfileT("editYourProfile")}
            </Typography>
            <Stack sx={{ alignItems: "center", mb: 4, gap: 2 }}>
              <LinearProgress
                dir="ltr"
                sx={{ width: "100%", direction: "ltr" }}
                value={profileCompletion}
                variant="determinate"
              />
              <Typography>
                {editProfileT("profileCompletion")}: {profileCompletion}%
              </Typography>
            </Stack>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 4,
                outline: "2px solid white",
                width: "fit-content",
                outlineOffset: "4px",
                borderRadius: "50%",
                alignSelf: "center",
                "&>img": {
                  borderRadius: "50%",
                  objectFit: "cover",
                  width: "60px",
                  height: "60px",
                },
              }}
            >
              {!photoUrl ? (
                <Image
                  src={photoUrl}
                  alt="User Photo"
                  width={200}
                  height={200}
                  quality={100}
                />
              ) : (
                <Person sx={{ width: 60, height: 60 }} />
              )}
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
                  name="countryCode"
                  label={editProfileT("countryCode")}
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
                  {Object.values(CurrencyTypeType).map((currency) => (
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
                  {Object.values(DateSystemType).map((dateSystem) => (
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
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={methods.formState.isSubmitting}
                  fullWidth
                  sx={{
                    mb: 2,
                    bgcolor: "#8b5cf6",
                    "&:hover": { bgcolor: "#7c3aed" },
                  }}
                >
                  {editProfileT("updateProfile")}
                </LoadingButton>
              </Box>
            </FormProvider>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default EditProfileForm;

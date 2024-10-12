"use client";

import { useScopedI18n } from "@/locales/client";
import { createCargoForCurrentUser } from "@/serverActions/createCargoForCurrentUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack } from "@mui/material";
import { Parcel } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import DepartureStep from "./steps/DepartureStep";
import DestinationStep from "./steps/DestinationStep";
import ParcelDetailsStep from "./steps/ParcelDetailsStep";

// Define the validation schema for the form fields
const schema = yup.object().shape({
  approximateDateTime: yup.date().optional(),
  immediateDelivery: yup.boolean().required(),
  departureCountry: yup
    .object({
      id: yup.string().required(),
      iso2: yup.string().required(),
      iso3: yup.string().required(),
      name: yup.string().required(),
    })
    .required("Departure country is required"),
  departureAirport: yup
    .object({
      id: yup.string().required(),
      name: yup.string().required(),
      countryIso2: yup.string().optional(),
    })
    .required("Departure Airport is required"),
  destinationCountry: yup
    .object({
      id: yup.string().required(),
      iso2: yup.string().required(),
      iso3: yup.string().required(),
      name: yup.string().required(),
    })
    .required("Destination country is required"),
  destinationAirport: yup
    .object({
      id: yup.string().required(),
      name: yup.string().required(),
      countryIso2: yup.string().optional(),
    })
    .required("Destination Airport is required"),
  parcelDescription: yup.string().required(),
  estimatedCost: yup
    .number()
    .nullable()
    .transform((value) => (isNaN(value) ? null : value))
    .optional(),
  parcelWeight: yup
    .number()
    .nullable()
    .transform((value) => (isNaN(value) ? null : value))
    .required(),
  parcelType: yup.string().nullable().required(),
});

const FlightForm = () => {
  const t = useScopedI18n("add_parcel");
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      immediateDelivery: false,
      parcelDescription: "",
      estimatedCost: undefined,
      approximateDateTime: new Date(),
    },
  });
  const [step, setStep] = useState(0);

  useEffect(() => {
    methods.reset({
      immediateDelivery: false,
      parcelDescription: "",
      estimatedCost: undefined,
      approximateDateTime: undefined,
    });
  }, [methods]);

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      const dataToSend: Omit<Parcel, "userID" | "id"> = {
        departureAirportId: data.departureAirport.id,
        destinationAirportId: data.destinationAirport.id,
        parcelDescription: data.parcelDescription,
        estimatedCost: data.estimatedCost ?? null,
        immediateDelivery: data.immediateDelivery,
        approximateDateTime: data.approximateDateTime ?? null,
        parcelWeight: data.parcelWeight ?? null,
        parcelType: data.parcelType ?? null,
      };
      const res = await createCargoForCurrentUser(dataToSend);
      if (res.success) {
        enqueueSnackbar(t("Cargo_created_successfully"), {
          variant: "success",
        });
        router.push("/");
      } else {
        enqueueSnackbar(t("There_was_an_error_on_creating_parcel"), {
          variant: "error",
        });
      }
    } catch (e) {
      enqueueSnackbar(t("There_was_an_error_on_creating_parcel"), {
        variant: "error",
      });
    }
  };
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  useEffect(() => {
    methods.clearErrors();
  }, [step]);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <DepartureStep />;
      case 1:
        return <DestinationStep />;
      case 2:
        return <ParcelDetailsStep />;
      default:
        return null;
    }
  };

  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      sx={{ transform: "translate(-50%, -50%)" }}
      width="min(80%, 800px)"
      height="min(70%, 500px)"
      overflow="hidden"
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 4,
          height: "100%",
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: { xs: "none", md: "block" },
          }}
        >
          <Image
            src="/images/woman.jpg"
            alt="Woman with parcel"
            layout="fill"
            objectFit="cover"
          />
          <Box
            sx={{ position: "absolute", bottom: 40, left: 40, color: "white" }}
          >
            {/* <Typography variant="h4" fontWeight="bold">
            {t("Ship_your_parcel")}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {t("Across_the_world")}
          </Typography> */}
          </Box>
        </Box>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow: "auto",
          }}
        >
          <FormProvider {...methods}>
            <Stack
              component="form"
              pt={1}
              onSubmit={methods.handleSubmit(onSubmit)}
              sx={{
                width: "100%",
                height: "100%",
                overflow: "auto",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                "&>*": { width: "100%" },
              }}
            >
              {renderStep()}
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "space-between",
                  marginTop: "2rem",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  disabled={step === 0}
                >
                  {t("Back")}
                </Button>
                {step < 2 ? (
                  <Button variant="contained" onClick={handleNext}>
                    {t("Next")}
                  </Button>
                ) : (
                  <Button type="submit" variant="contained">
                    {t("Submit")}
                  </Button>
                )}
              </Box>
            </Stack>
          </FormProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default FlightForm;

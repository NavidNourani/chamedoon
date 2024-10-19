"use client";

import { useScopedI18n } from "@/locales/client";
import { createFlightForCurrentUser } from "@/serverActions/createFlightForCurrentUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, useTheme } from "@mui/material";
import { Flight } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import DepartureStep from "./steps/DepartureStep";
import DestinationStep from "./steps/DestinationStep";
import FlightDetailsStep from "./steps/FlightDetailsStep";

// Define the validation schema for the form fields
const schema = yup.object().shape({
  departureDateTime: yup.date().required("Departure date and time is required"),
  arrivalDateTime: yup.date().required("Arrival date and time is required"),
  acceptableParcelDescription: yup
    .string()
    .required("Cargo description is required"),
  estimatedCost: yup
    .number()
    .nullable()
    .transform((value) => (isNaN(value) ? null : value))
    .optional(),
  departureAirport: yup
    .object({
      id: yup.string().required(),
      name: yup.string().required(),
    })
    .required("Departure Airport is required"),
  destinationAirport: yup
    .object({
      id: yup.string().required(),
      name: yup.string().required(),
    })
    .required("Destination Airport is required"),
});

const FlightForm = () => {
  const theme = useTheme();
  const t = useScopedI18n("add_flight");
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      departureDateTime: new Date(),
      arrivalDateTime: new Date(),
      acceptableParcelDescription: "",
      estimatedCost: undefined,
    },
  });
  const [step, setStep] = useState(0);

  useEffect(() => {
    methods.reset({
      departureDateTime: new Date(),
      arrivalDateTime: new Date(),
      acceptableParcelDescription: "",
      estimatedCost: undefined,
    });
  }, [methods]);

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      const dataToSend: Omit<Flight, "userID" | "id"> = {
        departureDateTime: data.departureDateTime,
        arrivalDateTime: data.arrivalDateTime,
        acceptableParcelDescription: data.acceptableParcelDescription,
        estimatedCost: data.estimatedCost ?? null,
        departureAirportId: data.departureAirport.id,
        destinationAirportId: data.destinationAirport.id,
      };
      const res = await createFlightForCurrentUser(dataToSend);
      if (res.success) {
        enqueueSnackbar(t("Flight_created_successfully"), {
          variant: "success",
        });
        router.push("/");
      } else {
        enqueueSnackbar(t("There_was_an_error_on_creating_flight"), {
          variant: "error",
        });
      }
    } catch (e) {
      enqueueSnackbar(t("There_was_an_error_on_creating_flight"), {
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
        return <FlightDetailsStep />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        top: "50%",
        left: "50%",
        borderRadius: 3,
        position: "absolute",
        transform: "translate(-50%, -50%)",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0px 4px 10px rgba(255, 255, 255, 0.5)"
            : "0px 4px 10px rgba(0, 0, 0, 0.5)",
      }}
      width="min(80%, 900px)"
      height="min(70%, 600px)"
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
            src="/images/sending.jpg"
            alt="Airplane"
            layout="fill"
            objectFit="cover"
          />
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
              onSubmit={methods.handleSubmit(onSubmit)}
              height="100%"
              width="100%"
              overflow="hidden"
            >
              <Stack height="100%" overflow="auto" gap={3} width="100%" p={4}>
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
            </Stack>
          </FormProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default FlightForm;
